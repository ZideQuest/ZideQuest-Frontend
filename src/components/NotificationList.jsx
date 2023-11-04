import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { textColor } from "../data/color";
import Alert from "./misc/Alert";

export default function NotificationList({ detail, onDelete }) {
  const quest = detail.questId;
  const { message, createdAt } = detail;
  const id = detail._id;
  const time = new Date(createdAt);

  const DeleteNotiPressHandler = async () => {
    if (await Alert("Delete", "ยืนยันการลบ Notification นี้?")) {
      onDelete(id);
    }
  };
  return (
    <TouchableOpacity style={styles.Card} onPress={DeleteNotiPressHandler}>
      <View style={{ flex: 1, paddingRight: 25 }}>
        <Text style={styles.QuestName}>เควส {quest.questName} ถูกยกเลิก!</Text>
        <Text style={{ paddingLeft: 10, fontFamily: "Kanit300" }}>
          เมื่อ {time.toLocaleString()}
        </Text>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: "Kanit300",
              // paddingLeft: 10,
              color: textColor,
              paddingTop: 5,
            }}
          >
            รายละเอียด
          </Text>
          <Text style={styles.Message}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Card: {
    width: "100%",
    // backgroundColor: primaryColor,
    // flexDirection: "row",
    borderColor: textColor,
    borderWidth: 1,
    borderRadius: 3,
    overflow: "hidden",
    paddingVertical: 5,
  },
  QuestName: {
    paddingLeft: 10,
    fontFamily: "Kanit400",
    fontSize: 16,
    color: "red",
  },
  Message: {
    fontFamily: "Kanit300",
    fontSize: 14,
    paddingLeft: 10,
  },
});
