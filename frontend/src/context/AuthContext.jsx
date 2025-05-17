import React, { createContext, useContext, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const handleAuthResponse = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("userRole", response.role.toLowerCase());
    setToken(response.token);
    setUserRole(response.role.toLowerCase());
  };

  const login = async (data) => {
    const response = await apiLogin(data);
    handleAuthResponse(response);
  };

  const register = async (data) => {
    const response = await apiRegister(data);
    handleAuthResponse(response);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
