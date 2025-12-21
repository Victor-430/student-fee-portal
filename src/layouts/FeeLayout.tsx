import { Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { PaymentIndicator } from "@/components/fee/PaymentIndicator";

export const FeeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleBack = () => {
    if (pathname === "/fees/payment") {
      navigate("/");
      return;
    } else if (pathname === "/fees/summary") {
      navigate(-1);
      return;
    }
    navigate(-1);
  };

  return (
    <div>
      <div className="mb-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-4 my-6 mx-8 py-2"
          onClick={handleBack}
        >
          <ChevronLeft size={20} /> Back
        </Button>
      </div>

      <PaymentIndicator />

      <Outlet />
    </div>
  );
};
