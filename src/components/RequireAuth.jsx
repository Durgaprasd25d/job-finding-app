import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth from AuthContext

const RequireAuth = () => {
  const { auth } = useAuth(); // Ensure useAuth is called correctly
  const location = useLocation();

  return auth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
