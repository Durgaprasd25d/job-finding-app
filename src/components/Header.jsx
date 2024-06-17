import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="text-2xl font-bold text-gray-800">Job Campus</div>
      <nav className="flex space-x-4">
        <Link to="/job-board" className="text-gray-600 hover:text-gray-800">
          Jobs
        </Link>
        <Link to="/applies" className="text-gray-600 hover:text-gray-800">
          Applies
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-gray-800">
          Profile
        </Link>
      </nav>
      <div className="relative">
        <input
          type="text"
          placeholder="Search job here ..."
          className="border-b border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </button>
      </div>
    </header>
  );
};

export default Header;
