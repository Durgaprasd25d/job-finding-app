import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Assuming this is the correct path to AuthProvider

const AdminHeader = () => {
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Optionally: Redirect or perform any other necessary actions after logout
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="text-2xl font-bold text-gray-800">
        <Link to="/admin" className="text-gray-800 hover:text-gray-900">
          Home
        </Link>
      </div>
      {auth.isAuthenticated ? (
        <>
          <div className="text-2xl font-bold text-gray-800">
            <Link
              to="/admin/create-jobs"
              className="text-gray-800 hover:text-gray-900"
            >
              Create Job
            </Link>
          </div>
          
         
          <div className="text-2xl font-bold text-gray-800">
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold text-gray-800">
          <Link
            to="/login"
            className="text-gray-800 hover:text-gray-900"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
