import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RequireRole = ({ role }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (auth.user?.role !== role) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default RequireRole;
