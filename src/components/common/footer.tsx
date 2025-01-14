import React from "react";
import { Link, useLocation } from "react-router-dom";
import defaultLogo from "../../assets/images/misplaceme logo icon main@4x.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const hideFooterPaths = ["/login", "/register"];
  if (hideFooterPaths.includes(location.pathname)) return null;

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div className="flex items-center md:space-x-3">
              <div className="w-12 h-12 transition-transform hover:scale-105 max-sm:-ml-4">
                <img
                  src={defaultLogo}
                  alt="misplaceme logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <p role="heading" className="font-semibold text-lg text-gray-800">MisplaceMe</p>
            </div>

            <div className="flex max-md:flex-col md:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-8">
              <Link
                to="#terms"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
              >
                Terms & Conditions
              </Link>
              <Link
                to="#privacy"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="py-4">
            <p className="md:text-center text-sm text-gray-500">
              © {currentYear} MisplaceMe. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
