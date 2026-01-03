import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFee } from "@/hooks/useFee";
import { TransactionStorage } from "@/utils/transactionStorage";
import {
  generateTransactionId,
  generateReferenceNumber,
  formatCurrency,
} from "@/utils/transactionHelpers";

import { CreditCard, Building, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const PaymentForm = () => {
  const navigate = useNavigate();
  const { selectedFee, setSelectedFee } = useFee();

  const [paymentMethod, setPaymentMethod] = useState<"Card" | "Bank Transfer">(
    "Card"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");

  const [studentName, setStudentName] = useState("Jane");
  const [studentId, setStudentId] = useState("JN25ABD");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const totalAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);

  const validateForm = (): boolean => {
    if (!studentName.trim()) {
      toast.error("Please enter student name");
      return false;
    }
    if (!studentId.trim()) {
      toast.error("Please enter student ID");
      return false;
    }
    if (selectedFee.length === 0) {
      toast.error("No fees selected");
      return false;
    }

    if (paymentMethod === "Card") {
      if (cardNumber.length !== 16) {
        toast.warning("Please enter a valid 16-digit card number");
        return false;
      }
      if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        toast.warning("Please enter expiry in MM/YY format");
        return false;
      }
      if (cardCvv.length !== 3) {
        toast.warning("Please enter a valid 3-digit CVV");
        return false;
      }
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const transaction: TRANSACTION = {
      id: generateTransactionId(),
      date: new Date().toISOString(),
      fees: selectedFee,
      totalAmount,
      status: "Completed",
      paymentMethod,
      referenceNumber: generateReferenceNumber(),
      studentName,
      studentId,
      session: "2024/2025",
    };

    const saved = TransactionStorage.save(transaction);

    if (saved) {
      setTransactionId(transaction.id);
      setShowSuccess(true);

      setSelectedFee([]);
    } else {
      toast.error("Failed to save transaction. Please try again.");
    }

    setIsProcessing(false);
  };

  const handleViewReceipt = () => {
    const transaction = TransactionStorage.getById(transactionId);
    if (transaction) {
      navigate("/receipts", { state: transaction });
    }
  };

  const handleViewTransactions = () => {
    navigate("/transactions");
  };

  const handleNewPayment = () => {
    setShowSuccess(false);
    navigate("/fees");
  };

  if (showSuccess) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[500px]">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600">
              Your payment has been processed successfully
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
            <p className="font-mono font-bold text-green-800">
              {transactionId}
            </p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleViewReceipt}
            >
              Download Receipt
            </Button>
            <Button
              className="w-full bg-gray-500 hover:bg-gray-600"
              onClick={handleViewTransactions}
            >
              View Transaction History
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleNewPayment}
            >
              Make Another Payment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedFee.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">No fees selected for payment</p>
        <Button onClick={() => navigate("/fees")}>Go to Fee Selection</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Complete Payment
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Student Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID *
                </label>
                <Input
                  type="text"
                  placeholder="Enter student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("Card")}
                disabled={isProcessing}
                className={`
                  p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all
                  ${
                    paymentMethod === "Card"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <CreditCard size={24} />
                <span className="font-medium">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("Bank Transfer")}
                disabled={isProcessing}
                className={`
                  p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all
                  ${
                    paymentMethod === "Bank Transfer"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <Building size={24} />
                <span className="font-medium">Bank Transfer</span>
              </button>
            </div>

            {paymentMethod === "Card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D/g, ""))
                    }
                    disabled={isProcessing}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        setCardExpiry(value);
                      }}
                      disabled={isProcessing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <Input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(e.target.value.replace(/\D/g, ""))
                      }
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer Info */}
            {paymentMethod === "Bank Transfer" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>
                    Bank Account Details:
                    <span className="bg-portal-lightYellow block mt-1 p-2 rounded">
                      This is a test account number, do not transfer money into
                      the account
                    </span>
                  </strong>
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>Bank: Polaris Bank</li>
                  <li>Account Name: School Fees Account</li>
                  <li>Account Number: 1234567890</li>
                  <li>Amount: {formatCurrency(totalAmount)}</li>
                </ul>
              </div>
            )}
          </div>
          {/* if payment method is bank transfer show confirm payment */}
          {paymentMethod === "Bank Transfer" ? (
            <Button
              className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg font-semibold"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Confirming Payment..."
                : `Confirm Payment ${formatCurrency(totalAmount)}`}
            </Button>
          ) : (
            <Button
              className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg font-semibold"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing Payment..."
                : `Pay ${formatCurrency(totalAmount)}`}
            </Button>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {selectedFee.map((fee, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{fee.type}</span>
                  <span className="font-medium">
                    {formatCurrency(fee.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-green-700">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
