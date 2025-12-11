import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const SchoolFeeTable = (setSelectedFee) => {
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

  const feeSelection = (selection: FEEDATA) => {
    setSelectedFee((prev) => [...prev, selection]);
  };

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
              <Checkbox />
              <TableCell>{fee.type}</TableCell>
            </div>
            <TableCell>{fee.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell className="text-right"></TableCell>
      </TableFooter>
    </Table>
  );
};
