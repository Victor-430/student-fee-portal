import { useLocation } from "react-router";
import { ProgressStep } from "./ProgressStep";

export const PaymentIndicator = () => {
  const location = useLocation();

  const getCurrentStep = () => {
    if (location.pathname === "/fees") return 1;
    if (location.pathname === "/fees/summary") return 2;
    if (location.pathname === "/fees/payment") return 3;
    return 1;
  };

  const currentStep = getCurrentStep();
  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {/* Step 1 */}
        <ProgressStep
          stepNumber={1}
          label="Payment Selection"
          isActive={currentStep === 1}
          isCompleted={currentStep > 1}
        />

        {/* Connector Line */}
        <div
          className={`
                flex-1 h-1 mx-4 rounded transition-all duration-300
                ${currentStep > 1 ? "bg-green-600" : "bg-gray-300"}
              `}
        ></div>

        {/* Step 2 */}
        <ProgressStep
          stepNumber={2}
          label="Payment Summary"
          isActive={currentStep === 2}
          isCompleted={currentStep > 2}
        />

        {/* Connector Line */}
        <div
          className={`
                flex-1 h-1 mx-4 rounded transition-all duration-300
                ${currentStep > 2 ? "bg-green-600" : "bg-gray-300"}
              `}
        ></div>

        {/* Step 3 */}
        <ProgressStep
          stepNumber={3}
          label="Make Payment"
          isActive={currentStep === 3}
          isCompleted={currentStep > 3}
        />
      </div>
    </div>
  );
};
