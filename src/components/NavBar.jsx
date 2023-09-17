import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../data/AppContext";
import zidequest_icon from "../../assets/images/zidequest_icon.png";
import { primaryColor } from "../data/color";

export default function NavBar() {
  const insets = useSafeAreaInsets();
  const { drawerOpen, setDrawerOpen } = useAppContext();

  const DrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 15 }]}>
      <View>
        <TouchableOpacity
          style={styles.hamburgerContainer}
          onPress={DrawerToggle}
          activeOpacity={0.7}
        >
          <Image source={zidequest_icon} style={styles.hamburgerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 1,
    position: "absolute",
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
});
