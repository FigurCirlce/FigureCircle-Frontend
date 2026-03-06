// import React from "react";
// import { useState,useEffect } from "react";
// // import { createPortal } from "react-dom";

// interface SelectOption {
//   [key: string]: string | number;
// }

// interface SearchableSelectProps {
//   value: string | number | null;
//   onChange: (value: string | number) => void;
//   options: SelectOption[];
//   placeholder?: string;
//   labelKey?: string;
//   valueKey?: string;
// }


// const SearchableSelect: React.FC<SearchableSelectProps> = ({
//   value,
//   onChange,
//   options,
//   placeholder = "Select an option",
//   labelKey = "label",
//   valueKey = "value",
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showOptions, setShowOptions] = useState(false);

//   // useEffect(() => {
//   //   const selected = options.find(opt => opt[valueKey] === value);
//   //   if (selected) {
//   //     setSearchTerm(selected[labelKey]);
//   //   }
//   // }, [value, options, labelKey, valueKey]);

//   useEffect(() => {
//     const selected = options.find((opt) => opt[valueKey] === value);
//     if (selected) {
//       setSearchTerm(selected[labelKey] as string);
//     }
//   }, [value, options, labelKey, valueKey]);

//   // const filteredOptions = options.filter(item =>
//   //   item[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
//   // );

  
  

//   const filteredOptions = options.filter((item) => {
//     const label = item[labelKey];
//     return (
//       typeof label === "string" &&
//       label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const handleSelect = (selectedValue: string | number) => {
//     onChange(selectedValue);
//     const selected = options.find((opt) => opt[valueKey] === selectedValue);
//     // setSearchTerm(selected?.[labelKey] || '');
//     setSearchTerm(
//       typeof selected?.[labelKey] === "string"
//         ? (selected[labelKey] as string)
//         : String(selected?.[labelKey] ?? "")
//     );
//     setShowOptions(false);
//   };

//   return (
//     <div className="relative w-full">
//       <input
//         type="text"
//         className="border p-2 rounded w-full"
//         placeholder={placeholder}
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setShowOptions(true);
//         }}
//         onFocus={() => setShowOptions(true)}
//         onBlur={() => setTimeout(() => setShowOptions(false), 100)}
//       />
//       {showOptions && (
//         <ul className="absolute z-10 bg-white border rounded w-full max-h-60 overflow-y-auto">
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((item, index) => (
//               <li
//                 key={index}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                 onMouseDown={() => handleSelect(item[valueKey])}
//               >
//                 {item[labelKey]}
//               </li>
//             ))
//           ) : (
//             <li className="p-2 text-gray-500">No matches found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };
// export default SearchableSelect;
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SelectOption {
  [key: string]: string | number;
}

interface SearchableSelectProps {
  value: string | number | null;
  onChange: (value: string | number) => void;
  // onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  labelKey?: string;
  valueKey?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  labelKey = "label",
  valueKey = "value",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [dropdownStyle, setDropdownStyle] =
    useState<React.CSSProperties>({});

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Sync selected value → input text
  useEffect(() => {
    const selected = options.find((opt) => opt[valueKey] === value);
    if (selected && typeof selected[labelKey] === "string") {
      setSearchTerm(selected[labelKey] as string);
    }
  }, [value, options, labelKey, valueKey]);

  const filteredOptions = options.filter((item) => {
    const label = item[labelKey];
    return (
      typeof label === "string" &&
      label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const openDropdown = () => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    setDropdownStyle({
      position: "fixed",
      top: spaceBelow < 250 ? rect.top - 240 : rect.bottom,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      maxHeight: "240px",
      overflowY: "auto",
    });

    setShowOptions(true);
  };

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    const selected = options.find((opt) => opt[valueKey] === selectedValue);
    setSearchTerm(
      typeof selected?.[labelKey] === "string"
        ? (selected[labelKey] as string)
        : ""
    );
    setShowOptions(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !inputRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full">
        <input
          ref={inputRef}
          type="text"
          className="border p-2 rounded w-full"
          placeholder={placeholder}
          value={searchTerm}
          onFocus={openDropdown}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            openDropdown();
          }}
        />
      </div>

      {showOptions &&
        createPortal(
          <ul
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-white border rounded shadow-lg overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                  onMouseDown={() => handleSelect(item[valueKey])}
                >
                  {item[labelKey]}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 text-sm">
                No matches found
              </li>
            )}
          </ul>,
          document.body
        )}
    </>
  );
};

export default SearchableSelect;
