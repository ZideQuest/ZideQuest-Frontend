import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [creatingNewMarker, setCreatingNewMarker] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        creatingNewMarker,
        setCreatingNewMarker,
        newMarker,
        setNewMarker,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
