import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { NavbarMenu } from "../config/data";
import SearchBar from "./components/SearchBar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-blue-400 text-xl">CrowdCure</span>
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Desktop Navbar Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {/* Increased space-x-8 */}
          <ul className="flex space-x-8">
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
          {/* Login Dropdown for larger screens */}
          <Button className="items-center text-gray-700 hover:text-blue-500 hover:ring-2 hover:ring-blue-300 p-2 rounded-md hidden md:flex">
            Login
            <FaChevronDown className="ml-2 text-sm" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
