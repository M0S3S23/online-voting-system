import React, { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user object from server

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for convenience
export const useUser = () => useContext(UserContext);
