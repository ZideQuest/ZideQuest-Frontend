import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { timeConv } from "../../data/time/time";
import person_icon from "../../../assets/images/participant.png";

import { BGcolor, textColor } from "../../data/color";

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

export default function ActivityName({ quest }) {
  return (
    <View style={styles.DataCon}>
      <View style={[styles.questItem]}>
        <Text style={styles.questFont}>{quest.questName}</Text>
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
              backgroundColor: statusIcon(
                quest.countParticipant,
                quest.maxParticipant
              ),
              borderRadius: 25,
            }}
          ></View>
        </View>
      </View>
      <View style={styles.DataCon}>
        <View style={styles.timePlaceCon}>
          <Text style={{ color: textColor, fontSize: 16}}>
            {timeConv(quest.timeStart)}{'\n'}{timeConv(quest.timeEnd)}{'\n'}{quest.locationName}
          </Text>
        </View>
        <View style={styles.creatorCon}>
          <Text style={{ color: textColor, fontSize: 20, fontWeight: "bold" }}>
            {quest.creatorName}
          </Text>
        </View>
        <View style={styles.creatorPicCon}>
          <Text style={{ color: textColor, fontSize: 20, fontWeight: "bold" }}>
            รูปหน่วยงาน
          </Text>
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
  pic: {
    width: 20,
    height: 20,
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
    justifyContent: "center",
    alignItems: "flex-end",
    aspectRatio: 1 / 1,
  },

  DataCon: {
    backgroundColor: BGcolor,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    justifyContent: "center",
  },
  ParticipantFont: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
});
