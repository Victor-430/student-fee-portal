import { useLocation, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const PaymentSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedFee = (location.state as FEEDATA[]) || [];

  const totalAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handlePaymentNavigation = () => {
    navigate("/fees/payment", {
      state: { fee: selectedFee, total: totalAmount },
    });
  };

  return (
    <div>
      <div>
        <Button
          className="bg-blue-600 flex cursor-pointer justify-end p-2 text-lg"
          onClick={handleBackNavigation}
        >
          <ChevronLeft /> Back
        </Button>
        <div className=" uppercase text-center font-bold text-xl lg:text-3xl my-4">
          Payment Summary
        </div>
      </div>
      <div className="border-portal-ash border-b-2 my-4 "></div>

      {/* summary table */}
      {selectedFee.length === 0 ? (
        <div className="text-center py-8 text-portal-ash">
          No fee selected. Pleasse go back and select fees to pay.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>PAYMENT TYPE</TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedFee.map((fee, index) => (
              <TableRow key={fee.no}>
                <TableCell className="text-left">{fee.no}</TableCell>

                <TableCell>{index + 1}</TableCell>
                <TableCell>{fee.type}</TableCell>
                <TableCell>{fee.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-bold text-lg">
                Total Amount
              </TableCell>
              <TableCell className="text-right font-bold text-lg">
                &#8358;{totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
      <div className="flex gap-4 mt-8">
        <Button className="bg-portal-ash flex-1">Modify Selection</Button>
        <Button
          className="bg-portal-green flex-1"
          onClick={handlePaymentNavigation}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};
