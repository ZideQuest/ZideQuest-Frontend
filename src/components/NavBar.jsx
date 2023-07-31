import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

import { useAppContext } from "../data/AppContext";

import hamburger_icon from "../../assets/images/hamburger-icon.png";
import filter_icon from "../../assets/images/filter.png";
import search_icon from "../../assets/images/search.png";
import plus_icon from "../../assets/images/plus.png";

const ANIMATION_TIME = 200

export default function NavBar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(null);
  const { setCreatingNewMarker, setNewMarker, isLoggedIn, setIsLoggedIn } =
    useAppContext();

  const hamburgerPressHandler = () => {
    setHamburgerOpen((prev) => !prev);
  };

  const addButtonHandler = () => {
    setCreatingNewMarker(true);
    hamburgerPressHandler();
  };

  const loginHandler = () => {
    alert("Logging in...");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    alert("Logging out...");
    setCreatingNewMarker(false);
    setIsLoggedIn(false);
    setNewMarker(null);
  };

  const rotateValueHolder = new Animated.Value(0);
  const heightValueHolder = new Animated.Value(0);

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const HeightData = heightValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  useEffect(() => {
    if (hamburgerOpen === null) { 
      return
    }
    if (hamburgerOpen) {
      Animated.timing(rotateValueHolder, {
        toValue: 1,
        duration: ANIMATION_TIME,
        useNativeDriver: true,
      }).start();

      // heightValueHolder.setValue(hamburgerOpen ? 0 : 1);
      Animated.timing(heightValueHolder, {
        toValue: 1,
        duration: ANIMATION_TIME,
        useNativeDriver: false,
      }).start();
    } else {
      rotateValueHolder.setValue(1);
      Animated.timing(rotateValueHolder, {
        toValue: 0,
        duration: ANIMATION_TIME,
        useNativeDriver: true,
      }).start();
      
      heightValueHolder.setValue(1);
      Animated.timing(heightValueHolder, {
        toValue: 0,
        duration: ANIMATION_TIME,
        useNativeDriver: false,
      }).start();
    }
  }, [hamburgerOpen]);

  return (
    <View style={styles.container}>
      <View style={styles.navLeft}>
        <Pressable
          style={styles.hamburgerContainer}
          onPress={() => hamburgerPressHandler()}
        >
          <Animated.Image
            style={[
              styles.hamburgerIcon,
              { transform: [{ rotate: RotateData }] },
            ]}
            source={hamburger_icon}
          />
        </Pressable>
        <Animated.View style={[styles.menus, { height: HeightData }]}>
          <Pressable onPress={() => alert("search")}>
            <Image style={styles.menuItem} source={search_icon} />
          </Pressable>
          <Pressable onPress={() => alert("filer")}>
            <Image style={styles.menuItem} source={filter_icon} />
          </Pressable>
          {isLoggedIn && (
            <Pressable onPress={addButtonHandler}>
              <Image style={styles.menuItem} source={plus_icon} />
            </Pressable>
          )}
        </Animated.View>
        <Text style={styles.logo}>ZideQuest</Text>
      </View>
      {isLoggedIn ? (
        <Pressable style={styles.loginButton} onPress={() => logoutHandler()}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.loginButton} onPress={() => loginHandler()}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 1,
    backgroundColor: "white",
    // paddingTop: 50
    // height: 20
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hamburgerContainer: {
    height: 40,
    width: 40,
    position: "relative",
  },
  hamburgerIcon: {
    height: "100%",
    width: "100%",
  },
  menus: {
    position: "absolute",
    backgroundColor: "#E86A33",
    flexDirection: "column",
    justifyContent: "space-around",
    top: 60,
    borderRadius: 100,
    overflow: "hidden",
  },
  menuItem: {
    width: 30,
    height: 30,
    padding: 20,
    margin: 5,
  },
  logo: {
    color: "#E86A33",
    fontWeight: "bold",
    fontSize: 30,
  },
  loginButton: {
    backgroundColor: "#E86A33",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    // lineHeight: 10,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: 10,
  },
});
