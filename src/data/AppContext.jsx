import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [creatingNewMarker, setCreatingNewMarker] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("recommend");
  const [currentMarkerSelecting, setCurrentMarkerSelecting] = useState(null);

  const cancelPinCreating = () => {
    setNewMarker(null);
    setCreatingNewMarker(false);
  };

  const selectExistedPin = (pinId) => {
    cancelPinCreating();
    setCurrentMarkerSelecting(pinId);
    setCurrentPage("markerDetail")
  }

  return (
    <AppContext.Provider
      value={{
        creatingNewMarker,
        setCreatingNewMarker,
        newMarker,
        setNewMarker,
        isLoggedIn,
        setIsLoggedIn,
        cancelPinCreating,
        currentPage,
        setCurrentPage,
        selectExistedPin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
