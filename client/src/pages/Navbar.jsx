import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { NavbarMenu } from "../config/data";
import SearchBar from "./components/SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 w-full">
        {/* Logo and Menu Button */}
        <div className="flex items-center space-x-2">
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <MdOutlineMenu className="text-2xl" />
          </button>
          <Link to="/" className="flex items-center">
            <span className="font-bold text-blue-400 text-xl">CrowdCure</span>
          </Link>
        </div>

        {/* Search Bar */}
       <SearchBar/>

        {/* Desktop Navbar Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {/* Increased space-x-8 */}
          <ul className="flex space-x-8">
            {/* Increased space-x-8 */}
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="font-semibold text-gray-700 hover:text-blue-500"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Login Dropdown */}
        <div className="flex items-center space-x-4 font-semibold text-gray-700">
          {/* Login Dropdown for small and medium screens */}
          <button className="inline-flex items-center text-gray-700 hover:text-blue-500 hover:ring-2 hover:ring-blue-300 p-2 rounded-md  md:hidden">
            Login
            <FaChevronDown className="ml-2 text-sm" />
          </button>

          {/* Login Dropdown for larger screens */}
          <button className="inline-flex items-center text-gray-700 hover:text-blue-500 hover:ring-2 hover:ring-blue-300 p-2 rounded-md hidden md:flex">
            Login
            <FaChevronDown className="ml-2 text-sm" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="space-y-4 p-4">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="font-semibold text-gray-700 hover:text-blue-500"
                  onClick={toggleMenu} // Close menu on item click
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <button className="w-full text-gray-700 hover:text-blue-500 py-2">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
