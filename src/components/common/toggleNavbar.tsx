import React, { useState } from 'react';
import Navbar from './navbar';

const ToggleNavbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavClick = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div data-testid="toggle-navbar">
      <Navbar 
        isNavbarOpen={isNavbarOpen} 
        handleNavClick={handleNavClick} 
      />
      
      {isNavbarOpen && (
        <div 
          data-testid="overlay" 
          className="fixed h-[100vh] inset-0 bg-black opacity-50 z-10 transition-opacity duration-300 ease-in-out lg:hidden"
          aria-label="Close navigation menu"
          onClick={handleNavClick}
        />
      )}
    </div>
  );
};

export default ToggleNavbar;