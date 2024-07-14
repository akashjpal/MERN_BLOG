// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    userId: null,
  });

  const login = () => setState({ ...state, isAuthenticated: true });
    const logout = () => setState({ ...state, isAuthenticated: false, userId: null });
    const setUid = (uid) => setState({ ...state, userId: uid });

  return (
    <AuthContext.Provider value={{ state, login, logout,setUid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
