import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Update state based on token presence
    setIsAuthLoaded(true); // Mark that auth state has been determined
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token to localStorage
    setIsLoggedIn(true); // Update state immediately
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setIsLoggedIn(false); // Update state immediately
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
