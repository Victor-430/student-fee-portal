import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Download, Printer, ChevronLeft } from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/transactionHelpers";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";


export const DownloadReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const transaction = location.state as TRANSACTION | null;


const handleDownloadPDF = async () => {
  if (!receiptRef.current) {
    toast.error("Receipt unavailable.");
    return;
  }

  setIsGenerating(true);
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    // Clone the element and convert oklch colors to hex
    const clone = receiptRef.current.cloneNode(true) as HTMLElement;
    
    // Add inline styles to override problematic colors
    const style = document.createElement('style');
    style.textContent = `
      * {
        background-color: white !important;
        color: #1f2937 !important;
      }
      .bg-gray-50 { background-color: #f9fafb !important; }
      .bg-gray-100 { background-color: #f3f4f6 !important; }
      .bg-blue-50 { background-color: #eff6ff !important; }
      .bg-green-100 { background-color: #dcfce7 !important; }
      .bg-yellow-100 { background-color: #fef9c3 !important; }
      .bg-red-100 { background-color: #fee2e2 !important; }
      .text-green-800 { color: #166534 !important; }
      .text-yellow-800 { color: #854d0e !important; }
      .text-red-800 { color: #991b1b !important; }
      .text-blue-700 { color: #1d4ed8 !important; }
      .text-gray-500 { color: #6b7280 !important; }
      .text-gray-600 { color: #4b5563 !important; }
      .text-gray-700 { color: #374151 !important; }
      .text-gray-800 { color: #1f2937 !important; }
      .border-gray-200 { border-color: #e5e7eb !important; }
      .border-gray-300 { border-color: #d1d5db !important; }
      .border-blue-600 { border-color: #2563eb !important; }
      .border-green-600 { border-color: #16a34a !important; }
      .border-yellow-600 { border-color: #ca8a04 !important; }
      .border-red-600 { border-color: #dc2626 !important; }
      .border-yellow-200 { border-color: #fef08a !important; }
    `;
    clone.insertBefore(style, clone.firstChild);
    
    const opt = {
      margin: 10,
      filename: `receipt-${transaction?.referenceNumber || 'unknown'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };
    
    await html2pdf().set(opt).from(clone).save();
    toast.success("Receipt downloaded successfully.");

  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Failed to generate PDF. Please try again");
  } finally {
    setIsGenerating(false);
  }
};

  const handlePrint = () => {
    window.print();
  };

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No transaction data found</p>
          <Button onClick={() => navigate("/transactions")}>
            View Transactions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={20} /> Back
          </Button>
          
          <div className="flex gap-2">
            <Button
            disabled={true}
              variant="outline"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer size={18} /> Print
            </Button>
            <Button
            disabled={true}
              onClick={handleDownloadPDF}
              
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Download size={18} /> 
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>

      {/* Receipt Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div 
          ref={receiptRef}
          className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none"
        >
          <Receipt transaction={transaction} />
        </div>

       
      </div>
    </div>
  );
};

const Receipt = ({ transaction }: { transaction: TRANSACTION }) => {
  const currentDate = new Date();
  
  return (
    <div className="p-8 md:p-12 relative">
      {transaction.status !== "Completed" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="text-8xl font-bold text-red-600 -rotate-45deg]">
            {transaction.status.toUpperCase()}
          </div>
        </div>
      )}    

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          PAYMENT RECEIPT
        </h2>
        <div className={`
          inline-block px-4 py-2 rounded-full text-sm font-semibold
          ${transaction.status === "Completed" 
            ? "bg-green-100 text-green-800 border-2 border-green-600" 
            : transaction.status === "Pending"
            ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-600"
            : "bg-red-100 text-red-800 border-2 border-red-600"}
        `}>
          {transaction.status.toUpperCase()}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Receipt Number
            </p>
            <p className="font-mono font-bold text-lg">
              {transaction.referenceNumber}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Transaction ID
            </p>
            <p className="font-mono text-sm">{transaction.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Payment Date
            </p>
            <p className="font-semibold">{formatDate(transaction.date)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Payment Method
            </p>
            <p className="font-semibold">{transaction.paymentMethod}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Student Name
            </p>
            <p className="font-bold text-lg">
              {transaction.studentName || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Student ID
            </p>
            <p className="font-semibold">{transaction.studentId || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Academic Session
            </p>
            <p className="font-semibold">{transaction.session || "2024/2025"}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase">
          Fee Breakdown
        </h3>
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">S/N</th>
                <th className="text-left p-4 font-semibold text-gray-700">Description</th>
                <th className="text-right p-4 font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transaction.fees.map((fee, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{fee.type}</td>
                  <td className="p-4 text-right font-medium">
                    {formatCurrency(fee.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-blue-50 border-t-2 border-blue-600">
              <tr>
                <td colSpan={2} className="p-4 text-right font-bold text-lg">
                  TOTAL AMOUNT PAID
                </td>
                <td className="p-4 text-right font-bold text-xl text-blue-700">
                  {formatCurrency(transaction.totalAmount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 mb-1">Amount in Words:</p>
        <p className="font-semibold text-gray-800">
          {numberToWords(transaction.totalAmount)} Naira Only
        </p>
      </div>

      <div className="border-t-2 border-gray-300 pt-18">
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <div className="mb-2">
              <div className="border-b-2 border-gray-400 w-48 mb-1"></div>
              <p className="text-sm text-gray-600">Authorized Signature</p>
            </div>
            <p className="text-xs text-gray-500">Bursar's Office</p>
          </div>

          <div className="text-right">
            <div className="inline-block border-2 border-dashed border-gray-400 rounded-lg p-4 mb-2">
              <p className="text-xs text-gray-500">OFFICIAL SCHOOL STAMP</p>
            </div>
          </div>
        </div>

        <div className="bg-portal-lightYellow border border-yellow-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-yellow-900 mb-2">
            IMPORTANT NOTES:
          </p>
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>• This receipt is valid only if stamped by the school.</li>
            <li>• Please keep this receipt for your records.</li>
            <li>• Payments are non-refundable except with written approval.</li>
            <li>• For inquiries, contact the Bursar's Office.</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Receipt generated on {currentDate.toLocaleDateString()} at {currentDate.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

const numberToWords = (num: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToWords(Math.abs(num));

  let words = '';

  // Millions
  if (num >= 1000000) {
    words += numberToWords(Math.floor(num / 1000000)) + ' Million ';
    num %= 1000000;
  }

  // Thousands
  if (num >= 1000) {
    words += numberToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }

  // Hundreds
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }

  // Tens and ones
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  } else if (num >= 10) {
    words += teens[num - 10] + ' ';
    return words.trim();
  }

  if (num > 0) {
    words += ones[num] + ' ';
  }

  return words.trim();
};