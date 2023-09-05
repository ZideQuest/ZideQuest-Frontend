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

const MinimalCard = ({
  id,
  quest_name,
  quest_image,
  time,
  timeEnd,
  location,
  creator_picture,
  countParticipant,
  maxParticipant,
  isAdmin = false,
  token,
}) => {
  const date = time.slice(8, 10);
  const month = month_to_thai(time.slice(5, 7));
  const year = time.slice(0, 4);
  const formattedTime = time.slice(14, 19);
  const formattedTimeEnd = timeEnd.slice(14, 19);
  const questImageSource =
    quest_image !== "" ? { uri: quest_image } : defaultQuestImage;

  const creatorImageSource =
    creator_picture != "" ? { uri: creator_picture } : defaultCreatorImage;

  const questPressHandler = () => {
    if (isAdmin) {
      TabNavigation.navigate("QuestManage", { questId: id });
    } else if (token != null) {
      TabNavigation.navigate("QuestDetail", { questId: id });
    } else {
      alert("กรุณา login");
    }
  };

  return (
    <Pressable onPress={questPressHandler}>
      <View style={styles.CardContainer}>
        <Text style={styles.quest_name}>{quest_name}</Text>

        <View style={styles.row}>
          <View style={styles.row_inner}>
            <Image style={styles.userprofile} source={creatorImageSource} />
            <View style={styles.userdescription}>
              <Text style={styles.location}>สถานที่: {location}</Text>
              <View style={styles.participant}>
                <Text style={styles.par_font}>จำนวนผู้เข้าร่วม: </Text>
                <Text style={styles.par_font}>{countParticipant}</Text>
                <Text style={styles.par_font}> / </Text>
                <Text style={styles.par_font}>{maxParticipant}</Text>
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
  Card: { height: "50%" },
  Container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  CardContainer: {
    height: 300,
    marginTop: 20,
    elevation: 10,
    backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: "black",
    // borderRadius: 20,
  },
  quest_name: {
    color: "#E86A33",
    left: 12,
    top: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: "20%",
    // borderWidth: 2,
    // borderColor: "orange",
  },
  row_inner: {
    height: 60,
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  userdescription: {
    marginTop: 5,
    marginLeft: 5,
  },
  time_and_date: {
    marginTop: 5,
    textAlign: "right",
  },
  time: {
    textAlign: "right",
    color: "grey",
  },
  timeSE: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    textAlign: "right",
    color: "grey",
    fontWeight: "bold",
  },
  userprofile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  image_container: {
    marginLeft: 5,
    marginRight: 5,
    height: 190,
  },
  quest_image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    // borderWidth: 2,
    // borderColor: "blue",
  },
  participant: {
    flexDirection: "row",
  },
  par_font: {
    color: "grey",
  },
  location: {
    color: "grey",
    fontWeight: "bold",
  },
});

export default MinimalCard;
