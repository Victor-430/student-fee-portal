import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { useFee } from "@/hooks/useFee";
import { AlertCircle } from "lucide-react";
import { TransactionStorage } from "@/utils/transactionStorage";

export const SchoolFeeTable = ({ FirstPaymentPaid }: SCHOOLFEETABLEPROP) => {
  const {
    selectedFee,
    setSelectedFee,
    setTotalFee,
    compulsoryFee,
    setCompulsoryFee,
  } = useFee();

  const [paidFees, setPaidFees] = useState<number[]>([]);
  const [hasCompletedFirstPayment, setHasCompletedFirstPayment] =
    useState(false);

  const feeData: (FEEDATA & { isCompulsory?: boolean })[] = [
    { type: "School charges", amount: 150000, no: 1, isCompulsory: true },
    { type: "Hostel fee", amount: 50000, no: 2, isCompulsory: false },
    { type: "Examination fee", amount: 10000, no: 3, isCompulsory: true },
    { type: "Practical", amount: 30000, no: 4, isCompulsory: false },
    { type: "PTA", amount: 2000, no: 5, isCompulsory: true },
    { type: "Science Lab", amount: 4000, no: 6, isCompulsory: false },
    { type: "Sports", amount: 5000, no: 7, isCompulsory: false },
    { type: "Interhouse sport", amount: 10000, no: 8, isCompulsory: false },
    { type: "Result printing", amount: 5000, no: 9, isCompulsory: false },
    { type: "ID card", amount: 5000, no: 10, isCompulsory: false },
    { type: "Music", amount: 5000, no: 11, isCompulsory: false },
    { type: "Lab Manual", amount: 1000, no: 12, isCompulsory: false },
  ];

  useEffect(() => {
    const loadTransactionHistory = () => {
      const transactions = TransactionStorage.getAll();
      const completedTransactions = transactions.filter(
        (t) => t.status === "Completed"
      );

      if (completedTransactions.length > 0) {
        const paidFeeNumbers = new Set<number>();
        completedTransactions.forEach((transaction) => {
          transaction.fees.forEach((fee) => {
            const feeItem = feeData.find((f) => f.type === fee.type);
            if (feeItem) {
              paidFeeNumbers.add(feeItem.no);
            }
          });
        });

        setPaidFees(Array.from(paidFeeNumbers));
        setHasCompletedFirstPayment(true);
      } else {
        setPaidFees([]);
        setHasCompletedFirstPayment(false);
      }
    };

    const loadRequiredFee = () => {
      const total = feeData.reduce((sum, fee) => sum + fee.amount, 0);

      const compulsoryFeesTotal = feeData
        .filter((fee) => fee.isCompulsory)
        .reduce((sum, fee) => sum + fee.amount, 0);

      setTotalFee(total);
      setCompulsoryFee(compulsoryFeesTotal);
    };

    loadTransactionHistory();
    loadRequiredFee();
  }, []);

  const isItemPaid = (feeNo: number) => {
    return paidFees.includes(feeNo);
  };

    const isItemChecked = (feeNo: number) => {
    return selectedFee.some((fee) => fee.no === feeNo);
  };


  const isItemUnpaid = (feeNo: number) => {
    return hasCompletedFirstPayment && !isItemPaid(feeNo);
  };

  // note: compulsoryFees is used to get the boolean state
  // while compulsoryFee is the total fee that is required to be paid
  const compulsoryFees = feeData.filter((fee) => fee.isCompulsory);
  const allCompulsoryFeesPaid = compulsoryFees.every((fee) =>
    isItemPaid(fee.no)
  );

  const allCompulsoryFeesSelected = compulsoryFees.every(
    (fee) => isItemChecked(fee.no) || isItemPaid(fee.no)
  );

  useEffect(() => {
    // pass selected compulsory fee to enable the continue button
    FirstPaymentPaid?.(allCompulsoryFeesSelected);
  }, [allCompulsoryFeesSelected, FirstPaymentPaid]);

  const selectedAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);



  const handleCheckedItems = (fee: FEEDATA, isChecked: boolean) => {
    if (isChecked) {
      setSelectedFee((prev: FEEDATA[]) => {
        if (prev.some((f) => f.no === fee.no)) return prev;
        return [...prev, fee];
      });
    } else {
      setSelectedFee((prev: FEEDATA[]) =>
        prev.filter((item) => item.no !== fee.no)
      );
    }
  };

  const selectedCompulsoryAmount = selectedFee
    .filter((fee) => {
      const feeItem = feeData.find((f) => f.no === fee.no);
      return feeItem?.isCompulsory;
    })
    .reduce((sum, fee) => sum + fee.amount, 0);

  const hasMetMinimumRequirement = hasCompletedFirstPayment
    ? true
    : selectedCompulsoryAmount >= compulsoryFee;

  return (
    <div>
      {!hasCompletedFirstPayment && !allCompulsoryFeesSelected && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-blue-900">
                Compulsory Fees Required
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Your first payment must include{" "}
                <span className="font-bold">all compulsory fee totaling</span>
                <span className="font-bold mx-1">
                  ₦{compulsoryFee.toLocaleString()}.
                </span>
                You can add optional fees to this payment or pay them later.
              </p>

              {!allCompulsoryFeesSelected && selectedFee.length > 0 && (
                <p className="text-sm text-red-600 mt-2 font-medium">
                  You have not selected all compulsory fees. Please select all
                  required fees.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {hasCompletedFirstPayment && allCompulsoryFeesSelected && (
        <div className="mb-4 flex p-4 bg-green-50 border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-green-600 mt-0.5 size={20}" />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-green-900">
              All compulsory Fees paid
            </p>
            <p className="text-sm text-green-700 mt-1">
              You have completed all compulsory fee payment.You can now pay any
              remaining optional fee at your convenience
            </p>
          </div>
        </div>
      )}
      {hasCompletedFirstPayment && (
        <div className="mb-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
            <span>Paid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded"></div>
            <span>Unpaid</span>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">S/N</TableHead>
            <TableHead>PAYMENT TYPE</TableHead>
            <TableHead className="text-right">AMOUNT (₦)</TableHead>
            <TableHead className="text-center w-24">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeData.map((fee) => {
            const isPaid = isItemPaid(fee.no);
            const isUnpaid = isItemUnpaid(fee.no);

            return (
              <TableRow
                key={fee.no}
                className={`
                  ${isPaid ? "bg-green-50 hover:bg-green-100" : ""}
                  ${isUnpaid ? "bg-yellow-50 hover:bg-yellow-100" : ""}
                  ${
                    fee.isCompulsory && !isPaid
                      ? "border-l-4 border-l-red-500"
                      : ""
                  }
                `}
              >
                <TableCell className="text-center">{fee.no}</TableCell>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <Checkbox
                      checked={isItemChecked(fee.no)}
                      onCheckedChange={(checked) =>
                        handleCheckedItems(fee, checked as boolean)
                      }
                      disabled={isPaid}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className={isPaid ? "text-gray-500 line-through" : ""}
                      >
                        {fee.type}
                      </span>

                      {fee.isCompulsory &&
                        !isPaid &&
                        !hasCompletedFirstPayment && (
                          <span
                            className="text-red-600 font-bold text-lg"
                            title="Compulsory for first payment"
                          >
                            *
                          </span>
                        )}
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    isPaid ? "text-gray-500" : ""
                  }`}
                >
                  {fee.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  {isPaid && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-500">
                      Paid
                    </span>
                  )}
                  {isUnpaid && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-500">
                      Unpaid
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-bold text-lg">
              Selected Total
              {!hasCompletedFirstPayment &&
                !allCompulsoryFeesSelected &&
                !allCompulsoryFeesPaid &&
                selectedFee.length > 0 && (
                  <span className="ml-2 text-sm text-red-600 font-normal">
                    (Must include all compulsory fees: ₦
                    {compulsoryFee.toLocaleString()})
                  </span>
                )}
            </TableCell>
            <TableCell className="text-right font-bold text-lg">
              ₦{selectedAmount.toLocaleString()}
            </TableCell>
          </TableRow>
          {hasMetMinimumRequirement && selectedFee.length > 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-sm text-green-600 font-medium"
              >
                {hasCompletedFirstPayment
                  ? "You can proceed with this payment"
                  : allCompulsoryFeesSelected
                  ? "All compulsory fees selected - you can proceed"
                  : "Payment ready"}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
};
