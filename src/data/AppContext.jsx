import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { sendLoginData } from "./authen";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [newMarker, setNewMarker] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetail, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bottomModalRef, setBottomModalRef] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        console.log("Error fetching token:", error);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
