import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Adjust the import path as necessary
import SearchBar from "../components/SearchBar"; // Adjust the import path as necessary

const Header = ({ onSearch, searchQuery }) => {
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Optionally: Redirect or perform any other necessary actions after logout
  };

  const handleSearch = (query) => {
    onSearch(query); // Pass search query to parent component (JobDashboard)
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="text-2xl font-bold text-gray-800">Job Campus</div>
      <nav className="flex space-x-4">
        <Link to="/job-board" className="text-gray-600 hover:text-gray-800">
          Jobs
        </Link>
     
        {auth.isAuthenticated ? (
          <>
            <Link to="/profile" className="text-gray-600 hover:text-gray-800">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-gray-800">
            Login
          </Link>
        )}
      </nav>
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
    </header>
  );
};

export default Header;
