// import { useState, ReactNode } from "react";

// interface TabItem {
//   label: string;
//   content: ReactNode;
// }

// interface ReusableTailwindTabsProps {
//   tabs: TabItem[];
//   onChange?: (index: number) => void;
// }

// const ReusableTab = ({ tabs, onChange }: ReusableTailwindTabsProps) => {
//   const [tabIndex, setTabIndex] = useState(0);

//   const handleTabChange = (index: number) => {
//     setTabIndex(index);
//     if (onChange) onChange(index);
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <div className="flex space-x-1 bg-blue-400 rounded-xl p-1">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             onClick={() => handleTabChange(index)}
//             className={`w-full py-2.5 text-sm font-medium rounded-lg 
//               ${
//                 tabIndex === index
//                   ? "bg-white text-blue-700 shadow"
//                   : "text-black hover:bg-white/10"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 `}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       <div className="mt-2 rounded-xl bg-white p-3 shadow">
//         {tabs[tabIndex].content}
//       </div>
//     </div>
//   );
// };
// export default ReusableTab;
// components/ReusableTailwindTabs.tsx
import React, { ReactNode } from "react";

interface TabItem {
  label: string;
  content: ReactNode;
}

interface ReusableTailwindTabsProps {
  tabs: TabItem[];
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

const ReusableTab: React.FC<ReusableTailwindTabsProps> = ({
  tabs,
  tabIndex,
  setTabIndex,
}) => {
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex space-x-1 bg-blue-400 rounded-xl p-1">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`w-full py-2.5 text-sm font-medium rounded-lg ${
              tabIndex === index
                ? "bg-white text-blue-700 shadow"
                : "text-black hover:bg-white/10"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-2 rounded-xl bg-white p-3 shadow">
        {tabs[tabIndex].content}
      </div>
    </div>
  );
};

export default ReusableTab;

