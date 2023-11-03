import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import person_icon from "../../assets/images/participant.png";
import { buttonGrey } from "../data/color";
import { useAppContext } from "../data/AppContext";

import { statusIcon } from "../components/misc/Status";

export default function QuestListItem({
  quest,
  isAdmin = false,
  onPress,
  panMap = false,
}) {
  const { userDetail, mapMoveTo, setFocusedPin } = useAppContext();
  const checkQuestCompleted = () => {
    if (!quest.status) {
      return false;
    }
    let status = false;
    quest.participant.forEach((p) => {
      if (p.userId == userDetail.user._id) {
        status = true;
      }
    });
    return status;
  };

  const questPressHandler = () => {
    if (isAdmin) {
      TabNavigation.navigate("QuestManage", { questId: quest._id });
    } else if (checkQuestCompleted()) {
      TabNavigation.navigate("UserQuestComplete", { questId: quest._id });
    } else if (userDetail?.token != null) {
      TabNavigation.navigate("QuestDetail", { questId: quest._id });
    } else {
      alert("กรุณา login");
      return;
    }

    if (onPress) {
      onPress();
    }

    if (panMap) {
      setFocusedPin(quest.locationId._id);
      mapMoveTo(quest.locationId.latitude, quest.locationId.longitude);
    }
  };

  return (
    <Pressable
      onPress={questPressHandler}
      style={[styles.questItem, { opacity: quest.status ? 0.5 : 1 }]}
    >
      <Text style={styles.questFont} numberOfLines={1}>
        {quest.questName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text style={styles.questFont}>
          {quest.countParticipant}
          {quest.maxParticipant ? `/${quest.maxParticipant}` : ""}
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
              quest.maxParticipant,
              quest.status
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
    padding: 7,
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
    fontFamily: "Kanit300",
    fontSize: 17,
    flexShrink: 1,
  },
});
