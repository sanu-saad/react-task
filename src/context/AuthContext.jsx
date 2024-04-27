import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  //  login
  const login = (userData) => {
    setIsAuthenticated(false);
    setUser(userData);
    // localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  //  logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  //  verify login
  const verifyLogin = (name, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.name === name &&
      storedUser.password === password
    ) {
      login(storedUser);
      localStorage.setItem("isAuthenticated", "true"); //change
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    verifyLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
