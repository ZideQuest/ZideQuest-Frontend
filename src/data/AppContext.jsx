import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { sendLoginData, fetchUserData } from "./authen";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [newMarker, setNewMarker] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetail, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bottomModalRef, setBottomModalRef] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapMoveTo, setMapMoveTo] = useState(null);
  const [soonQuest, setSoonQuest] = useState(null);
  const [mapRefetch, setMapRefetch] = useState(null);
  const [mapSearchedLocation, setMapSearchedLocation] = useState(null);
  const [focusedPin, setFocusedPin] = useState(null);
  const [snapBack, setSnapBack] = useState(null);
  const [getNavigator, setGetNavigator] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);

    const response = await sendLoginData(username, password);

    if (!response.user) {
      setUserDetails({});
      setIsLoading(false);
      return response;
    }

    const user = {
      token: response.token,
      user: response.user,
      isAdmin: response.user.role,
    };
    await SecureStore.setItemAsync("userDetail", JSON.stringify(user));
    setUserDetails(user);
    setIsLoading(false);
    return user;
  };

  const logout = async () => {
    setIsLoading(true);
    setNewMarker(null);
    setIsProfileOpen(false);

    await SecureStore.deleteItemAsync("userDetail");
    setUserDetails({});

    setIsLoading(false);
  };

  const fetchUser = async () => {
    try {
      const response = await fetchUserData();
      setUserDetails((prev) => {
        return {
          ...prev,
          user: response,
        };
      });
      setSoonQuest(response.joinedQuest);
    } catch (error) {
      await SecureStore.deleteItemAsync("userDetail");
      alert("Please Login again");
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await SecureStore.getItemAsync("userDetail");
        const user = JSON.parse(data);
        console.log(
          user?.user
            ? `You are logged in as ${user?.user._id}`
            : "You are not logged in"
        );
        if (user) {
          setUserDetails(user);
        } else {
          setUserDetails({});
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
    return () => {};
  }, []);

  return (
    <AppContext.Provider
      value={{
        newMarker,
        setNewMarker,
        isProfileOpen,
        setIsProfileOpen,
        login,
        logout,
        isLoading,
        userDetail,
        bottomModalRef,
        setBottomModalRef,
        drawerOpen,
        setDrawerOpen,
        mapMoveTo,
        setMapMoveTo,
        fetchUser,
        soonQuest,
        setSoonQuest,
        mapRefetch,
        setMapRefetch,
        mapSearchedLocation,
        setMapSearchedLocation,
        focusedPin,
        setFocusedPin,
        snapBack,
        setSnapBack,
        getNavigator,
        setGetNavigator,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
