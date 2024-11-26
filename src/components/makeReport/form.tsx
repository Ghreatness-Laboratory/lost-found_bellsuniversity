import React, { ChangeEvent, FormEvent, useState } from "react";
import Select, { components, OptionProps, SingleValue } from "react-select";

interface FormProps {
  displayReportForm: boolean,
  setDisplayReportForm: React.Dispatch<React.SetStateAction<boolean>>,
}

type FormError = {
  title?: string,
  description?: string,
  image?: string,
  location?: string,
  reportType?: string,
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
  const { label } = props;
  return (
    <components.Option {...props}>
      <label className="flex items-center">
        {label}
      </label>
    </components.Option>
  );
};

const ReportForm = ({ setDisplayReportForm }: FormProps) => {
  const [, setIsFocusedTitle] = useState(false);
  const [, setIsFocusedDescription] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [reportType, setReportType] = useState<string>('');
  const [date, setDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormError>({});

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'File size exceeds 5MB' }));
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: undefined }));
    }
  };

  const handleSelectChange = (selected: SingleValue<Option>) => {
    setSelectedOption(selected);
    setLocation(selected?.value || '');
    setErrors(prev => ({ ...prev, location: undefined }));
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setPhoneNumber(value);
      setErrors(prev => ({ ...prev, phoneNumber: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!image) {
      newErrors.image = "Image is required";
    }

    if (!location) {
      newErrors.location = "Location is required";
    }

    if (!reportType) {
      newErrors.reportType = "Report type is required";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    // if (!phoneNumber) {
    //   newErrors.phoneNumber = "Phone number is required";
    // } else if (phoneNumber.length !== 10) {
    //   newErrors.phoneNumber = "Phone number must be 10 digits";
    // }

    // if (!email) {
    //   newErrors.email = "Email is required";
    // } else if (!email.endsWith('@gmail.com')) {
    //   newErrors.email = "Input valid email address";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReportSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setDisplayReportForm(false)
    }
  };

  return (
    <form onSubmit={handleReportSubmit} className="flex flex-col gap-4 md:gap-0 relative md:pl-4 w-full mx-auto">
      <div className="relative w-full my-2 md:my-4 flex flex-col gap-2 md:gap-4">
        <label
          htmlFor="title"
          className="text-base md:text-lg font-semibold"
        >
          Report Title <span className="text-[#F24822]">*</span>
        </label>
        <div>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Enter title of report"
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: undefined }));
            }}
            autoComplete="off"
            className="w-full px-3 py-2 text-sm md:text-base outline-none border border-gray-300 rounded-md focus:border-blue-300"
            onFocus={() => setIsFocusedTitle(true)}
            onBlur={() => setIsFocusedTitle(false)}
          />
          {errors.title && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.title}</span>}
        </div>
      </div>

      <div className="relative w-full my-2 md:my-4 flex flex-col gap-2 md:gap-4">
        <label
          htmlFor="desccription"
          className="text-base md:text-lg font-semibold"
        >
          Description <span className="text-[#F24822]">*</span>
        </label>
        <div>
          <input
            id="description"
            type="text"
            value={description}
            placeholder="Enter item description"
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors(prev => ({ ...prev, description: undefined }));
            }}
            autoComplete="off"
            className="w-full px-3 py-2 text-sm md:text-base outline-none border border-gray-300 rounded-md focus:border-blue-300"
            onFocus={() => setIsFocusedDescription(true)}
            onBlur={() => setIsFocusedDescription(false)}
          />
          {errors.description && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.description}</span>}
        </div>
      </div>

      <div className="relative w-full my-2 md:my-4 flex flex-col gap-2 md:gap-4">
        <p className="text-base md:text-lg font-semibold">Image of Item <span className="text-[#F24822]">*</span></p>
        <div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file"
              className={`cursor-pointer w-full border-2 ${imagePreview ? 'border-solid' : 'border-dashed'} border-gray-300 rounded-lg p-2 md:p-4 text-center`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 mx-auto object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-2 h-40">
                  <svg viewBox="0 0 640 512" className="h-12 fill-gray-600 mb-2">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                  <p>Click to select image</p>
                </div>
              )}
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <span className="text-xs text-gray-500 mt-1">Maximum file size: 5 MB</span>
          {errors.image && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.image}</span>}
        </div>
      </div>

      <div className="relative flex flex-col gap-2 md:gap-4 my-2 md:my-4">
        <label
          htmlFor="location"
          className="text-base md:text-lg font-semibold">
          Location <span className="text-[#F24822]">*</span>
        </label>
        <div>
          <Select
            id="location"
            options={options}
            components={{ Option: CustomOption }}
            value={selectedOption}
            onChange={handleSelectChange}
            placeholder="Filter by location..."
            className="border-gray-300 text-sm md:text-base"
            isMulti={false}
          />
          {errors.location && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.location}</span>}
        </div>
      </div>

      <div className="relative flex flex-col gap-2 md:gap-4 my-2 md:my-4">
        <label
          className="text-base md:text-lg font-semibold">
          Report Type <span className="text-[#F24822]">*</span>
        </label>
        <div>
          <div className="flex items-center gap-6">
            {(['Lost', 'Found'] as const).map((type) => (
              <div key={type} className="relative inline-block cursor-pointer">
                <input
                  id={`radio-${type}`}
                  type="radio"
                  name="reportType"
                  value={type}
                  checked={reportType === type}
                  onChange={() => {
                    setReportType(type);
                    setErrors(prev => ({ ...prev, reportType: undefined }));
                  }}
                  className="absolute opacity-0 w-0 h-0"
                />
                <label
                  htmlFor={`radio-${type}`}
                  className="relative inline-block pl-[30px] mb-[10px] text-[16px]"
                >
                  <span
                    className={`absolute top-1/2 left-0 transform -translate-y-1/2 
                    w-[20px] h-[20px] rounded-full border-2 
                    ${reportType === type
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-600'
                      } transition-all duration-300`}
                  ></span>
                  {type}
                </label>
              </div>
            ))}
          </div>
          {errors.reportType && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.reportType}</span>}
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-2 md:gap-4 my-2 md:my-4">
        <label
          htmlFor="date"
          className="text-base md:text-lg font-semibold">
          Date <span className="text-[#F24822]">*</span>
        </label>
        <div>
          <input
            id="date"
            type="date"
            value={date}
            placeholder="Enter date"
            onChange={(e) => {
              setDate(e.target.value);
              setErrors(prev => ({ ...prev, date: undefined }));
            }}
            className="w-full px-3 py-2 text-sm md:text-base outline-none border border-gray-300 rounded-md focus:border-blue-300"
          />
          {errors.date && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.date}</span>}
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-2 md:gap-4 my-2 md:my-4">
        <label
          htmlFor="phone-number"
          className="text-base md:text-lg font-semibold">
          Phone Number
        </label>
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
              <p className="text-sm md:text-base">+234 </p>
            </div>
            <input
              id="phone-number"
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter 10-digit phone number"
              className="w-full pl-[4.5rem] pr-3 py-2 text-sm md:text-base appearance-none outline-none border focus:border-blue-300 rounded-lg"
            />
          </div>
          {errors.phoneNumber && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.phoneNumber}</span>}
        </div>
      </div>

      <div className="relative w-full my-4 flex flex-col gap-2 md:gap-4 my-2 md:my-4">
        <label
          htmlFor="email"
          className="text-base md:text-lg font-semibold">
          Email
        </label>
        <div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: undefined }));
            }}
            autoComplete="email"
            className="w-full px-3 py-2 text-sm md:text-base outline-none border border-gray-300 rounded-md focus:border-blue-300"
            placeholder="Enter email address"
          />
          {errors.email && <span className="absolute left-0 -bottom-5 text-red-500 text-xs mt-1">{errors.email}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 active:bg-blue-600 md:hover:bg-blue-600 py-2 mt-4 rounded-md text-base md:text-lg font-semibold text-white transition-colors duration-300"
      >
        Submit Report
      </button>
    </form>
  )
}

export default ReportForm;