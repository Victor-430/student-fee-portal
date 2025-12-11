interface FEECONTEXT {
  totalFee: number;
  amountPaid: number;
  feeBalance: number;
  selectedFee: FEEDATA[];
  setSelectedFee: React.Dispatch<React.SetStateAction<FEEDATA[]>>;
  setAmountPaid: (amount: number) => void;
  setTotalFee: (fee: number) => void;
  setFeeBalance: (balance: number) => void;
  setPaymentStatus: (status: PAYMENTSTATUS | string) => void;
  paymentStatus: PAYMENTSTATUS | string;
}
