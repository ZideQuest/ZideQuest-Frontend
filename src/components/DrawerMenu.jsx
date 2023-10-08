import React, { useState, useEffect } from "react";
import { Drawer } from "react-native-drawer-layout";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAppContext } from "../data/AppContext";
import * as TabNavigation from "../data/TabNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressBar from "react-native-progress/Bar";

import UpComingQuest from "../components/Quest/UpComingQuest";

import Alert from "../components/misc/Alert";
import user_icon from "../../assets/images/user_icon.png";
import plus_icon from "../../assets/images/plus.png";
import leave_icon from "../../assets/images/leave_icon.png";
import qr_scanner_icon from "../../assets/images/qr_scanner_icon.png";
import close_icon from "../../assets/images/close_icon.png";

import { buttonGrey, primaryColor, textColor } from "../data/color";

export default function DrawerMenu({ navigation, children }) {
  const {
    userDetail,
    drawerOpen,
    setDrawerOpen,
    logout,
    fetchUser,
    setFocusedPin,
  } = useAppContext();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const addButtonHandler = () => {
    TabNavigation.navigate("CreatePin");
    setFocusedPin("new pin");
    setDrawerOpen(false);
  };

  const checkinButtonHandler = () => {
    if (userDetail.isAdmin || userDetail.token != null) {
      navigation.navigate("Checkin");
      setDrawerOpen(false);
    } else {
      alert("กรุณา login");
    }
  };

  const loginHandler = () => {
    TabNavigation.navigate("Recommend");
    setDrawerOpen(false);
    navigation.navigate("Login");
  };

  const logoutHandler = async () => {
    if (await Alert("Logout", "Are you sure you want to log out?")) {
      TabNavigation.navigate("Recommend");
      logout();
      setDrawerOpen(false);
    }
  };

  const profilePressHander = () => {
    setDrawerOpen(false);
    TabNavigation.navigate("Profile");
  };

  const fetchNewData = async () => {
    setLoading(true);
    fetchUser();
    setLoading(false);
  };

  useEffect(() => {
    fetchNewData();
  }, [drawerOpen]);

  const ProfileDisplay = ({ userDetail }) => {
    if (userDetail.isAdmin) {
      return (
        <TouchableOpacity
          style={styles.profileDisplayContainer}
          onPress={profilePressHander}
        >
          <View style={styles.displayImageContainer}>
            <Image
              source={
                userDetail?.user?.picturePath
                  ? { uri: userDetail?.user?.picturePath }
                  : user_icon
              }
              style={styles.displayImage}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Text style={styles.username}>
              {userDetail?.user?.organizeName}
            </Text>
            <Text style={{ fontFamily: "Kanit400" }}>
              {userDetail.user.role}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={profilePressHander} style={{ gap: 10 }}>
          <View style={styles.profileDisplayContainer}>
            <View style={styles.displayImageContainer}>
              <Image
                source={
                  userDetail?.user?.picturePath
                    ? { uri: userDetail?.user?.picturePath }
                    : user_icon
                }
                style={styles.displayImage}
              />
            </View>
            <View>
              <Text style={styles.username}>{userDetail?.user?.firstName}</Text>
              <Text
                style={{ fontFamily: "Kanit400", fontSize: 15, lineHeight: 17 }}
              >
                Level{" "}
                <Text style={{ color: "teal" }}>{userDetail?.user?.level}</Text>
              </Text>
            </View>
          </View>
          <View style={{ gap: 3, alignItems: "flex-end" }}>
            <Text style={{ fontFamily: "Kanit300" }}>
              EXP : {userDetail.user?.exp}
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: "lightgreen",
                height: 6,
              }}
            >
              <ProgressBar
                width={null}
                height={6}
                borderRadius={0}
                borderWidth={0}
                color="green"
                progress={userDetail.user?.exp / 15000}
                style={{ justifyContent: "flex-start" }}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
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
              <TouchableOpacity
                onPress={() => {
                  setDrawerOpen(false);
                }}
              >
                <Image source={close_icon} style={{ width: 15, height: 15 }} />
              </TouchableOpacity>
            </View>
            {userDetail?.token ? (
              <>
                <ProfileDisplay userDetail={userDetail} />
                {!userDetail?.isAdmin && (
                  <UpComingQuest onPress={() => setDrawerOpen(false)} />
                )}
              </>
            ) : (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => loginHandler()}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}

            <View style={styles.bigMenuContainer}>
              <TouchableOpacity
                onPress={checkinButtonHandler}
                style={styles.bigMenuItem}
              >
                <View style={styles.bigMenuIcon}>
                  <Image style={styles.menuItem} source={qr_scanner_icon} />
                </View>
                <Text style={styles.bigButtonText}>เช็คอิน</Text>
              </TouchableOpacity>
              {userDetail?.isAdmin && (
                <TouchableOpacity
                  onPress={addButtonHandler}
                  style={styles.bigMenuItem}
                >
                  <View style={styles.bigMenuIcon}>
                    <Image style={styles.menuItem} source={plus_icon} />
                  </View>
                  <Text style={styles.bigButtonText}>เพิ่มสถานที่</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.smallMenuContainer}>
              <TouchableOpacity>
                <Text style={styles.smallMenuItem}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.smallMenuItem}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.smallMenuItem}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.smallMenuItem}>Privacy</Text>
              </TouchableOpacity>
              {userDetail.user && (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                  onPress={logoutHandler}
                >
                  <Text style={[styles.smallMenuItem, { color: primaryColor }]}>
                    Logout
                  </Text>
                  <Image source={leave_icon} />
                </TouchableOpacity>
              )}
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
    fontSize: 20,
    letterSpacing: 0.25,
    color: "white",
    padding: 7,
    fontFamily: "Kanit400",
  },
  logo: {
    color: primaryColor,
    fontSize: 30,
    fontFamily: "Kanit600",
  },
  profileDisplayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  displayImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    overflow: "hidden",
  },
  displayImage: {
    width: "100%",
    height: "100%",
  },
  smallMenuContainer: {
    gap: 15,
  },
  smallMenuItem: {
    fontSize: 17,
    fontFamily: "Kanit500",
    lineHeight: 20,
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
    fontFamily: "Kanit500",
    lineHeight: 30,
  },
  bigButtonText: {
    marginTop: 8,
    fontFamily: "Kanit400",
    fontSize: 14,
  },
});
