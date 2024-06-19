import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'), // Initialize with token from localStorage
    user: JSON.parse(localStorage.getItem('user')), // Initialize with user from localStorage
    isAuthenticated: localStorage.getItem('token') ? true : false // Check if token exists
  });

  useEffect(() => {
    // Update user in localStorage when auth.user changes
    localStorage.setItem('user', JSON.stringify(auth.user));
  }, [auth.user]);

  const login = (token, user) => {
    localStorage.setItem('token', token); // Save token to localStorage
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
    setAuth({
      token,
      user,
      isAuthenticated: true
    });
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user'); // Remove user from localStorage
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
