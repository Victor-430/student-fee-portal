import { createContext, useContext, useState, useEffect, type ReactNode } from "react";


const FeeContext = createContext<FEECONTEXT | null>(null);

export const FeeProvider = ({ children }: { children: ReactNode }) => {


  // Load from localStorage or use defaults
  const [totalFee, setTotalFee] = useState<number>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    return saved ? JSON.parse(saved).totalFee : 0;
  });

  const [feeBalance, setFeeBalance] = useState<number>(() => {
  const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
  const parsed = saved ? JSON.parse(saved) : null;
  return parsed?.feeBalance ?? 0;
});

  const [paymentStatus, setPaymentStatus] = useState<PAYMENTSTATUS | string>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    return saved ? JSON.parse(saved).paymentStatus : "Outstanding";
  });

 const [amountPaid, setAmountPaid] = useState<number>(() => {
  const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
  const parsed = saved ? JSON.parse(saved) : null;
  return parsed?.amountPaid ?? 0; // Use nullish coalescing to default to 0
});
  const [clearAmountPaid, setClearAmountPaid] = useState<number>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    return saved ? JSON.parse(saved).clearAmountPaid : 0;
  });

 const [selectedFee, setSelectedFee] = useState<FEEDATA[]>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
  if (!saved) return [];
  
  try {
    const parsed = JSON.parse(saved);
    const fees = parsed?.selectedFee;
    return Array.isArray(fees) ? fees : [];
  } catch (error) {
    console.error("Error parsing selectedFee from localStorage", error);
    return [];
  }
});

  useEffect(() => {
    const dataToSave = {
      totalFee,
      feeBalance,
      paymentStatus,
      amountPaid,
      clearAmountPaid,
      selectedFee,
    };
    localStorage.setItem(import.meta.env.VITE_FEE_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [totalFee, feeBalance, paymentStatus, amountPaid, clearAmountPaid, selectedFee]);

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
    clearAmountPaid,
    setClearAmountPaid,
  };

  return <FeeContext.Provider value={feeValue}>{children}</FeeContext.Provider>;
};

export const useFee = () => {
  const context = useContext(FeeContext);
  if (!context) {
    throw new Error("useFee must be used within a FeeProvider");
  }
  return context;
};