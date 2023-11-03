import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useAppContext } from "../data/AppContext";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import goBackPic from "../../assets/images/close_icon.png";
import * as TabNavigation from "../data/TabNavigation";
import { buttonGrey, primaryColor, textColor } from "../data/color";
import NotificationList from "../components/NotificationList";

export default function MyNotifications() {
  const { userDetail } = useAppContext();

  return (
    <Bottomsheet snapPoints={["90%"]} detached={true} hideBar={true}>
      <View style={styles.container}>
        <Pressable
          onPress={() => TabNavigation.navigate("Recommend")}
          style={[styles.exit, { alignItems: "flex-end" }]}
        >
          <Image style={{ width: 17, height: 17 }} source={goBackPic} />
        </Pressable>
        <Text style={styles.Head_text}>Notifications 🔥</Text>
        <ScrollView style={styles.notificationContainer}>
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          <NotificationList />
          {userDetail.user.notifications &&
          userDetail.user.notifications.length > 0 ? (
            userDetail.user.notifications.map((item) => (
              <NotificationList
                name={item.questId}
                key={item._id}
                message={item.message}
              />
            ))
          ) : (
            <Text
              style={{
                justifyContent: "center",
                fontFamily: "Kanit600",
                fontSize: 20,
              }}
            >
              Nothing here yet 😉
            </Text>
          )}
        </ScrollView>
      </View>
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  exit: {
    paddingTop: 15,
    paddingRight: 15,
    backgroundColor: "transparent",
  },
  Head_text: {
    fontFamily: "Kanit600",
    fontSize: 30,
    paddingLeft: 25,
    paddingTop: 10,
    color: primaryColor,
  },
  notificationContainer: {
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    gap: 5,
  },
});
