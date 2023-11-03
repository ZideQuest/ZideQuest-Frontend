import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import { timeConv } from "../../data/time/time";
import person_icon from "../../../assets/images/participant.png";
import BackButton from "../button/BackButton";
import official_icon from "../../../assets/images/official_icon.png";

import { activityCategories } from "../../data/activityCategory";

import { BGcolor, textColor } from "../../data/color";
import { statusIcon } from "../misc/Status";

export default function ActivityName({
  quest,
  backButtonRoute,
  showGain = true,
}) {
  const locationPressHandler = () => {
    TabNavigation.navigate("PinDetail", { pinId: quest.locationId });
  };

  return (
    <View style={styles.DataCon}>
      <View style={styles.questItem}>
        <View style={[styles.questNameCon]}>
          <Text style={styles.questFont}>{quest?.questName}</Text>
          <View style={{marginTop: 13}}>
            {backButtonRoute ? (
              <BackButton
                targetRoute={backButtonRoute.targetRoute}
                params={backButtonRoute.params}
                resetFocus={backButtonRoute.resetFocus}
              />
            ) : (
              <BackButton
                targetRoute="PinDetail"
                params={{ pinId: quest?.locationId }}
                resetFocus={false}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.infoText}>
        <View style={styles.timePlaceCon}>
          <Text style={styles.smallDetail}>{timeConv(quest?.timeStart)}</Text>
          <Text style={styles.smallDetail}>{timeConv(quest?.timeEnd)}</Text>
          <TouchableOpacity onPress={locationPressHandler}>
            <Text style={styles.locationText} numberOfLines={2}>
              ที่ {quest?.locationName.replace(/\n/g, " ")}
            </Text>
          </TouchableOpacity>
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
                  quest?.status,
                  quest?.timeStart,
                  quest?.timeEnd
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
                {/* <View style={styles.badgeIcon}>
                  <Image
                    source={official_icon}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View> */}
                {/* <Text style={styles.badgeText}>Official</Text> */}
              </View>
            </View>
            <View style={styles.creatorPicCon}>
              <Image style={styles.picCreator} src={quest?.creatorPic}></Image>
            </View>
          </View>
        </View>
      </View>
      {showGain && (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "Kanit400" }}>จะได้รับ</Text>
          <View style={{ marginLeft: 7 }}>
            {quest?.activityHour.category && (
              <Text style={{ fontFamily: "Kanit400" }}>
                {"\u25B8"} {activityCategories[quest.activityHour?.category]}{" "}
                {quest.activityHour?.hour} ชั่วโมง
              </Text>
            )}
            <Text style={{ fontFamily: "Kanit400" }}>
              {"\u25B8"} {quest?.xpGiven} EXP
            </Text>
          </View>
        </View>
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

    borderRadius: 30,
    backgroundColor: "white",
  },
  picCreator: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  DataCon: {
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
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  pic: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  infoText: {
    // width: "100%",
    flex: 1,
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
    flexWrap: "wrap",
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
