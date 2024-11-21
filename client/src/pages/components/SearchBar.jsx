import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="flex flex-1 max-w-xl mx-8">
      <div className="relative w-full">
        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    </div>
  );
};

export default SearchBar;
