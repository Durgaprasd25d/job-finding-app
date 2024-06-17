import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
const Dashboard = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 animate-gradient-x"></div>

      <div className="relative z-10 max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-6 animate-fade-in">
          Welcome to Job Market Place
        </h3>
        <p className="text-gray-600 text-center mb-10 animate-fade-in delay-200">
          Discover your dream job or the perfect candidate for your company. Join us to explore numerous opportunities in the job market.
        </p>

        <div className="flex justify-center space-x-6 mb-10 animate-fade-in delay-300">
          <Link
            to="/login"
            className="px-8 py-4 text-white bg-primary rounded-lg shadow-md hover:bg-primary-dark transition duration-150 ease-in-out"
          >
            Login
          </Link>
         
        </div>

        <div className="text-center animate-fade-in delay-400">
          <p className="text-gray-500">
            New here? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link> and get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
