import { createContext, useContext, useState, type ReactNode } from "react";

const FeeContext = createContext<FEECONTEXT | null>(null);
export const FeeProvider = ({ children }: { children: ReactNode }) => {
  // money to be paid for the session
  const [totalFee, setTotalFee] = useState<number>(0);

  // fee balance is total amount - amount paid
  const [feeBalance, setFeeBalance] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<PAYMENTSTATUS | string>(
    "Outstanding"
  );

  // amount paid is based on the selection state
  const [amountPaid, setAmountPaid] = useState<number>(0);

  // selection state is based on the box selected
  const [selectedFee, setSelectedFee] = useState<FEEDATA[]>([]);

  const feeValue: FEECONTEXT = {
    totalFee,
    feeBalance,
    paymentStatus,
    amountPaid,
    selectedFee,
    setSelectedFee,
    setAmountPaid,
    setFeeBalance,
    setPaymentStatus,
    setTotalFee,
  };

  return <FeeContext.Provider value={feeValue}>{children}</FeeContext.Provider>;
};

export const useFee = () => {
  const context = useContext(FeeContext);
  if (!context) {
    throw new Error("useFee must be used withtin a Feeprovider");
  }
};
