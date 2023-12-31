import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { buttonGrey } from "../../data/color";
import { useAppContext } from "../../data/AppContext";
import qr_icon from "../../../assets/images/qr_scanner_icon.png";

import { statusIcon } from "../../components/misc/Status";

const dayOfWeek = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

export default function AdminQuestListItem({
  quest,
  isAdmin = true,
  onPress,
  panMap = true,
}) {
  const { userDetail, mapMoveTo, setFocusedPin } = useAppContext();

  const checkQuestCompleted = () => {
    return quest.status;
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

  const getStartTime = () => {
    const time = new Date(quest.timeStart);
    const hh = time.getHours().toString().padStart(2, "0");
    const mm = time.getMinutes().toString().padStart(2, "0");

    return `${dayOfWeek[time.getDay()]} ${hh}:${mm}`;
  };

  return (
    <TouchableOpacity onPress={questPressHandler} style={styles.questContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{quest.questName}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 10,
              height: 10,
              marginRight: 5,
              // aspectRatio: "1/1",
              backgroundColor: statusIcon(
                quest.countParticipant,
                quest.maxParticipant,
                quest.status,
                quest.timeStart,
                quest.timeEnd
              ),
              borderRadius: 10,
            }}
          ></View>
          <Text style={styles.detailText}>{getStartTime()}</Text>
        </View>
      </View>
      <Text style={styles.detailText} numberOfLines={2}>
        ที่ {quest.locationId.locationName.replace(/\n/g, " ")}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={styles.countingContainer}>
          <Text style={styles.countHeader}>เข้าร่วมแล้ว</Text>
          <Text style={styles.countNumber}>
            {quest.countParticipant}
            {quest.maxParticipant ? `/${quest.maxParticipant}` : ""}
          </Text>
        </View>
        <View style={styles.countingContainer}>
          <Text style={styles.countHeader}>เช็คอินแล้ว</Text>
          <Text style={styles.countNumber}>
            {quest.countCheckIn}/{quest.countParticipant}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  questContainer: {
    backgroundColor: buttonGrey,
    padding: 7,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  countingContainer: {
    borderWidth: 1,
    // paddingVertical: 3,
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
  },
  countHeader: {
    fontFamily: "Kanit300",
    fontSize: 16,
    lineHeight: 22,
  },
  countNumber: {
    fontFamily: "Kanit400",
    fontSize: 16,
    lineHeight: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 7,
    // alignItems: "flex-start",
  },
  qrContainer: {
    width: 30,
    height: 30,
    marginLeft: 7,
  },
  timePlaceContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  headerText: {
    fontFamily: "Kanit400",
    fontSize: 17,
    flex: 1,
  },
  detailText: {
    fontFamily: "Kanit300",
    // lineHeight: 19,
    fontSize: 15,
    // textAlign: "right",
  },
});
