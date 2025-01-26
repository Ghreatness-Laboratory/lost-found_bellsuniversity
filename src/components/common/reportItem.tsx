import React from "react";
import { ReportProps } from "../../types/report.types";

interface ReportItemProps extends Partial<ReportProps> {
  style?: string;
  imageStyle?: string;
  children?: React.ReactNode;
}

const ReportItem: React.FC<ReportItemProps> = ({
  title,
  date_reported,
  image,
  location,
  style,
  imageStyle,
  children,
}) => {
  return (
    <div data-testid="report-item" className="p-0 md:p-4 w-full rounded-lg">
      <div className={`${style}`}>
        <img
          src={image}
          alt={`Lost and Found Item at ${location}`}
          className={`object-cover w-full h-[180px] md:h-[200px] ${imageStyle}`}
        />

        {children ? (
          children
        ) : (
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <h3>{title}</h3>
            <p>{location}</p>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M21.375 6.75H5.625C4.38236 6.75 3.375 7.75736 3.375 9V21.375C3.375 22.6176 4.38236 23.625 5.625 23.625H21.375C22.6176 23.625 23.625 22.6176 23.625 21.375V9C23.625 7.75736 22.6176 6.75 21.375 6.75Z"
                  stroke="#1E1E1E"
                  strokeWidth="2.66667"
                />
                <path
                  d="M3.375 11.25C3.375 9.12825 3.375 8.0685 4.03425 7.40925C4.6935 6.75 5.75325 6.75 7.875 6.75H19.125C21.2467 6.75 22.3065 6.75 22.9657 7.40925C23.625 8.0685 23.625 9.12825 23.625 11.25H3.375Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M7.875 3.375V6.75M19.125 3.375V6.75"
                  stroke="#1E1E1E"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                />
                <path
                  d="M11.8125 13.5H8.4375C8.12684 13.5 7.875 13.7518 7.875 14.0625V15.1875C7.875 15.4982 8.12684 15.75 8.4375 15.75H11.8125C12.1232 15.75 12.375 15.4982 12.375 15.1875V14.0625C12.375 13.7518 12.1232 13.5 11.8125 13.5Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M11.8125 18H8.4375C8.12684 18 7.875 18.2518 7.875 18.5625V19.6875C7.875 19.9982 8.12684 20.25 8.4375 20.25H11.8125C12.1232 20.25 12.375 19.9982 12.375 19.6875V18.5625C12.375 18.2518 12.1232 18 11.8125 18Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M18.5625 13.5H15.1875C14.8768 13.5 14.625 13.7518 14.625 14.0625V15.1875C14.625 15.4982 14.8768 15.75 15.1875 15.75H18.5625C18.8732 15.75 19.125 15.4982 19.125 15.1875V14.0625C19.125 13.7518 18.8732 13.5 18.5625 13.5Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M18.5625 18H15.1875C14.8768 18 14.625 18.2518 14.625 18.5625V19.6875C14.625 19.9982 14.8768 20.25 15.1875 20.25H18.5625C18.8732 20.25 19.125 19.9982 19.125 19.6875V18.5625C19.125 18.2518 18.8732 18 18.5625 18Z"
                  fill="#1E1E1E"
                />
              </svg>
              <p className="text-center">{date_reported}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportItem;
