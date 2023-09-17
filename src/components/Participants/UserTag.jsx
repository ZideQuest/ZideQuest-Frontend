import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { buttonGrey, buttonLightGrey } from "../../data/color";
import user_icon from "../../../assets/images/user_icon.png";
import Checkbox from 'expo-checkbox';

export default function UserTag({ user }) {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <View style={styles.profilePicContainer}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={
              user?.user?.picturePath
                ? { uri: user?.user?.picturePath }
                : user_icon
            }
          />
        </View>
        <Text style={styles.textInfo}>
          {user?.user?.firstName} {user?.user?.lastName}
        </Text>
      </View>
      <Checkbox
        value={user?.status}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: buttonGrey,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
  },
  textInfo: {
    fontSize: 16,
    fontFamily: "Kanit300",
  },
  profilePicContainer: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
  },
});
