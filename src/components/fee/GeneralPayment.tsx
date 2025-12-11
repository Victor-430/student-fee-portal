import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useFee } from "@/hooks/useFee";
import { SchoolFeeTable } from "./SchoolFeeTable";

export const GeneralPayment = () => {
  const { selectedFee, setSelectedFee } = useFee();

  const navigation = useNavigate();

  const continuePayment = () => {
    navigation("/fees/summary", { state: selectedFee });
  };

  const handlePrevNavigation = () => {
    navigation(-1);
  };

  return (
    <div className="p-4 md:p-6">
      <div>
        <Button
          className="bg-blue-600 flex cursor-pointer justify-end p-2 text-lg"
          onClick={handlePrevNavigation}
        >
          <ChevronLeft /> Back
        </Button>
        <div className=" uppercase text-center font-bold text-xl lg:text-3xl my-4">
          General Payment Section
        </div>
      </div>
      <div className="border-portal-ash border-b-2 my-4 "></div>
      <div className=" rounded-lg p-6 bg-portal-lightCyan space-y-4 ">
        <p>
          Tick the boxes to select fees to be paid.Fees can be paid
          installmentally or in full
        </p>
        <div className="rounded-lg p-6 bg-portal-lightRed">
          <strong>
            NOTE. It is important that you select an amount equal or greater
            than the compulsory fee
          </strong>
        </div>
      </div>
      <div className="border-portal-ash border-b-2 my-4"></div>

      {/* payment indicator */}
      <div className="flex flex-row">
        <div className="border-portal-darkGray border-b-4"></div>
        <div className="bg-portal-darkGray w-4 h-4 rounded-full justify-center flex-col flex items-center">
          1 <span>Payment Type Selection</span>
        </div>
        <div className="border-portal-darkGray border-b-4"></div>
        <div className="bg-portal-darkGray w-4 h-4 rounded-full justify-center flex  items-center">
          2 <span>Payment Preview</span>
        </div>
        <div className="border-portal-darkGray border-b-4"></div>
        <div className="bg-portal-darkGray w-4 h-4 rounded-full justify-center flex  items-center">
          3 <span>Make Payment</span>
        </div>
      </div>

      {/* Fee Table */}
      <SchoolFeeTable setSelectedFee={setSelectedFee} />

      <Button
        className="bg-portal-green w-full p-2 my-8"
        onClick={continuePayment}
      >
        Continue
      </Button>
    </div>
  );
};
