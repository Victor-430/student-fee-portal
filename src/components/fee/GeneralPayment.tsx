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

export const GeneralPayment = () => {
  // store reach item selected in an array
  const [selectedFee, setSelectedFee] = useState();

  interface FEEDATA {
    type: string;
    amount: number;
    no: number;
  }

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

  const feeSelection = 

  return (
    <div className="p-6">
      <div className=" uppercase  py-4">General Payment Section</div>
      <div className="border-portal-ash border-b-2 "></div>
      <div className=" rounded-lg p-6 bg-portal-lightCyan py-4">
        Tick the boxes to select fees to be paid.Fees can be paid
        installmentally or in full
        <div className="rounded-lg p-6 bg-portal-lightRed">
          <strong>
            NOTE. It is important that you select an amount equal or grater than
            the compulsory fee
          </strong>
        </div>
      </div>
      <div className="border-portal-ash border-b-2 "></div>

      {/* payment indicator */}
      <div className="flex flex-row">
        <div className="border-portal-darkGray border-b-4"></div>
        <div className="bg-portal-darkGray w-4 h-4 rounded-full justify-center flex items-center">
          1 <span>Payment Type Selection</span>
        </div>
        <div className="border-portal-darkGray border-b-4"></div>
        <div className="bg-portal-darkGray w-4 h-4 rounded-full justify-center flex items-center">
          2 <span>Payment Preview</span>
        </div>
        <div className="border-portal-darkGray border-b-4"></div>
        <div className="bg-portal-darkGray w-4 h-4 rounded-full justify-center flex items-center">
          3 <span>Make Payment</span>
        </div>
      </div>

      {/* Fee Table */}
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
              <div className="flex gap-8">
                <Checkbox />
                <TableCell onClick={} >{fee.type}</TableCell>
              </div>
              <TableCell>&Naira;{fee.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableFooter>
      </Table>
    </div>
  );
};
