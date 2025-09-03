// src/contexts/ElectionContext.jsx
import React, { createContext, useContext, useState } from "react";

const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
  const [selectedElection, setSelectedElection] = useState(null);

  return (
    <ElectionContext.Provider value={{ selectedElection, setSelectedElection }}>
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = () => useContext(ElectionContext);
