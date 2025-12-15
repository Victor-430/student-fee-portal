import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpenCheck } from "lucide-react";
import { useFee } from "@/hooks/useFee";
import { formatCurrency } from "@/utils/TransactionHelpers";

export const PaymentStatus = () => {
  const { totalFee, amountPaid, paymentStatus, feeBalance } = useFee();

  const statusConfig = useMemo(() => {
    if (paymentStatus === "Completed" || amountPaid >= totalFee) {
      return {
        color: "text-green-500",
        bgColor: "bg-green-50",
        label: "Completed",
      };
    } else if (amountPaid > 0) {
      return {
        color: "text-yellow-500",
        bgColor: "bg-yellow-50",
        label: "Part Payment",
      };
    } else {
      return {
        color: "text-red-500",
        bgColor: "bg-red-50",
        label: "Outstanding",
      };
    }
  }, [paymentStatus, amountPaid, totalFee]);

  return (
    <Card className="lg:w-[90%] rounded-lg py-12 text-white bg-portal-darkGray hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle className="text-center pb-6 text-2xl flex gap-4 justify-center items-center">
          Session 2024/25 <BookOpenCheck />
        </CardTitle>
        <CardContent>
          <div className="flex gap-4 justify-center">
            <div className="flex flex-col gap-4">
              <p className="text-sm opacity-80">Payment Status:</p>
              <div className="flex items-center gap-2">
               
                <p className={`font-bold text-2xl ${statusConfig.color}`}>
                  {statusConfig.label}
                </p>
              </div>
            </div>
            <div className="border-r-2 border-portal-lightCyan"></div>
            <div className="flex flex-col gap-4">
              <p className="text-sm opacity-80">Amount Paid (₦)</p>
              <p className="font-bold text-2xl text-green-400">
                {formatCurrency(amountPaid)}
              </p>
            </div>
          </div>

          {/* Show balance if there's outstanding payment */}
          {amountPaid < totalFee && totalFee > 0 && (
            <div className="mt-6 pt-4 border-t border-portal-lightCyan/30 text-center">
              <p className="text-sm opacity-80 mb-2">Balance Outstanding</p>
              <p className="font-bold text-xl text-yellow-400">
                {formatCurrency(feeBalance)}
              </p>
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};