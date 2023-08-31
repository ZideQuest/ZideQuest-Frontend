import React, { useState, useEffect } from "react";
import { Drawer } from "react-native-drawer-layout";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useAppContext } from "../data/AppContext";
import * as TabNavigation from "../data/TabNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Alert from "../components/misc/Alert";
import user_icon from "../../assets/images/user_icon.png";
import plus_icon from "../../assets/images/plus.png";
import leave_icon from "../../assets/images/leave_icon.png";
import qr_scanner_icon from "../../assets/images/qr_scanner_icon.png";
import close_icon from "../../assets/images/close_icon.png";

import { buttonGrey, primaryColor, textColor } from "../data/color";

function ProfileDisplay({ userDetail }) {
  if (userDetail.isAdmin) {
    return (
      <View style={styles.profileDisplayContainer}>
        <View style={styles.displayImageContainer}>
          <Image
            source={userDetail?.user?.picturePath || user_icon}
            style={styles.displayImage}
          />
        </View>
        <View>
          <Text style={styles.username}>{userDetail?.user?.organizeName}</Text>
          <Text>{userDetail.user.role}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.profileDisplayContainer}>
        <View style={styles.displayImageContainer}>
          <Image
            source={userDetail?.user?.picturePath || user_icon}
            style={styles.displayImage}
          />
        </View>
        <View>
          <Text style={styles.username}>{userDetail?.user?.organizeName}</Text>
        </View>
      </View>
    );
  }
}

export default function DrawerMenu({ navigation, children }) {
  const { userDetail, drawerOpen, setDrawerOpen, logout } = useAppContext();
  const insets = useSafeAreaInsets();

  const addButtonHandler = () => {
    TabNavigation.navigate("CreatePin");
    setDrawerOpen(false);
  };

  const checkinButtonHandler = () => {
    navigation.navigate("Checkin");
    setDrawerOpen(false);
  };

  const loginHandler = () => {
    setDrawerOpen(false);
    navigation.navigate("Login");
  };

  const logoutHandler = async () => {
    if (await Alert("Logout", "Are you sure you want to log out?")) {
      logout();
      setDrawerOpen(false);
      TabNavigation.navigate("Recommend");
    }
  };

  return (
    <Drawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      drawerStyle={{ width: "70%" }}
      renderDrawerContent={() => {
        return (
          <View style={[styles.menus, { paddingTop: insets.top + 20 }]}>
            <View style={styles.menuHeader}>
              <Text style={styles.logo}>ZideQuest</Text>
              <Pressable
                onPress={() => {
                  setDrawerOpen(false);
                }}
              >
                <Image source={close_icon} style={{ width: 15, height: 15 }} />
              </Pressable>
            </View>
            {userDetail?.token ? (
              <ProfileDisplay userDetail={userDetail} />
            ) : (
              <Pressable
                style={styles.loginButton}
                onPress={() => loginHandler()}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            )}

            <View style={styles.bigMenuContainer}>
              <Pressable
                onPress={checkinButtonHandler}
                style={styles.bigMenuItem}
              >
                <View style={styles.bigMenuIcon}>
                  <Image style={styles.menuItem} source={qr_scanner_icon} />
                </View>
                <Text style={styles.bigButtonText}>เช็คอิน</Text>
              </Pressable>
              {userDetail?.isAdmin && (
                <Pressable
                  onPress={addButtonHandler}
                  style={styles.bigMenuItem}
                >
                  <View style={styles.bigMenuIcon}>
                    <Image style={styles.menuItem} source={plus_icon} />
                  </View>
                  <Text style={styles.bigButtonText}>เพิ่มสถานที่</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.smallMenuContainer}>
              <Pressable>
                <Text style={styles.smallMenuItem}>Settings</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.smallMenuItem}>About</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.smallMenuItem}>Contact Us</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.smallMenuItem}>Privacy</Text>
              </Pressable>
              <Pressable
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
                onPress={logoutHandler}
              >
                <Text style={[styles.smallMenuItem, { color: primaryColor }]}>
                  Logout
                </Text>
                <Image source={leave_icon} />
              </Pressable>
            </View>
          </View>
        );
      }}
    >
      {children}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  menus: {
    backgroundColor: "white",
    padding: 20,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  loginButton: {
    backgroundColor: primaryColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    // lineHeight: 10,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: 10,
  },
  logo: {
    color: primaryColor,
    fontWeight: "bold",
    fontSize: 30,
  },
  profileDisplayContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    gap: 20,
  },
  displayImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    overflow: "hidden",
  },
  displayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  smallMenuContainer: {
    gap: 15,
  },
  smallMenuItem: {
    fontSize: 16,
    fontWeight: 600,
  },
  bigMenuContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
  },
  bigMenuIcon: {
    backgroundColor: buttonGrey,
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
  },
  bigMenuItem: {
    alignItems: "center",
  },
  menuItem: {
    width: "100%",
    height: "100%",
  },
  username: {
    fontSize: 25,
    fontWeight: "600",
  },
  bigButtonText: {
    fontWeight: 500,
    marginTop: 8,
  },
});
