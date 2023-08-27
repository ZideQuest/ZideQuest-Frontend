import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

import Modal from "react-native-modal";

import { useAppContext } from "../data/AppContext";
import * as TabNavigation from "../data/TabNavigation";

import hamburger_icon from "../../assets/images/hamburger-icon.png";
import filter_icon from "../../assets/images/filter.png";
import search_icon from "../../assets/images/search.png";
import plus_icon from "../../assets/images/plus.png";

const ANIMATION_TIME = 200;

export default function NavBar({ navigation }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { isProfileOpen, setIsProfileOpen, userDetail } = useAppContext();

  const hamburgerToggle = () => {
    setHamburgerOpen((prev) => !prev);
  };

  const addButtonHandler = () => {
    TabNavigation.navigate("CreatePin");
    setHamburgerOpen(false);
    console.log("add pressed");
  };

  const loginHandler = () => {
    navigation.navigate("Login");
  };


  return (
    <View style={styles.container}>
      <View style={styles.navLeft}>
        <Pressable style={styles.hamburgerContainer} onPress={hamburgerToggle}>
          <Image source={hamburger_icon} style={styles.hamburgerIcon} />
        </Pressable>
        <Modal
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          transparent={true}
          isVisible={hamburgerOpen}
          backdropOpacity={0.5}
          onBackdropPress={hamburgerToggle}
          // onSwipeStart={() => console.log("swiping")}
        >
          <View style={styles.menus}>
            <Pressable onPress={hamburgerToggle}>
              <Text>Close</Text>
            </Pressable>
            <Pressable onPress={() => alert("search")}>
              <Image style={styles.menuItem} source={search_icon} />
            </Pressable>
            <Pressable onPress={() => alert("filer")}>
              <Image style={styles.menuItem} source={filter_icon} />
            </Pressable>
            {userDetail?.isAdmin && (
              <Pressable onPress={addButtonHandler}>
                <Image style={styles.menuItem} source={plus_icon} />
              </Pressable>
            )}
          </View>
        </Modal>
        {/* <Animated.View style={[styles.menus, { height: HeightData }]}>
        </Animated.View> */}
        <Text style={styles.logo}>ZideQuest</Text>
      </View>
      {userDetail?.token ? (
        <Pressable
          style={styles.loginButton}
          onPress={() => setIsProfileOpen(!isProfileOpen)}
        >
          <Text style={styles.buttonText}>Profile</Text>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
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
    // position: "absolute",
    backgroundColor: "#E86A33",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "80%",
    left: -50,
    height: "120%",
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
