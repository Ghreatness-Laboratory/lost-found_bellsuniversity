import { useState } from "react";
import Navbar from "./navbar";

const ToggleNavbar = () => {
  const pathname = window.location.pathname;
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const hideNavbar = pathname === "/login" || pathname === "/register";

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div>
      {!hideNavbar && <Navbar
        isNavbarOpen={isNavbarOpen}
        handleNavClick={toggleNavbar}
      />}
      {isNavbarOpen && (
        <div
          className={`${isNavbarOpen ? "" : "hidden"} fixed h-[100vh] inset-0 bg-black opacity-50 z-10 transition-opacity duration-300 ease-in-out lg:hidden`}
        ></div>
      )}
    </div>
  )
}

export default ToggleNavbar;