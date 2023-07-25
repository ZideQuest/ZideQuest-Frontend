import React, { createContext, useState, useContext, useEffect } from "react";

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
    setCurrentPage("recommend");
  };

  const selectExistedPin = (pinId) => {
    cancelPinCreating();
    setCurrentPage("markerDetail")
    setCurrentMarkerSelecting(pinId);
  }

  const backToRecommend = () => {
    setCreatingNewMarker(false)
    setNewMarker(null)
    setCurrentMarkerSelecting(null)
    setCurrentPage("recomemnd")
  }

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])

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
        selectExistedPin,
        backToRecommend,
        currentMarkerSelecting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
