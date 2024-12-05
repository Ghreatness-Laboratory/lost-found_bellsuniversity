import React from "react";
import { ReportProps } from "../../types/report";

interface ReportPreviewProps extends Partial<ReportProps> {
  description: string,
  onReportSubmit: () => void,
  onCancel: () => void,
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ image, name, date, description, location, onCancel, onReportSubmit }) => {
  return (
    <div className='xl:absolute xl:right-0 xl:top-20 lg:w-96 w-full'>
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt="Lost and Found Item"
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold">
            Preview
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {name}
            </h3>
            <p>Location: {location}</p>
            <div className='flex items-center justify-center gap-2 text-gray-600 mb-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 27 27" fill="none">
                <path d="M21.375 6.75H5.625C4.38236 6.75 3.375 7.75736 3.375 9V21.375C3.375 22.6176 4.38236 23.625 5.625 23.625H21.375C22.6176 23.625 23.625 22.6176 23.625 21.375V9C23.625 7.75736 22.6176 6.75 21.375 6.75Z" stroke="#1E1E1E" strokeWidth="2.66667" />
                <path d="M3.375 11.25C3.375 9.12825 3.375 8.0685 4.03425 7.40925C4.6935 6.75 5.75325 6.75 7.875 6.75H19.125C21.2467 6.75 22.3065 6.75 22.9657 7.40925C23.625 8.0685 23.625 9.12825 23.625 11.25H3.375Z" fill="#1E1E1E" />
                <path d="M7.875 3.375V6.75M19.125 3.375V6.75" stroke="#1E1E1E" strokeWidth="2.66667" strokeLinecap="round" />
                <path d="M11.8125 13.5H8.4375C8.12684 13.5 7.875 13.7518 7.875 14.0625V15.1875C7.875 15.4982 8.12684 15.75 8.4375 15.75H11.8125C12.1232 15.75 12.375 15.4982 12.375 15.1875V14.0625C12.375 13.7518 12.1232 13.5 11.8125 13.5Z" fill="#1E1E1E" />
                <path d="M11.8125 18H8.4375C8.12684 18 7.875 18.2518 7.875 18.5625V19.6875C7.875 19.9982 8.12684 20.25 8.4375 20.25H11.8125C12.1232 20.25 12.375 19.9982 12.375 19.6875V18.5625C12.375 18.2518 12.1232 18 11.8125 18Z" fill="#1E1E1E" />
                <path d="M18.5625 13.5H15.1875C14.8768 13.5 14.625 13.7518 14.625 14.0625V15.1875C14.625 15.4982 14.8768 15.75 15.1875 15.75H18.5625C18.8732 15.75 19.125 15.4982 19.125 15.1875V14.0625C19.125 13.7518 18.8732 13.5 18.5625 13.5Z" fill="#1E1E1E" />
                <path d="M18.5625 18H15.1875C14.8768 18 14.625 18.2518 14.625 18.5625V19.6875C14.625 19.9982 14.8768 20.25 15.1875 20.25H18.5625C18.8732 20.25 19.125 19.9982 19.125 19.6875V18.5625C19.125 18.2518 18.8732 18 18.5625 18Z" fill="#1E1E1E" />
              </svg>
              <p className='text-sm'>{date?.day}/{date?.month}/{date?.year}</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <button
            onClick={onReportSubmit}
            className="bg-blue-400 text-white px-4 py-2 rounded-md active:bg-blue-500 md:hover:bg-blue-500 transition-colors w-full">
            Report Item
          </button>
          <button
            onClick={onCancel}
            className="bg-blue-400 text-white px-4 py-2 rounded-md active:bg-blue-500 md:hover:bg-blue-500 transition-colors w-full">
            Cancel Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportPreview;