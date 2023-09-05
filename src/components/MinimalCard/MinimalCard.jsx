import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import defaultCreatorImage from "../../../assets/images/UserProfileTest.jpg";
import defaultQuestImage from "../../../assets/images/defaultQuestLocationImage.jpg";
import * as TabNavigation from "../../data/TabNavigation";
import { useAppContext } from "../../data/AppContext";
import { buttonOrange, textColor } from "../../data/color";

function month_to_thai(datestring) {
  switch (datestring) {
    case "01":
      return "ม.ค.";
      break;
    case "02":
      return "ก.พ.";
      break;
    case "03":
      return "มี.ค.";
      break;
    case "04":
      return "เม.ย.";
      break;
    case "05":
      return "พ.ค.";
      break;
    case "06":
      return "มิ.ย.";
      break;
    case "07":
      return "ก.ค.";
      break;
    case "08":
      return "ส.ค.";
      break;
    case "09":
      return "ก.ย.";
      break;
    case "10":
      return "ต.ค.";
      break;
    case "11":
      return "พ.ย.";
      break;
    case "12":
      return "ธ.ค.";
      break;
  }
}

const MinimalCard = ({ quest }) => {
  const { userDetail, mapMoveTo } = useAppContext();
  const {
    questName,
    picturePath,
    timeStart,
    timeEnd,
    locationId,
    creatorId,
    countParticipant,
    maxParticipant,
  } = quest;

  const date = timeStart.slice(8, 10);
  const month = month_to_thai(timeStart.slice(5, 7));
  const year = timeStart.slice(0, 4);
  const formattedTime = timeStart.slice(14, 19);
  const formattedTimeEnd = timeEnd.slice(14, 19);

  const questImageSource =
    picturePath !== "" ? { uri: picturePath } : defaultQuestImage;

  const creatorImageSource =
    creatorId.picturePath != ""
      ? { uri: creatorId.picturePath }
      : defaultCreatorImage;

  const questPressHandler = () => {
    mapMoveTo(locationId.latitude, locationId.longitude);

    if (userDetail.isAdmin) {
      TabNavigation.navigate("QuestManage", { questId: quest._id });
    } else if (userDetail.token != null) {
      TabNavigation.navigate("QuestDetail", { questId: quest._id });
    } else {
      alert("กรุณา login");
    }
  };

  return (
    <Pressable onPress={questPressHandler}>
      <View style={styles.CardContainer}>
        <Text style={styles.quest_name}>{questName}</Text>
        <View style={styles.row}>
          <View style={styles.row_inner}>
            <Image style={styles.userprofile} source={creatorImageSource} />
            <View style={styles.userdescription}>
              <Text style={{ fontFamily: "Kanit400" }}>
                สถานที่: {locationId.locationName}
              </Text>
              <View style={styles.participant}>
                <Text style={styles.par_font}>
                  จำนวนผู้เข้าร่วม: {countParticipant} / {maxParticipant}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.time_and_date}>
            <Text style={styles.date}>
              {date} {month} {year}
            </Text>
            <View style={styles.timeSE}>
              <Text style={styles.time}>{formattedTime}</Text>
              <Text style={styles.time}>-</Text>
              <Text style={styles.time}>{formattedTimeEnd}</Text>
            </View>
          </View>
        </View>
        <View style={styles.image_container}>
          <Image style={styles.quest_image} source={questImageSource} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 7,
  },
  quest_name: {
    color: buttonOrange,
    fontSize: 27,
    fontFamily: "Kanit400",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  row_inner: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  userdescription: {
    justifyContent: "center",
  },
  time_and_date: {
    justifyContent: "center",
  },
  time: {
    color: textColor,
    fontFamily: "Kanit300",
  },
  timeSE: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: textColor,
    fontWeight: "bold",
    fontFamily: "Kanit300",
  },
  userprofile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  image_container: {
    width: "100%",
    height: 180,
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 7,
  },
  quest_image: {
    width: "100%",
    height: "100%",
  },
  participant: {
    flexDirection: "row",
  },
  par_font: {
    color: textColor,
    fontFamily: "Kanit400",
  },
  location: {
    color: "grey",
    fontWeight: "bold",
  },
});

export default MinimalCard;
