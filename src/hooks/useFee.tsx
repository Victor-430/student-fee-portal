import { createContext, useContext, useState } from "react";

export const useFee = () => {
  const FeeContext = createContext<number | string | null>(null);

  type PAYMENTSTATUS = "Completed" | "Outstanding";
  // outstanding payment can either be total amount not paid or part payment paid

  // money to be paid for the session
  const [totalFee, setTotalFee] = useState<number>();

  // fee balance is total amount - amount paid
  const [feeBalance, setFeeBalance] = useState<number>();
  const [paymentStatus, setPaymentStatus] = useState<PAYMENTSTATUS | string>();

  // amount paid is based on the selection state
  const [amountPaid, setAmountPaid] = useState<number>();

  // selection state is based on the box selected
  const [selectedFee, setSelectedFee] = useState<number>();

  const feeValue = {
    totalFee,
    feeBalance,
    paymentStatus,
    amountPaid,
    selectedFee,
  };

  return <FeeContext.Provider value={{ feeValue }}></FeeContext.Provider>;

  const useFee = useContext();
  if (!FeeContext) {
    throw new Error("Please use fee context withtin a global provider");
  }
};
