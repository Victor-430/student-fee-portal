import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpenCheck } from "lucide-react";

export const PaymentStatus = () => {
  type PAYMENTSTATUS = "Completed" | "Outstanding";
  // outstanding payment can either be total amount not paid or part payment paid

  const [totalFee, setTotalFee] = useState<number>();
  const [feeBalance, setFeeBalance] = useState<number>();
  const [paymentStatus, setPaymentStatus] = useState<PAYMENTSTATUS | string>();
  const [amountPaid, setAmountPaid] = useState<number>();

  if (amountPaid < totalFee) {
    // yellow
    setFeeBalance(Math.floor(totalFee - amountPaid));
    setPaymentStatus("Outstanding");
  } else if (amountPaid === totalFee) {
    // red
  } else {
    // green
  }

  return (
    // <div className="rounded-lg p-4 border-2 border-portal-ash">
    //   <h2>Session:</h2> <span className="pl-4">(2025/2026)</span>
    //   <div className="border-r-2 border-portal-darkGray">Payment Status</div>
    //   <div
    //     className={`flex gap-6 flex-col ${
    //       paymentStatus === "Completed" ? "bg-green-600" : "bg-portal-darkRed"
    //     }`}
    //   >
    //     {/* show stauts based on whether payment is successful, outstanding payment with amount to be paid */}
    //     <p>{paymentStatus}</p>

    //     {paymentStatus === "Outstanding" && <p>Amount: {feeBalance}</p>}
    //   </div>
    // </div>

    // should show payment status for each section whether completed or outstanding

    <Card className=" rounded-lg p-4 py-12 text-white bg-portal-darkGray ">
      <CardHeader>
        <CardTitle className=" text-center pb-6 text-2xl flex gap-4 justify-center items-center">
          Session 2024/25 <BookOpenCheck />
        </CardTitle>
        <CardContent>
          <div className=" flex gap-4">
            <div className="flex flex-col gap-4">
              <p>Payment Status:</p>
              <p className="font-bold text-2xl">completed</p>
            </div>
            <div className="border-r-2 border-portal-lightCyan "></div>
            <div className="flex flex-col gap-4">
              <p>(Amount &#8358; )</p>
              <p className="font-bold text-2xl">10,000</p>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
