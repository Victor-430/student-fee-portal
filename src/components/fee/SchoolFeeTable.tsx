
// import { useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Checkbox } from "../ui/checkbox";
// import { useFee } from "@/hooks/useFee";

// export const SchoolFeeTable = () => {
//   const {
//     selectedFee,
//     setSelectedFee,
//     setTotalFee,
//     setAmountPaid,
//     totalFee,
//     setFeeBalance,
//   } = useFee();

//   const feeData: FEEDATA[] = [
//     { type: "School charges", amount: 150000, no: 1 },
//     { type: "Hostel fee", amount: 50000, no: 2 },
//     { type: "Examination fee", amount: 10000, no: 3 },
//     { type: "Practical", amount: 30000, no: 4 },
//     { type: "PTA", amount: 2000, no: 5 },
//     { type: "Science Lab", amount: 4000, no: 6 },
//     { type: "Sports", amount: 5000, no: 7 },
//     { type: "Interhouse sport", amount: 10000, no: 8 },
//     { type: "Result printing", amount: 5000, no: 9 },
//     { type: "ID card", amount: 5000, no: 10 },
//     { type: "Music", amount: 5000, no: 11 },
//     { type: "Lab Manual", amount: 1000, no: 12 },
//   ];

//   useEffect(() => {
//     const total = feeData.reduce((sum, fee) => sum + fee.amount, 0);
//     setTotalFee(total);
//   }, []); 

//   const selectedAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);

//   useEffect(() => {
//     setAmountPaid(selectedAmount);
//     setFeeBalance(totalFee - selectedAmount);
//   }, [selectedAmount, totalFee, setAmountPaid, setFeeBalance]);

//   const isItemChecked = (feeNo: number) => {
//     return selectedFee.some((fee) => fee.no === feeNo);
//   };

//   const handleCheckedItems = (fee: FEEDATA, isChecked: boolean) => {
//     if (isChecked) {
//       setSelectedFee((prev: FEEDATA[]) => {
//         if (prev.some((f) => f.no === fee.no)) return prev;
//         return [...prev, fee];
//       });
//     } else {
//       setSelectedFee((prev: FEEDATA[]) =>
//         prev.filter((item) => item.no !== fee.no)
//       );
//     }
//   };

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-16">S/N</TableHead>
//           <TableHead>PAYMENT TYPE</TableHead>
//           <TableHead className="text-right">AMOUNT (₦)</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {feeData.map((fee) => (
//           <TableRow key={fee.no}>
//             <TableCell className="text-center">{fee.no}</TableCell>
//             <TableCell>
//               <div className="flex gap-3 items-center">
//                 <Checkbox
//                   checked={isItemChecked(fee.no)}
//                   onCheckedChange={(checked) =>
//                     handleCheckedItems(fee, checked as boolean)
//                   }
//                 />
//                 <span>{fee.type}</span>
//               </div>
//             </TableCell>
//             <TableCell className="text-right font-medium">
//               {fee.amount.toLocaleString()}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={2} className="font-bold text-lg">
//             Selected Total
//           </TableCell>
//           <TableCell className="text-right font-bold text-lg">
//             ₦{selectedAmount.toLocaleString()}
//           </TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   );
// };


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
import { TransactionStorage } from "@/utils/TransactionStorage";

export const SchoolFeeTable = () => {
  const {
    selectedFee,
    setSelectedFee,
    setTotalFee,
    setAmountPaid,
    totalFee,
    setFeeBalance,
  } = useFee();

  const [paidFees, setPaidFees] = useState<number[]>([]);
  const [hasCompletedFirstPayment, setHasCompletedFirstPayment] = useState(false);

  // Define fee data with compulsory flag - MUST be defined before use
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

  // Calculate minimum compulsory fees - Now feeData is defined
  const compulsoryFeesTotal = feeData
    .filter(fee => fee.isCompulsory)
    .reduce((sum, fee) => sum + fee.amount, 0);

  // Load paid fees from transaction history
  useEffect(() => {
    const transactions = TransactionStorage.getAll();
    const completedTransactions = transactions.filter(t => t.status === "Completed");
    
    if (completedTransactions.length > 0) {
      setHasCompletedFirstPayment(true);
      
      // Get all paid fee numbers from completed transactions
      const paidFeeNumbers = new Set<number>();
      completedTransactions.forEach(transaction => {
        transaction.fees.forEach(fee => {
          const feeItem = feeData.find(f => f.type === fee.type);
          if (feeItem) {
            paidFeeNumbers.add(feeItem.no);
          }
        });
      });
      
      setPaidFees(Array.from(paidFeeNumbers));
    }
  }, []);

  // Calculate total fee
  useEffect(() => {
    const total = feeData.reduce((sum, fee) => sum + fee.amount, 0);
    setTotalFee(total);
  }, []);

  const selectedAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);

  useEffect(() => {
    setAmountPaid(selectedAmount);
    setFeeBalance(totalFee - selectedAmount);
  }, [selectedAmount, totalFee, setAmountPaid, setFeeBalance]);

  const isItemChecked = (feeNo: number) => {
    return selectedFee.some((fee) => fee.no === feeNo);
  };

  const isItemPaid = (feeNo: number) => {
    return paidFees.includes(feeNo);
  };

  const isItemUnpaid = (feeNo: number) => {
    return hasCompletedFirstPayment && !isItemPaid(feeNo);
  };

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

  // Check if minimum compulsory fees are selected
  const selectedCompulsoryAmount = selectedFee
    .filter(fee => {
      const feeItem = feeData.find(f => f.no === fee.no);
      return feeItem?.isCompulsory;
    })
    .reduce((sum, fee) => sum + fee.amount, 0);

  const hasMetMinimumRequirement = selectedCompulsoryAmount >= compulsoryFeesTotal;

  return (
    <div>
      {/* Compulsory Fees Notice */}
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="text-blue-600 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-blue-900">Compulsory Fees Required</p>
            <p className="text-sm text-blue-700 mt-1">
              You must pay all compulsory fees (marked with *) totaling{" "}
              <span className="font-bold">₦{compulsoryFeesTotal.toLocaleString()}</span> before proceeding.
            </p>
            {!hasMetMinimumRequirement && selectedFee.length > 0 && (
              <p className="text-sm text-red-600 mt-2 font-medium">
                ⚠️ You have not selected all compulsory fees. Please select all required fees.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
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
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold">*</span>
            <span>Compulsory</span>
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
                  ${isPaid ? 'bg-green-50 hover:bg-green-100' : ''}
                  ${isUnpaid ? 'bg-yellow-50 hover:bg-yellow-100' : ''}
                  ${fee.isCompulsory && !isPaid ? 'border-l-4 border-l-red-500' : ''}
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
                      <span className={isPaid ? 'text-gray-500 line-through' : ''}>
                        {fee.type}
                      </span>
                      {fee.isCompulsory && !isPaid && (
                        <span className="text-red-600 font-bold text-lg">*</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className={`text-right font-medium ${isPaid ? 'text-gray-500' : ''}`}>
                  {fee.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  {isPaid && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-500">
                      ✓ Paid
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
              {!hasMetMinimumRequirement && selectedFee.length > 0 && (
                <span className="ml-2 text-sm text-red-600 font-normal">
                  (Minimum required: ₦{compulsoryFeesTotal.toLocaleString()})
                </span>
              )}
            </TableCell>
            <TableCell className="text-right font-bold text-lg">
              ₦{selectedAmount.toLocaleString()}
            </TableCell>
          </TableRow>
          {hasMetMinimumRequirement && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-sm text-green-600 font-medium">
                ✓ Minimum payment requirement met
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
};