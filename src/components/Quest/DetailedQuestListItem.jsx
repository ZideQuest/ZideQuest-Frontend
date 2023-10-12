import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import person_icon from "../../../assets/images/participant.png";
import { buttonGrey } from "../../data/color";
import { useAppContext } from "../../data/AppContext";
import Tag from "./Tag";
import { activityCategories } from "../../data/activityHour";

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

export default function DetailedQuestListItem({
  quest,
  isAdmin = false,
  onPress,
  panMap = false,
}) {
  // console.log(quest)
  const { userDetail, mapMoveTo, setFocusedPin } = useAppContext();

  const checkQuestCompleted = () => {
    if (!quest.status) {
      return false;
    }
    let status = false;
    quest.participant.forEach((p) => {
      if (p?.userId == userDetail?.user?._id) {
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

  const getStartTime = () => {
    const time = new Date(quest.timeStart);
    const hh = time.getHours().toString().padStart(2, "0");
    const mm = time.getMinutes().toString().padStart(2, "0");

    return `${dayOfWeek[time.getDay()]} ${hh}:${mm}`;
  };

  return (
    <TouchableOpacity
      onPress={questPressHandler}
      style={[
        quest.isJoin
          ? quest.isCheckin || quest.status
            ? styles.questcheckinContainer
            : styles.questJoinedContainer
          : styles.questContainer,
        { opacity: quest.status ? 0.5 : 1 },
      ]}
    >
      <View style={styles.nameAndParticipants}>
        <Text style={styles.questName}>{quest.questName}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
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
      </View>
      <View style={styles.timeAndTags}>
        <Text style={styles.dateText}>{getStartTime()}</Text>
        <Tag tags={quest?.tagId} />
      </View>
      <View style={styles.moreDetail}>
        <Text style={styles.requirementText}>
          ชั่วโมงกิจกรรม :
          <Text style={styles.boldDetail}>
            {quest?.activityHour?.category
              ? ` ${activityCategories[quest?.activityHour?.category]} ${
                  quest.activityHour.hour
                } ชั่วโมง`
              : " -"}
          </Text>
        </Text>
        <View style={styles.requirement}>
          <Text style={styles.requirementText}>
            ชั้นปีที่มีสิทธิ์ : <Text style={styles.boldDetail}>-</Text>
          </Text>
          <Text style={styles.requirementText}>
            ชั้นปีที่ไม่มีสิทธิ์ : <Text style={styles.boldDetail}>-</Text>
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
  questcheckinContainer: {
    backgroundColor: "#39FF14",
    padding: 7,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  questJoinedContainer: {
    backgroundColor: "#FF5733",
    padding: 7,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameAndParticipants: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  questName: {
    fontFamily: "Kanit400",
    fontSize: 20,
  },
  timeAndTags: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moreDetail: {},
  requirement: {
    flexDirection: "row",
  },
  requirementText: { flex: 0.5, fontFamily: "Kanit300", fontSize: 15 },
  boldDetail: {
    fontFamily: "Kanit400",
  },
  dateText: {
    fontFamily: "Kanit400",
    fontSize: 15,
  },
});
