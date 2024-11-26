import React from 'react';
import { useState } from "react";
import Navbar from "./navbar";

const ToggleNavbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div>
      <Navbar
        isNavbarOpen={isNavbarOpen}
        handleNavClick={toggleNavbar}
      />
      {isNavbarOpen && (
        <div
          className={`fixed h-[100vh] inset-0 bg-black opacity-50 z-10 transition-opacity duration-300 ease-in-out lg:hidden`}
          onClick={toggleNavbar}
        />
      )}
    </div>
  )
}

export default ToggleNavbar;