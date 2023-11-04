import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import redcross_icon from "../../assets/images/redcross.png";
import { buttonGrey, primaryColor, textColor } from "../data/color";
import Alert from "./misc/Alert";

export default function NotificationList({ detail, onDelete }) {
  const quest = detail.questId;
  const { message, createdAt } = detail;
  const id = detail._id;

  const time = new Date(createdAt);
  console.log(time);

  const DeleteNotiPressHandler = async () => {
    if (await Alert("Delete", "ยืนยันการลบ notification นี้?")) {
      onDelete(id);
    }
  };
  return (
    <TouchableOpacity style={styles.Card} onPress={DeleteNotiPressHandler}>
      <View style={{ flex: 1, paddingRight: 25 }}>
        <Text style={styles.QuestName}>
          เควส {quest.questName} ถูกยกเลิก!
        </Text>
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
      <View
        style={{
          justifyContent: "center",
          paddingRight: 10,
          paddingLeft: 10,
          backgroundColor: textColor,
        }}
      >
        {/* <TouchableOpacity onPress={DeleteNotiPressHandler}>
          <Image source={redcross_icon} style={{ width: 25, height: 25 }} />
        </TouchableOpacity> */}
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
    // color: textColor,
  },
});
