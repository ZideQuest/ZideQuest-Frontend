import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

import hamburger_icon from "../../assets/images/hamburger-icon.png";

export default function NavBar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const hamburgerPressHandler = () => {
    setHamburgerOpen((prev) => !prev);
  };

  const rotateValueHolder = new Animated.Value(0);

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  useEffect(() => {
    rotateValueHolder.setValue(hamburgerOpen ? 0 : 1)
    Animated.timing(rotateValueHolder, {
      toValue: hamburgerOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
          {/* <View style={styles.menus}>
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
          </View> */}
        </Pressable>
        <Text style={styles.logo}>ZideQuest</Text>
      </View>
      <Pressable
        style={styles.loginButton}
        onPress={() => alert("logging in...")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
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
