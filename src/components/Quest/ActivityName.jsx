import React ,{ useState}from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {timeConv} from "../../data/time/time";
import person_icon from "../../../assets/images/participant.png";

BGcolor = '#FDFEFE';
textColor = 'black';

function statusIcon (currentP, maxP) {
  const ratio = currentP/maxP;
  if (ratio >= 1) {
    return "red"
  }
  if (ratio > 0.8) {
    return "yellow"
  }
  return "green"
}

export default function ActivityName({quest}) {
  return (
    <View style={styles.DataCon}>
      <View style={[styles.questItem]}>
        <View style={[styles.questNameCon]}>
          <Text style={styles.questFont}>{quest.questName}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={styles.ParticipantFont}>
            {quest.countParticipant}/{quest.maxParticipant}
          </Text>
          <View style={styles.pic}>
            <Image source={person_icon} />
          </View>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: statusIcon(quest.countParticipant, quest.maxParticipant),
              borderRadius: 25,
            }}
          ></View>
        </View>
      </View>
      <View style={styles.DataCon}>
        <View style={styles.timePlaceCon}>
          <Text style={{ color: textcolor, fontSize: 16}}>
            {timeConv(quest.timeStart)}{'\n'}{timeConv(quest.timeEnd)}{'\n'}{quest.locationName}
          </Text>
        </View>
        <View style={styles.creatorCon}>
            <Text style={{ color: textcolor, fontSize: 20, fontWeight: 'bold', }}>{quest.creatorName}</Text>
        </View>
        <View style={styles.creatorPicCon}>
          <Image
            style={styles.picCreator}
            source={{
              uri: quest.creatorPic,
              }}
          ></Image>
        </View>
      </View>
    </View>
    

  );
}

const styles = StyleSheet.create({
  questItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 5,
    // borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
  picCreator: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  questFont: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  timePlaceCon: {
    flexDirection: "row",
    backgroundColor: BGcolor,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  creatorCon: {
    backgroundColor: BGcolor,
    width: "29%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  creatorPicCon: {
    backgroundColor: BGcolor,
    width: "20%",
    aspectRatio: 1 / 1,
  },
  
  DataCon: {
    backgroundColor: BGcolor,
    width: "100%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 3,
    columnGap: 10,
    justifyContent: "center",
  },
  ParticipantFont: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
  questNameCon: {
    width: "70%",
  },
  pic: {
    width: 20,
    height: 20,
    // backgroundColor: "red"
    resizeMode: "contain",
  },
});
