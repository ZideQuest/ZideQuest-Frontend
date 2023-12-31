import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import defaultCreatorImage from "../../../assets/images/UserProfileTest.jpg";
import defaultQuestImage from "../../../assets/images/defaultQuestLocationImage.jpg";
import * as TabNavigation from "../../data/TabNavigation";
import { useAppContext } from "../../data/AppContext";
import { buttonGrey, buttonOrange, textColor } from "../../data/color";
import Tag from "../Quest/Tag";
import { activityCategories } from "../../data/activityCategory";
import { timeConvMini, timeConv } from "../../data/time/time";

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
  const { userDetail, mapMoveTo, setFocusedPin } = useAppContext();
  const {
    questName,
    picturePath,
    timeStart,
    timeEnd,
    locationId,
    creatorId,
    countParticipant,
    maxParticipant,
    activityHour,
    tagId,
    description,
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
    if (userDetail.isAdmin) {
      mapMoveTo(locationId.latitude, locationId.longitude);
      setFocusedPin(locationId._id);
      TabNavigation.navigate("QuestManage", {
        questId: quest._id,
        fromScreen: "Recommend",
        resetFocus: true,
      });
    } else if (userDetail.token != null) {
      mapMoveTo(locationId.latitude, locationId.longitude);
      setFocusedPin(locationId._id);
      TabNavigation.navigate("QuestDetail", {
        questId: quest._id,
        fromScreen: "Recommend",
        resetFocus: true,
      });
    } else {
      alert("กรุณา login");
    }
  };

  return (
    <TouchableOpacity onPress={questPressHandler} activeOpacity={0.6}>
      <View style={styles.CardContainer}>
        <Text style={styles.quest_name}>{questName}</Text>
        <View style={styles.row}>
          <View style={styles.row_inner}>
            <View style={styles.userprofileContainer}>
              <Image style={styles.userprofile} source={creatorImageSource} />
            </View>
            <View style={styles.userdescription}>
              <Text style={{ fontFamily: "Kanit400" }} numberOfLines={2}>
                สถานที่: {locationId.locationName.replace(/\n/g, " ")}
              </Text>
              <View style={styles.participant}>
                <Text style={styles.par_font}>
                  จำนวนผู้เข้าร่วม: {countParticipant}{" "}
                  {maxParticipant ? `/ ${maxParticipant}` : ""}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.time_and_date}>
            <Text style={styles.date}>
              {date} {month} {year}
            </Text>
            <View style={styles.timeSE}>
              <Text style={styles.time}>{timeConvMini(quest?.timeStart)}</Text>
              <Text style={styles.time}>-</Text>
              <Text style={styles.time}>{timeConvMini(quest?.timeEnd)}</Text>
            </View>
          </View>
        </View>
        {picturePath && (
          <View style={styles.image_container}>
            <Image style={styles.quest_image} source={questImageSource} />
          </View>
        )}
        <View style={{ marginTop: 5, marginLeft: 5 }}>
          {tagId.length != 0 && (
            <View style={{ marginVertical: 4 }}>
              <Tag tags={tagId} justifyStart />
            </View>
          )}
          {activityHour && (
            <Text style={{ fontFamily: "Kanit300" }}>
              ได้รับชั่วโมง{" "}
              <Text style={{ fontFamily: "Kanit400" }}>
                {activityCategories[activityHour.category]} {activityHour.hour}{" "}
                ชั่วโมง
              </Text>
            </Text>
          )}
          {/* {description ? (
            <Text
              style={{
                fontFamily: "Kanit300",
                color: textColor,
                // paddingLeft: 10,
              }}
            >
              {description}
            </Text>
          ) : (
            <Text style={{ fontFamily: "Kanit300", color: "grey" }}>
              ไม่มีรายละเอียด...
            </Text>
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
    marginBottom: 7,
  },
  quest_name: {
    color: textColor,
    fontSize: 24,
    fontFamily: "Kanit400",
    paddingLeft: 10,
    paddingTop: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  row_inner: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  userdescription: {
    justifyContent: "center",
    flex: 1,
  },
  time_and_date: {
    justifyContent: "flex-start",
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
  userprofileContainer: {
    backgroundColor: "lightgray",
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userprofile: {
    width: "100%",
    height: "100%",
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
