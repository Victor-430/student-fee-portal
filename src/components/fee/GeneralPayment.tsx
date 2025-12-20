import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useFee } from "@/hooks/useFee";
import { SchoolFeeTable } from "./SchoolFeeTable";
import { toast } from "sonner";
import { useState } from "react";

export const GeneralPayment = () => {
  const { selectedFee, compulsoryFee } = useFee();
  const [firstPayment, setFirstPayment] = useState(false);

  const navigation = useNavigate();

  // track first payment for compulsory fee
  const requiredFee = (selection: boolean) => {
    if (selection && compulsoryFee) {
      setFirstPayment(true);
    } else if (!selection && compulsoryFee) {
      setFirstPayment(selection);
    }
  };

  const continuePayment = () => {
    // track subsequent payment
    if (selectedFee.length === 0) {
      toast.error("Please select at least one fee to continue");
      return;
    }
    navigation("/fees/summary", { state: selectedFee });
  };

  return (
    <div className="p-4 md:p-6">
      <div className=" uppercase text-center font-bold text-xl lg:text-3xl my-4">
        General Payment Section
      </div>
      <div className="border-portal-ash border-b-2 my-4 "></div>
      <div className=" rounded-lg p-6 bg-portal-lightCyan space-y-4 ">
        <p>
          Tick the boxes to select fees to be paid.Fees can be paid
          instrumentally or in full
        </p>
        <div className="rounded-lg p-6 bg-portal-lightRed">
          <strong>
            NOTE. It is important that you select an amount equal or greater
            than the compulsory fee
          </strong>
        </div>
      </div>
      <div className="border-portal-ash border-b-2 my-4"></div>

      <SchoolFeeTable FirstPaymentPaid={requiredFee} />

      <Button
        className="bg-portal-green w-full p-2 my-8"
        disabled={!firstPayment}
        onClick={continuePayment}
      >
        Continue
      </Button>
    </div>
  );
};
