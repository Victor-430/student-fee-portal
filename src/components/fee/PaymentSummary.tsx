import { useNavigate } from "react-router";
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
import { useFee } from "@/hooks/useFee";
import { toast } from "sonner";

export const PaymentSummary = () => {
  const { selectedFee } = useFee();
  const navigate = useNavigate();

  const totalAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);

  const handleBackNavigation = () => {
    navigate("/fees");
  };

  const handlePaymentNavigation = () => {
    if (selectedFee.length === 0) {
      toast.error("No fee selected");
      navigate("/fees");
      return;
    }

    navigate("/fees/payment");
  };

  return (
    <div>
      <div>
        <div className=" uppercase text-center font-bold text-xl lg:text-3xl my-4">
          Payment Summary
        </div>
      </div>
      <div className="border-portal-ash border-b-2 my-4 "></div>

      {/* summary table */}
      {selectedFee.length === 0 ? (
        <div className="text-center py-8 text-portal-ash">
          Go back to selection
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
              <TableCell colSpan={3} className="font-bold text-lg">
                Total Amount
              </TableCell>
              <TableCell className="text-right font-bold text-lg">
                &#8358;{totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          Payment Information
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• You will be redirected to a secure payment gateway</li>
          <li>• Payment confirmation will be sent to your email</li>
          <li>• Receipt can be downloaded after successful payment</li>
        </ul>
      </div>

      <div className="flex gap-4 mt-8">
        <Button className="bg-portal-ash flex-1" onClick={handleBackNavigation}>
          Modify Selection
        </Button>
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
