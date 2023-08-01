import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [creatingNewMarker, setCreatingNewMarker] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetail, setUserDetails] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWI";
    const user = "Akshay";
    await SecureStore.setItemAsync("token", token);
    setUserDetails({ user });
    setUserToken(token);
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setCreatingNewMarker(false);
    setNewMarker(null);
    setIsProfileOpen(false);
    await SecureStore.deleteItemAsync("token");

    setIsLoggedIn(false);
    setUserDetails({});
    setUserToken(null);
    setIsLoggedIn(false);

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          setUserToken(token);
          setIsLoggedIn(true);
        } else {
          setUserToken(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error fetching token:", error);
      }
    };
    fetchToken();
    return () => {};
  }, []);

  return (
    <AppContext.Provider
      value={{
        creatingNewMarker,
        setCreatingNewMarker,
        newMarker,
        setNewMarker,
        isLoggedIn,
        setIsLoggedIn,
        isProfileOpen,
        setIsProfileOpen,
        login,
        logout,
        isLoading,
        userToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
