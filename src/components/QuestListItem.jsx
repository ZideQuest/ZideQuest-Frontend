import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import person_icon from "../../assets/images/participant.png";
import { buttonGrey } from "../data/color";

function statusIcon(currentP, maxP) {
  const ratio = currentP / maxP;
  if (ratio >= 1) {
    return "red";
  }
  if (ratio > 0.8) {
    return "yellow";
  }
  return "green";
}

export default function QuestListItem({ quest, isAdmin = false, token }) {
  const questPressHandler = () => {
    if (isAdmin) {
      TabNavigation.navigate("QuestManage", { questId: quest._id });
    } else if (token != null){
      TabNavigation.navigate("QuestDetail", { questId: quest._id });
    } else {
      alert('กรุณา login');
    }
  };

  return (
    <Pressable
      onPress={questPressHandler}
      key={quest.id}
      style={[styles.questItem, { opacity: quest.status == "live" ? 100 : 50 }]}
    >
      <Text style={styles.questFont}>{quest.questName}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={styles.questFont}>
          {quest.countParticipant}/{quest.maxParticipant}
        </Text>
        <View style={styles.pic}>
          <Image source={person_icon} />
        </View>
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor: statusIcon(
              quest.countParticipant,
              quest.maxParticipant
            ),
            borderRadius: 25,
          }}
        ></View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  questItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: buttonGrey,
    padding: 10,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  pic: {
    width: 20,
    height: 20,
    // backgroundColor: "red"
    resizeMode: "contain",
  },
  questFont: {
    fontSize: 16,
  },
});
