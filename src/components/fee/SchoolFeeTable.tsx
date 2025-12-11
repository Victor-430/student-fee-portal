import { useState } from "react";
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

export const SchoolFeeTable = ({ setSelectedFee }: SCHOOLFEETABLEPROP) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const feeData: FEEDATA[] = [
    {
      type: "School charges",
      amount: 150000,
      no: 1,
    },
    {
      type: "Hostel fee",
      amount: 50000,
      no: 2,
    },
    {
      type: "Examination fee",
      amount: 10000,
      no: 3,
    },
    {
      type: "Practical",
      amount: 30000,
      no: 4,
    },
    {
      type: "PTA",
      amount: 2000,
      no: 5,
    },
    {
      type: "Science Lab",
      amount: 4000,
      no: 6,
    },
    {
      type: "Sports",
      amount: 5000,
      no: 7,
    },
    {
      type: "Interhouse sport",
      amount: 10000,
      no: 8,
    },
    {
      type: "Result printing",
      amount: 5000,
      no: 9,
    },
    {
      type: "ID card",
      amount: 5000,
      no: 10,
    },
    {
      type: "Music",
      amount: 5000,
      no: 11,
    },
    {
      type: "Lab Manual",
      amount: 1000,
      no: 12,
    },
  ];

  const handleCheckedItems = (fee: FEEDATA, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems((prev: number[]) => [...prev, fee.no]);
      setSelectedFee((prev: FEEDATA[]) => [...prev, fee]);
    } else {
      setCheckedItems((prev: number[]) =>
        prev.filter((num: number) => num !== fee.no)
      );
      setSelectedFee((prev: FEEDATA[]) =>
        prev.filter((item) => item.no !== fee.no)
      );
    }
  };

  const totalAmount = feeData
    .filter((fee) => checkedItems.includes(fee.no))
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>PAYMENT TYPE</TableHead>
          <TableHead className="text-right">AMOUNT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feeData.map((fee) => (
          <TableRow key={fee.type}>
            <TableCell className="text-left">{fee.no}</TableCell>
            <div className="flex gap-8 items-center">
              <Checkbox
                checked={checkedItems.includes(fee.no)}
                onCheckedChange={(checked) =>
                  handleCheckedItems(fee, checked as boolean)
                }
              />
              <TableCell>{fee.type}</TableCell>
            </div>
            <TableCell>{fee.amount.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell className="text-right">
          &#8358;{totalAmount.toLocaleString()}
        </TableCell>
      </TableFooter>
    </Table>
  );
};
