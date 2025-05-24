import React from "react";

interface SteeperProps {
  step: number;
  steps: string[];
}
const Stepper1: React.FC<SteeperProps> = ({ step, steps }) => {
  return (
    <div className="flex justify-between  p-3">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`flex flex-col items-center ${
            step === index + 1
              ? "bg-blue-100 text-white px-5"
              : "border-gray-300 text-gray-500"
          }`}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${
              step === index + 1
                ? "bg-blue-600 text-white"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`text-xl mt-1 ${
              step === index + 1
                ? " text-blue-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stepper1;
