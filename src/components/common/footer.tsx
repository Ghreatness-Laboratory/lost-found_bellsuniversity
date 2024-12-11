import React from "react";
import defaultLogo from "../../assets/images/misplaceme logo icon main@4x.png";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col md:flex-row-reverse gap-2 md:gap-10 items-center justify-center border-t-[2px] py-2 md:py-4 bg-white">
      <div className="flex justify-center gap-4 lg:gap-10 text-base md:text-lg font-normal">
        <p className="cursor-pointer active:text-blue-700 underline">
          Terms & Conditions
        </p>
        <p className="cursor-pointer active:text-blue-700 underline">
          Privacy policy
        </p>
      </div>

      <div className="flex items-center">
        <div className="w-10 h-10">
          <img src={defaultLogo} alt="misplaceme logo" />
        </div>
        <p className="font-medium text-base md:text-lg">MisplaceMe</p>
      </div>
    </footer>
  );
};

export default Footer;
