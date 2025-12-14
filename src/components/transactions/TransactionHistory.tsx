import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  ChevronLeft, 
  Download, 
  Search, 
  Filter,
  Eye,
  Trash2 
} from "lucide-react";
import { toast } from "sonner";
import { TransactionStorage } from "@/utils/TransactionStorage";
import { 
  formatDate, 
  formatCurrency, 
  getStatusColor,
  getStatusIcon 
} from "@/utils/TransactionHelpers";

export const TransactionHistory = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TRANSACTION[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TRANSACTIONSTATUS | "All">("All");
  const [selectedTransaction, setSelectedTransaction] = useState<TRANSACTION | null>(null);

  // Load transactions once on mount
  useEffect(() => {
    const allTransactions = TransactionStorage.getAll();
    setTransactions(allTransactions);
  }, []);

  // Derive filtered transactions using useMemo (no separate state needed!)
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Filter by search query (reference number or student name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.referenceNumber.toLowerCase().includes(query) ||
        t.studentName?.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [transactions, searchQuery, statusFilter]);

  const loadTransactions = () => {
    const allTransactions = TransactionStorage.getAll();
    setTransactions(allTransactions);
  };

  const handleDelete = (id: string) => {
    toast.warning("Delete Transaction", {
      description: "Are you sure you want to delete this transaction? This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          TransactionStorage.delete(id);
          loadTransactions();
          toast.success("Transaction deleted successfully");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const handleViewDetails = (transaction: TRANSACTION) => {
    setSelectedTransaction(transaction);
  };

  const handleDownloadReceipt = (transaction: TRANSACTION) => {
    // Navigate to receipt page with transaction data
    navigate("/receipt", { state: transaction });
  };

  const getTotalPaid = () => {
    return filteredTransactions
      .filter(t => t.status === "Completed")
      .reduce((sum, t) => sum + t.totalAmount, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 mb-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} /> Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
          <p className="text-gray-600 mt-2">View and manage your payment transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-800">{transactions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-600">
            <p className="text-sm text-gray-600 mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(getTotalPaid())}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-600">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">
              {transactions.filter(t => t.status === "Pending").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search by reference, student name, or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TRANSACTIONSTATUS | "All")}
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {transactions.length === 0 
                  ? "No transactions yet. Make your first payment!" 
                  : "No transactions match your search criteria."}
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/fees")}
              >
                Make a Payment
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Reference</TableHead>
                    <TableHead className="font-semibold">Items</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm">
                        {formatDate(transaction.date)}
                      </TableCell>
                      <TableCell className="text-sm font-mono">
                        {transaction.referenceNumber}
                      </TableCell>
                      <TableCell className="text-sm">
                        {transaction.fees.length} item(s)
                      </TableCell>
                      <TableCell className="text-sm font-semibold">
                        {formatCurrency(transaction.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <span className={`
                          inline-flex items-center gap-1 px-3 py-1 rounded-full 
                          text-xs font-medium border
                          ${getStatusColor(transaction.status)}
                        `}>
                          {getStatusIcon(transaction.status)} {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewDetails(transaction)}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </Button>
                          {transaction.status === "Completed" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDownloadReceipt(transaction)}
                              title="Download Receipt"
                            >
                              <Download size={16} />
                            </Button>
                          )}
                        
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <TransactionDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
            onDownload={() => handleDownloadReceipt(selectedTransaction)}
          />
        )}
      </div>
    </div>
  );
};

const TransactionDetailModal = ({
  transaction,
  onClose,
  onDownload
}: {
  transaction: TRANSACTION;
  onClose: () => void;
  onDownload: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Transaction Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(transaction.date)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>

          {/* Transaction Info */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono font-medium">{transaction.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reference Number</p>
                <p className="font-mono font-medium">{transaction.referenceNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium">{transaction.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`
                  inline-flex items-center gap-1 px-3 py-1 rounded-full 
                  text-xs font-medium border
                  ${getStatusColor(transaction.status)}
                `}>
                  {getStatusIcon(transaction.status)} {transaction.status}
                </span>
              </div>
            </div>
          </div>

          {/* Fee Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Fee Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold">Item</th>
                    <th className="text-right p-3 text-sm font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.fees.map((fee, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3 text-sm">{fee.type}</td>
                      <td className="p-3 text-sm text-right">{formatCurrency(fee.amount)}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-50">
                    <td className="p-3 font-bold">Total</td>
                    <td className="p-3 text-right font-bold text-green-700">
                      {formatCurrency(transaction.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-gray-500 hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </Button>
            {transaction.status === "Completed" && (
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                onClick={onDownload}
              >
                <Download size={16} /> Download Receipt
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};