import { TransactionStorage } from "@/utils/transactionStorage";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";

const FeeContext = createContext<FEECONTEXT | null>(null);

export const FeeProvider = ({ children }: { children: ReactNode }) => {
  const [totalFee, setTotalFee] = useState<number>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    return saved ? JSON.parse(saved).totalFee : 0;
  });

  const [feeBalance, setFeeBalance] = useState<number>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    return parsed?.feeBalance ?? 0;
  });

  const [paymentStatus, setPaymentStatus] = useState<PAYMENTSTATUS | string>(
    () => {
      const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
      return saved ? JSON.parse(saved).paymentStatus : "Outstanding";
    }
  );

  const [amountPaid, setAmountPaid] = useState<number>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    return parsed?.amountPaid ?? 0;
  });
  const [clearAmountPaid, setClearAmountPaid] = useState<number>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    return saved ? JSON.parse(saved).clearAmountPaid : 0;
  });

  const [compulsoryFee, setCompulsoryFee] = useState<number>(() => {
    const saved = localStorage.getItem(import.meta.env.VITE_FEE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : 0;
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

  const syncFromTransactions = useCallback(() => {
    const allTransaction = TransactionStorage.getAll();

    const totalPaidAmount = allTransaction
      .filter((t:TRANSACTION) => t.status === "Completed")
      .reduce((sum:number, t:TRANSACTION) => sum + t.totalAmount, 0);

    setAmountPaid(totalPaidAmount);
    const balance = totalFee - totalPaidAmount;
    setFeeBalance(balance);

    if (totalFee > 0) {
      if (totalPaidAmount >= totalFee) {
        setPaymentStatus("Completed");
      } else if (totalPaidAmount > 0 && totalPaidAmount < totalFee) {
        setPaymentStatus("Part Payment");
      } else {
        setPaymentStatus("Outstanding");
      }
    }
  }, [totalFee]);

  useEffect(() => {
    syncFromTransactions();

    // custom event listener for transaction updates
    const handleTransactionUpdate = () => {
      syncFromTransactions()
    };

    window.addEventListener("transactionUpdated", handleTransactionUpdate);

    window.addEventListener("storage", handleTransactionUpdate);

    return () => {
      window.removeEventListener("transactionUpdated", handleTransactionUpdate);
      window.removeEventListener("storage", handleTransactionUpdate);
    };
  }, [syncFromTransactions]);

  useEffect(() => {
    const dataToSave = {
      totalFee,
      feeBalance,
      paymentStatus,
      amountPaid,
      clearAmountPaid,
      selectedFee,
      compulsoryFee,
    };
    localStorage.setItem(
      import.meta.env.VITE_FEE_STORAGE_KEY,
      JSON.stringify(dataToSave)
    );
  }, [
    totalFee,
    feeBalance,
    paymentStatus,
    amountPaid,
    clearAmountPaid,
    selectedFee,
    compulsoryFee,
  ]);

  const feeValue = useMemo<FEECONTEXT>(
    () => ({
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
      setCompulsoryFee,
      compulsoryFee,
      syncFromTransactions,
    }),
    [
      totalFee,
      feeBalance,
      paymentStatus,
      amountPaid,
      selectedFee,
      clearAmountPaid,
      compulsoryFee,
      syncFromTransactions,
    ]
  );

  return <FeeContext.Provider value={feeValue}>{children}</FeeContext.Provider>;
};

export const useFee = () => {
  const context = useContext(FeeContext);
  if (!context) {
    throw new Error("useFee must be used within a FeeProvider");
  }
  return context;
};
