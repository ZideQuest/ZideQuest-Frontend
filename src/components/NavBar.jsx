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

export default function NavBar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
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
  const heightValueHolder = useState(new Animated.Value(0))[0];

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });


  useEffect(() => {
    rotateValueHolder.setValue(hamburgerOpen ? 0 : 1);
    Animated.timing(rotateValueHolder, {
      toValue: hamburgerOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    },
    ).start();
   if (hamburgerOpen) {
      Animated.timing(heightValueHolder, {
        toValue: 200,
        duration: 300, 
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(heightValueHolder, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
   
  },
   [hamburgerOpen]);



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
          <Animated.View
            style={[styles.menus, { display: hamburgerOpen ? "flex" : "none", height: heightValueHolder,
            
           }]}
          >
            <Pressable onPress={() => alert("search")}>
              <Image style={styles.menuItem} source={search_icon} />
            </Pressable>
            <Pressable onPress={() => alert("filer")}>
              <Image style={styles.menuItem} source={filter_icon} />
            </Pressable>
            {isLoggedIn && <Pressable onPress={addButtonHandler}>
              <Image style={styles.menuItem} source={plus_icon} />
            </Pressable>}
          </Animated.View>
        </Pressable>
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    top: 60,
    padding: 10,
    gap: 10,
    borderRadius: 100,
  },
  menuItem: {
    width: 30,
    height: 30,
    padding: 10,

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
