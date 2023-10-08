import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { timeConv } from "../../data/time/time";
import person_icon from "../../../assets/images/participant.png";
import BackButton from "../button/BackButton";
import official_icon from "../../../assets/images/official_icon.png";

import { activityCategories } from "../../data/activityCategoty";

import { BGcolor, textColor } from "../../data/color";
import { statusIcon } from "../misc/Status";

export default function ActivityName({ quest }) {
  return (
    <View style={styles.DataCon}>
      <View style={styles.questItem}>
        <View style={[styles.questNameCon]}>
          <Text style={styles.questFont}>{quest?.questName}</Text>
          <BackButton />
        </View>
      </View>
      <View style={styles.infoText}>
        <View style={styles.timePlaceCon}>
          <Text style={styles.smallDetail}>{timeConv(quest?.timeStart)}</Text>
          <Text style={styles.smallDetail}>{timeConv(quest?.timeEnd)}</Text>
          <Text style={styles.locationText} numberOfLines={2}>
            ที่ {quest?.locationName.replace(/\n/g, " ")}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={styles.ParticipantFont}>
              {quest?.countParticipant}{" "}
              {quest?.maxParticipant ? `/ ${quest?.maxParticipant}` : ""}
            </Text>
            <Image source={person_icon} style={styles.pic} />
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: statusIcon(
                  quest?.countParticipant,
                  quest?.maxParticipant,
                  quest?.status
                ),
                borderRadius: 25,
              }}
            ></View>
          </View>
          <View style={styles.creatorCon}>
            <View>
              <Text style={styles.creatorText}>Created By</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={styles.creatorText}>{quest?.creatorName}</Text>
                <View style={styles.badgeIcon}>
                  <Image
                    source={official_icon}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
                <Text style={styles.badgeText}>Official</Text>
              </View>
            </View>
            <View style={styles.creatorPicCon}>
              <Image style={styles.picCreator} src={quest?.creatorPic}></Image>
            </View>
          </View>
        </View>
      </View>
      {quest.activityHour && (
        <Text style={{ fontFamily: "Kanit300" }}>
          {activityCategories[quest.activityHour?.category]}{" "}
          {quest.activityHour?.hour} ชั่วโมง
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  questItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    flex: 1,
  },
  questFont: {
    fontSize: 28,
    fontFamily: "Kanit300",
  },
  timePlaceCon: {
    backgroundColor: BGcolor,
    justifyContent: "center",
    flex: 1,
  },
  creatorCon: {
    backgroundColor: BGcolor,
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
    gap: 10,
  },
  creatorPicCon: {
    width: 40,
    aspectRatio: "1/1",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  picCreator: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  DataCon: {
    paddingTop: 5,
    backgroundColor: BGcolor,
    width: "100%",
  },
  ParticipantFont: {
    fontSize: 18,
    fontFamily: "Kanit300",
  },
  questNameCon: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pic: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  infoText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  smallDetail: {
    // fontSize: 16,
    fontFamily: "Kanit300",
    lineHeight: 20,
  },
  creatorText: {
    fontSize: 16,
    fontFamily: "Kanit300",
    color: textColor,
    textAlign: "right",
    lineHeight: 20,
  },
  locationText: {
    fontSize: 16,
    fontFamily: "Kanit400",
    lineHeight: 21,
  },
  badgeIcon: {
    width: 13,
    height: 13,
    marginLeft: 4,
    marginRight: 1,
  },
  badgeText: {
    fontFamily: "Kanit400",
    color: "teal",
  },
});
