import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import redcross_icon from "../../assets/images/redcross.png";
import { buttonGrey, primaryColor, textColor } from "../data/color";
import Alert from "./misc/Alert";

export default function NotificationList({ quest, message, id, onDelete }) {
  const DeleteNotiPressHandler = async () => {
    if (await Alert("Delete", "ยืนยันการลบ notification นี้?")) {
      onDelete(id);
    }
  };
  return (
    <View style={styles.Card}>
      <View style={{ flex: 1, paddingRight: 25 }}>
        <Text style={styles.QuestName}>Quest: {quest.questName}</Text>
        <Text style={styles.Message}>{message}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          paddingRight: 10,
          paddingLeft: 10,
          backgroundColor: textColor,
        }}
      >
        <TouchableOpacity onPress={DeleteNotiPressHandler}>
          <Image source={redcross_icon} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    width: "100%",
    backgroundColor: primaryColor,
    flexDirection: "row",
  },
  QuestName: {
    paddingLeft: 10,
    fontFamily: "Kanit400",
    fontSize: 16,
    color: buttonGrey,
  },
  Message: {
    fontFamily: "Kanit400",
    paddingLeft: 30,
    fontSize: 14,
    color: textColor,
  },
});
