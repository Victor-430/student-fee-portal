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

export const GeneralPayment = () => {
  // store reach item selected in an array
  const [selectedFee, setSelectedFee] = useState();

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
            <TableHead>pAYMENT TYPE</TableHead>
            <TableHead className="text-right">AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow></TableRow>
        </TableBody>
        <TableFooter>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableFooter>
      </Table>
    </div>
  );
};
