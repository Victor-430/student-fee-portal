
import { useEffect } from "react";
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

export const SchoolFeeTable = () => {
  const {
    selectedFee,
    setSelectedFee,
    setTotalFee,
    setAmountPaid,
    totalFee,
    setFeeBalance,
  } = useFee();

  const feeData: FEEDATA[] = [
    { type: "School charges", amount: 150000, no: 1 },
    { type: "Hostel fee", amount: 50000, no: 2 },
    { type: "Examination fee", amount: 10000, no: 3 },
    { type: "Practical", amount: 30000, no: 4 },
    { type: "PTA", amount: 2000, no: 5 },
    { type: "Science Lab", amount: 4000, no: 6 },
    { type: "Sports", amount: 5000, no: 7 },
    { type: "Interhouse sport", amount: 10000, no: 8 },
    { type: "Result printing", amount: 5000, no: 9 },
    { type: "ID card", amount: 5000, no: 10 },
    { type: "Music", amount: 5000, no: 11 },
    { type: "Lab Manual", amount: 1000, no: 12 },
  ];

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">S/N</TableHead>
          <TableHead>PAYMENT TYPE</TableHead>
          <TableHead className="text-right">AMOUNT (₦)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feeData.map((fee) => (
          <TableRow key={fee.no}>
            <TableCell className="text-center">{fee.no}</TableCell>
            <TableCell>
              <div className="flex gap-3 items-center">
                <Checkbox
                  checked={isItemChecked(fee.no)}
                  onCheckedChange={(checked) =>
                    handleCheckedItems(fee, checked as boolean)
                  }
                />
                <span>{fee.type}</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium">
              {fee.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="font-bold text-lg">
            Selected Total
          </TableCell>
          <TableCell className="text-right font-bold text-lg">
            ₦{selectedAmount.toLocaleString()}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
