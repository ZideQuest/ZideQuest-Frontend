import React from "react";
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
import { primaryColor } from "../data/color";
import NotificationList from "../components/NotificationList";
import { deleteUserNotification } from "../data/authen";

export default function MyNotifications() {
  const { userDetail, fetchUser } = useAppContext();

  const deleteNotification = (id) => {
    deleteUserNotification(id).then(() => {
      fetchUser();
    });
  };

  return (
    <Bottomsheet snapPoints={["100%"]} detached={true} hideBar={true}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingRight: 20,
          }}
        >
          <Text style={styles.Head_text}>Notifications 📣</Text>
          <Pressable
            onPress={() => TabNavigation.navigate("Recommend")}
            style={[styles.exit]}
          >
            <Image style={{ width: 17, height: 17 }} source={goBackPic} />
          </Pressable>
        </View>
        <BottomSheetScrollView style={styles.notificationContainer}>
          <View style={{ gap: 7 }}>
            {userDetail.user.notifications &&
            userDetail.user.notifications.length > 0 ? (
              userDetail.user.notifications.map((item) => (
                <NotificationList
                  detail={item}
                  onDelete={deleteNotification}
                  key={item._id}
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
          </View>
        </BottomSheetScrollView>
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
    backgroundColor: "transparent",
    alignSelf: "center",
    padding: 7,
    marginTop: 14,
  },
  Head_text: {
    fontFamily: "Kanit600",
    fontSize: 30,
    paddingLeft: 25,
    paddingTop: 10,
    color: primaryColor,
  },
  notificationContainer: {
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    // gap: 5,
  },
});
