import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../data/AppContext";
import { primaryColor } from "../data/color";

import zidequest_icon from "../../assets/images/zidequest_icon.png";
import open_eye_icon from "../../assets/images/view.png";
import close_eye_icon from "../../assets/images/close-eye.png";

export default function NavBar() {
  const insets = useSafeAreaInsets();
  const {
    setDrawerOpen,
    onlyPinWithMyQuest,
    setOnlyPinWithMyQuest,
    userDetail,
    fetchUser,
  } = useAppContext();

  const DrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const pinToggle = () => {
    fetchUser();
    setOnlyPinWithMyQuest((prev) => !prev);
  };

  return (
    <View
      style={[styles.container, { paddingTop: insets.top + 10 }]}
      pointerEvents={"box-none"}
    >
      <TouchableOpacity
        style={styles.hamburgerContainer}
        onPress={DrawerToggle}
        activeOpacity={0.7}
      >
        <Image source={zidequest_icon} style={styles.hamburgerIcon} />
      </TouchableOpacity>
      {userDetail.token && !userDetail.isAdmin && (
        <TouchableOpacity
          style={styles.pinButtonContainer}
          onPress={pinToggle}
          activeOpacity={0.7}
        >
          <Image
            source={onlyPinWithMyQuest ? close_eye_icon : open_eye_icon}
            style={styles.pinButtonIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 1,
    position: "absolute",
    justifyContent: "space-between",
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hamburgerContainer: {
    height: 60,
    width: 60,
    position: "relative",
    borderRadius: 30,
    overflow: "hidden",
    borderColor: primaryColor,
    borderWidth: 3,
  },
  hamburgerIcon: {
    height: "100%",
    width: "100%",
  },
  searchContainer: {
    flex: 1,
  },
  pinButtonContainer: {},
  pinButtonIcon: {
    width: 40,
    height: 40,
  },
});
