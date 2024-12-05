import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <svg className="w-16 h-16 animate-spin" viewBox="25 25 50 50">
        <circle
          className="fill-none stroke-blue-500 stroke-[2] stroke-dasharray-[1_200] stroke-dashoffset-0 stroke-linecap-round"
          cx="50"
          cy="50"
          r="20"
          style={{
            animation: "dash 1.5s ease-in-out infinite",
          }}
        />
      </svg>
      <style>
        {`
          @keyframes dash {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 200;
              stroke-dashoffset: -35px;
            }
            100% {
              stroke-dashoffset: -125px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
