import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'), // Initialize with token from localStorage
    user: null,
    isAuthenticated: localStorage.getItem('token') ? true : false // Check if token exists
  });

  const login = (token, user) => {
    localStorage.setItem('token', token); // Save token to localStorage
    setAuth({
      token,
      user,
      isAuthenticated: true
    });
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setAuth({
      token: null,
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth, AuthContext };
