import { useState } from "react";
import Select, { components, MultiValue, OptionProps } from "react-select";

type Option = { value: string; label: string };

const options: Option[] = [
  { value: "Gazebo", label: "Gazebo" },
  { value: "Uptown", label: "Uptown" },
  { value: "Downtown", label: "Downtown" },
];

const CustomOption = (props: OptionProps<Option>) => {
  const { isSelected, label } = props;
  return (
    <components.Option {...props}>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => null}
          className="mr-2"
        />
        {label}
      </label>
    </components.Option>
  );
};

const Filter = () => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const [showSelect, setShowSelect] = useState(false);

  const handleSelectChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected);
  };

  const toggleSelect = () => {
    setShowSelect((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center">
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
        <div className="absolute top-14 right-0 w-80 bg-white shadow-lg border rounded z-10">
          <Select
            options={options}
            isMulti
            components={{ Option: CustomOption }}
            value={selectedOptions}
            onChange={handleSelectChange}
            placeholder="Filter by location..."
            className="text-gray-800"
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
