import { useState } from "react";
import Select, { components, OptionProps, SingleValue } from "react-select";

type ReportType = 'Lost' | 'Found';

type FormError = {
  title?: string,
  description?: string,
  image?: string,
  location?: string,
  reportType?: ReportType,
  date?: string,
  phoneNumber?: string,
  email?: string,
}

type Option = {
  value: string,
  label: string,
};

const options: Option[] = [
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
  const { isSelected, label } = props;
  return (
    <components.Option {...props}>
      <label className="flex items-center">
        {label}
      </label>
    </components.Option>
  );
};

const ReportForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [reportType, setReportType] = useState('');
  const [date, setDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormError>({});

  const handleEmailChange = () => {
    if (errors.email) {
      setErrors((prevErrors) => ({ prevErrors, email: undefined }))
    }
  }

  const handleSelectChange = (selected: SingleValue<Option>) => {
    setSelectedOption(selected);
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    let valid = true
    const newError: FormError = {}

    if (!email) {
      valid = false
      newError.email = "Enter your email"
    } else if (!email.endsWith('@gmail.com')) {
      valid = false
      newError.email = "Invalid email!"
    }

    if (!valid) {
      setErrors(newError)
    } else {

    }
  }

  return (
    <form onSubmit={handleReportSubmit} action="" className="flex flex-col gap-5 relative">
      <div className="relative w-full my-4 flex flex-col gap-4 ">
        <p className="text-lg font-semibold">Report Title <span className="text-[#F24822]">*</span></p>
        <div>
          <label
            className={`absolute left-0 px-3 py-2 text-base transition-all duration-300 ease-in-out ${isFocused ? "transform -translate-y-1/2 scale-90 ml-5 bg-white" : "ml-2 text-gray-500"}`}
          >
            Enter title of report
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full px-3 py-2 text-base outline-none border border-gray-300 rounded-md focus:border-blue-300"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {errors.email && <span className="font-normal text-xs mt-1 text-[#FF0000]">{errors.email}</span>}
        </div>
      </div>

      <div className="relative w-full my-4 flex flex-col gap-4 ">
        <p className="text-lg font-semibold">Description <span className="text-[#F24822]">*</span></p>
        <div>
          <label
            htmlFor="decription"
            className={`absolute left-0 px-3 py-2 text-base transition-all duration-300 ease-in-out ${isFocused ? "transform -translate-y-1/2 scale-90 ml-5 bg-white" : "ml-2 text-gray-500"}`}
          >
            Enter report description
          </label>
          <input
            id="description"
            type="text"
            required
            autoComplete="off"
            className="w-full px-3 py-2 text-base outline-none border border-gray-300 rounded-md focus:border-blue-300"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {errors.email && <span className="font-normal text-xs mt-1 text-[#FF0000]">{errors.email}</span>}
        </div>
      </div>

      <div className="relative w-full my-4 flex flex-col gap-4 ">
        <p className="text-lg font-semibold">Image of Item <span className="text-[#F24822]">*</span></p>
        <div>
          <div className="flex items-center justify-center w-fit h-fit">
            <label
              htmlFor="file"
              className="cursor-pointer bg-gray-100 p-[30px] px-[70px] rounded-2xl border border-gray-300"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <svg viewBox="0 0 640 512" className="h-[50px] fill-gray-600 mb-5">
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                </svg>
                <p>No image chosen</p>
                <span className="bg-gray-600 text-white py-[5px] px-[15px] rounded-[10px] transition-all duration-300 hover:bg-gray-900">
                  Select an image
                </span>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <span className="font-normal text-xs mt-1 text-gray-700">Maximum file size: 5 MB</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label
          htmlFor="location"
          className="text-lg font-semibold"
        >
          Location <span className="text-[#F24822]">*</span>
        </label>
        <Select
          id="location"
          options={options}
          components={{ Option: CustomOption }}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder="Filter by location..."
          className="border-gray-300"
          isMulti={false}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label
          htmlFor="location"
          className="text-lg font-semibold"
        >
          Report Type <span className="text-[#F24822]">*</span>
        </label>
        <div className="flex items-center gap-6">
          <div className="relative inline-block cursor-pointer">
            <input
              type="radio"
              name="radio-group"
              id="radio1"
              className="absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor="radio1"
              className="relative inline-block pl-[30px] mb-[10px] text-[16px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <span className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[20px] h-[20px] rounded-full border-2 border-gray-600 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"></span>
              Lost
            </label>
          </div>
          <div className="relative inline-block cursor-pointer">
            <input
              type="radio"
              name="radio-group"
              id="radio2"
              className="absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor="radio2"
              className="relative inline-block pl-[30px] mb-[10px] text-[16px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <span className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[20px] h-[20px] rounded-full border-2 border-gray-600 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"></span>
              Found
            </label>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <label
          htmlFor="date"
          className="text-lg font-semibold"
        >
          Date <span className="text-[#F24822]">*</span>
        </label>
        <input
          type="date"
          placeholder="Enter birth date"
          className="px-3 py-2 outline-none border border-gray-300 rounded-md focus:border-blue-300"
          required
        />
      </div>


      <div className="w-full flex flex-col gap-4">
        <label
          htmlFor="number"
          className="text-lg font-semibold"
        >
          Phone Number <span className="text-[#F24822]">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
            <p>+234 </p>
          </div>
          <input
            id="number"
            type="number"
            max={10}
            placeholder=""
            className="w-full pl-[4.5rem] pr-3 py-2 appearance-none outline-none border focus:border-blue-300 rounded-lg"
          />
        </div>
      </div>

      <div className="relative w-full my-4 flex flex-col gap-4 ">
        <p className="text-lg font-semibold">Email <span className="text-[#F24822]">*</span></p>
        <div>
          <label
            htmlFor="email"
            className={`absolute left-0 px-3 py-2 text-base transition-all duration-300 ease-in-out ${isFocused ? "transform -translate-y-1/2 scale-90 ml-5 bg-white" : "ml-2 text-gray-500"}`}
          >
            Enter email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full px-3 py-2 text-base outline-none border border-gray-300 rounded-md focus:border-blue-300"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="font-normal text-xs mt-1 text-[#FF0000]">{errors.email}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-400 py-2 rounded-md text-lg font-semibold text-white"
      >
        Submit
      </button>

    </form>
  )
}

export default ReportForm;