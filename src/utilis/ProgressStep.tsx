export const ProgressStep = ({
  stepNumber,
  label,
  isActive,
  isCompleted,
}: {
  stepNumber: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}) => {
  const getStepColor = () => {
    if (isCompleted) return "bg-green-600 text-white";
    if (isActive) return "bg-blue-600 text-white";
    return "bg-gray-300 text-gray-600";
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`
            w-10 h-10 rounded-full flex items-center justify-center 
            font-bold text-sm transition-all duration-300
            ${getStepColor()}
          `}
      >
        {isCompleted ? "✓" : stepNumber}
      </div>
      <span className="text-xs mt-2 text-center max-w-[100px] font-medium">
        {label}
      </span>
    </div>
  );
};
