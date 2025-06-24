// import React from "react";

// interface SteeperProps {
//   step: number;
//   steps: string[];
// }
// const Stepper1: React.FC<SteeperProps> = ({ step, steps }) => {
//   return (
//     <div className="flex justify-between  p-3">
//       {steps.map((label, index) => (
//         <div
//           key={index}
//           className={`flex flex-col items-center ${
//             step === index + 1
//               ? "bg-blue-100 text-white px-5"
//               : "border-gray-300 text-gray-500"
//           }`}
//         >
//           <div
//             className={`w-8 h-8 flex items-center justify-center rounded-full border ${
//               step === index + 1
//                 ? "bg-blue-600 text-white"
//                 : "border-gray-300 text-gray-500"
//             }`}
//           >
//             {index + 1}
//           </div>
//           <span
//             className={`text-xl mt-1 ${
//               step === index + 1
//                 ? " text-blue-600"
//                 : "border-gray-300 text-gray-500"
//             }`}
//           >
//             {label}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stepper1;
import React from 'react';

interface StepperProps {
  step: number;
  steps: string[];
}

const Stepper1: React.FC<StepperProps> = ({ step, steps }) => {
  return (
    <div className="flex items-center w-full mb-10 px-5 pt-10">
      {steps.map((label, index) => {
        const isCompleted = step > index + 1;
        const isCurrent = step === index + 1;

        return (
          <div className="flex-1 flex flex-col items-center relative" key={index}>
            {/* Left line */}
            {index !== 0 && (
              <div className="absolute top-4 left-0 w-1/2 h-0.5 bg-gray-300">
                <div
                  className={`h-full ${
                    step > index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></div>
              </div>
            )}

            {/* Right line */}
            {index !== steps.length - 1 && (
              <div className="absolute top-4 right-0 w-1/2 h-0.5 bg-gray-300 z-0">
                <div
                  className={`h-full ${
                    step > index + 1 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></div>
              </div>
            )}

            {/* Circle */}
            <div
              className={`z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold transition-all ${
                isCompleted
                  ? 'bg-blue-600 text-white border-blue-600'
                  : isCurrent
                  ? 'bg-white text-blue-600 border-blue-600'
                  : 'bg-white text-gray-400 border-gray-300'
              }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <span
              className={`text-lg mt-2 font-semibold ${
                isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper1;
