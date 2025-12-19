interface FEECONTEXT {
  totalFee: number;
  amountPaid: number;
  feeBalance: number;
  clearAmountPaid: number;
  selectedFee: FEEDATA[];
  setClearAmountPaid: (amount: number) => void;
  setSelectedFee: React.Dispatch<React.SetStateAction<FEEDATA[]>>;
  setAmountPaid: (amount: number) => void;
  setTotalFee: (fee: number) => void;
  setFeeBalance: (balance: number) => void;
  setPaymentStatus: (status: PAYMENTSTATUS | string) => void;
  paymentStatus: PAYMENTSTATUS | string;
  setCompulsoryFee: (amount: number) => void
  compulsoryFee: number
}

interface SCHOOLFEETABLEPROP {
  setSelectedFee: React.Dispatch<React.SetStateAction<FEEDATA[]>>;
}
