import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "lucide-react";

export const SelectElement = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === value) || {
      label: "Select an option",
      icon: null,
    }
  );
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative min-w-60 w-max border border-gray-200 hover:border-gray-600 rounded-md flex flex-col gap-1"
    >
      <div
        className="select flex items-center justify-between cursor-pointer px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedOption.icon}
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDownIcon />
      </div>

      {isOpen && (
        <ul className="absolute top-[120%] left-0 w-full flex flex-col border border-t-2 bg-white z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="list-none cursor-pointer px-2 py-1 flex gap-1 hover:bg-gray-200"
              onClick={() => handleSelect(option)}
            >
              {option.icon} <div className="flex-1">{option.label}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
