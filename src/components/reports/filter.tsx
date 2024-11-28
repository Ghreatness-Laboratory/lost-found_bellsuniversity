import React from 'react';
import { useEffect, useRef, useState } from "react";
import Select, { components, OptionProps, SingleValue } from "react-select";

interface FilterProps {
  onFilterChange: (selectedLocation: string) => void,
}

type Option = {
  value: string,
  label: string,
};

const options: Option[] = [
  { value: "All", label: "All" },
  { value: "Uptown", label: "Uptown" },
  { value: "Classroom", label: "Classroom" },
  { value: "Downtown", label: "Downtown" },
  { value: "Best Man", label: "Best Man" },
  { value: "Coleng Gazebo", label: "Coleng Gazebo" },
  { value: "Colnas Gazebo", label: "Colnas Gazebo" },
  { value: "Colmans Gazebo", label: "Colmans Gazebo" },
  { value: "Football field/Pavilion", label: "Football field/Pavilion" },
  { value: "Ekorupa & Sons", label: "Ekorupa & Sons" },
  { value: "Exceeding Grace Cafeteria", label: "Exceeding Grace Cafeteria" },
  { value: "Library", label: "Library" },
  { value: "Marque", label: "Marque" },
];

const CustomOption = (props: OptionProps<Option>) => {
  const { label } = props;
  return (
    <components.Option {...props}>
      <label className="flex items-center">
        {label}
      </label>
    </components.Option>
  );
};

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);
  const [showSelect, setShowSelect] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectChange = (
    selected: SingleValue<Option>,
  ) => {
    setSelectedOption(selected);
    if (selected) {
      onFilterChange(selected.value);
    }
  };

  // const handleSelectChange = (
  //   selected: SingleValue<Option>,
  //   actionMeta: ActionMeta<Option>
  // ) => {
  //   setSelectedOption(selected);
  //   if (selected) {
  //     if (selected.value === "All") {
  //       onFilterChange(""); 
  //     } else {
  //       onFilterChange(selected.value); 
  //     }
  //   }
  // };

  const toggleSelect = () => {
    setShowSelect((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowSelect(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center" ref={dropdownRef}>
      <button
        title="filter"
        onClick={toggleSelect}
        className="w-14 h-full rounded-xl flex items-center justify-center border border-gray-400 transition-all bg-[#222630]"
      >
        <svg viewBox="0 0 512 512" className="h-4 fill-white transition-all">
          <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3-28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
        </svg>
      </button>

      {showSelect && (
        <div className="absolute top-14 right-0 w-[300px] sm:w-[360px] bg-white shadow-lg border rounded z-10">
          <Select
            options={options}
            components={{ Option: CustomOption }}
            value={selectedOption}
            onChange={handleSelectChange}
            placeholder="Filter by location..."
            className="text-gray-800"
            isMulti={false}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;