import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [creatingNewMarker, setCreatingNewMarker] = useState(false);
  const [newMarker, setNewMarker] = useState(null);

  return (
    <AppContext.Provider value={{ creatingNewMarker, setCreatingNewMarker, newMarker, setNewMarker }}>
      {children}
    </AppContext.Provider>
  );
};
