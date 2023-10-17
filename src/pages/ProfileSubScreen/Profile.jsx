import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import ProfilePic from "../../../assets/images/user_icon.png";
import goBackPic from "../../../assets/images/leave_icon.png";
import * as Progress from "react-native-progress";
import {
  buttonGrey,
  progressBarGreen,
  buttonLightGrey,
  primaryColor,
  progressBarLightGreen,
  textColor,
} from "../../data/color";
import { Divider } from "@rneui/themed";
import { useAppContext } from "../../data/AppContext";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function Profile({ navigation }) {
  const { userDetail } = useAppContext();
  // console.log(userDetail.user.activityTranscript.category.empowerment.category);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        onPress={() => TabNavigation.navigate("Recommend")}
        style={styles.exit}
      >
        <Image
          style={{ width: 24, height: 24, borderRadius: 5 }}
          source={goBackPic}
        />
      </Pressable>
      <BottomSheetScrollView>
        <View style={styles.profileCard}>
          {/* Exit Button */}

          {/* Profile and Username */}
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 220,
                height: 220,
                borderRadius: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              source={
                userDetail.user.picturePath
                  ? { uri: userDetail.user.picturePath }
                  : ProfilePic
              }
            />

            <Text
              style={{
                fontSize: 30,
                marginTop: 20,
                fontFamily: "Kanit400",
              }}
            >
              {userDetail.user.firstName} {userDetail.user.lastName}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: buttonLightGrey,
              borderRadius: 10,
              paddingHorizontal: 18,
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text_detail_small}>
                nisitID: {userDetail.user.nisitId}
              </Text>
            </View>
            <Text style={styles.text_detail_small}>
              Faculty: {userDetail.user.faculty}
            </Text>
            <View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Kanit400",
                      fontSize: 15,
                    }}
                  >
                    Level{" "}
                    <Text style={{ color: "teal" }}>
                      {userDetail?.user?.level}
                    </Text>
                  </Text>
                  <Text style={{ fontFamily: "Kanit300" }}>
                    EXP : {userDetail.user?.xpNow} / {userDetail.user?.maxXp}
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "lightgreen",
                    height: 6,
                  }}
                >
                  <Progress.Bar
                    width={null}
                    height={6}
                    borderRadius={0}
                    borderWidth={0}
                    color="green"
                    progress={userDetail.user?.xpPercentage}
                    style={{ justifyContent: "flex-start" }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Progress Bar */}

          {/* Header and Quest Button */}
          <View
            style={{
              marginTop: 7,
              gap: 5,
              backgroundColor: buttonLightGrey,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Kanit400",
                  fontSize: 23,
                  color: textColor,
                }}
              >
                PROGRESS
              </Text>

              <Pressable
                onPress={() => navigation.navigate("Quests")}
                style={styles.exit}
              >
                <Text style={styles.quest_button}>My Quests</Text>
              </Pressable>
            </View>
            <Text style={styles.text_small}>
              1. กิจกรรมหาลัย (
              {userDetail.user.activityTranscript.category.university.hour}/10)
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: progressBarLightGreen,
                height: 8,
              }}
            >
              <Progress.Bar
                progress={
                  userDetail.user.activityTranscript.category.university.hour /
                  10
                }
                borderRadius={0}
                borderWidth={0}
                width={null}
                height={8}
                color={progressBarGreen}
              />
            </View>
            <Text style={styles.text_small}>
              2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ
            </Text>
            <Divider></Divider>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text_soSmall}>
                2.1 ด้านพัฒนาคุณธรรมจริยธรรม (
                {
                  userDetail.user.activityTranscript.category.empowerment
                    .category.morality.hour
                }
                /10)
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: progressBarLightGreen,
                  height: 8,
                }}
              >
                <Progress.Bar
                  progress={
                    userDetail.user.activityTranscript.category.empowerment
                      .category.morality.hour / 10
                  }
                  borderRadius={0}
                  borderWidth={0}
                  width={null}
                  height={8}
                  color={progressBarGreen}
                />
              </View>
              <Text style={styles.text_soSmall}>
                2.2 ด้านพัฒนาทักษะการคิดและการเรียนรู้ (
                {
                  userDetail.user.activityTranscript.category.empowerment
                    .category.thingking.hour
                }
                /10)
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: progressBarLightGreen,
                  height: 8,
                }}
              >
                <Progress.Bar
                  progress={
                    userDetail.user.activityTranscript.category.empowerment
                      .category.thingking.hour / 10
                  }
                  borderRadius={0}
                  borderWidth={0}
                  width={280}
                  height={8}
                  color={progressBarGreen}
                />
              </View>
              <Text style={styles.text_soSmall}>
                2.3 ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล (
                {
                  userDetail.user.activityTranscript.category.empowerment
                    .category.relation.hour
                }
                /10)
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: progressBarLightGreen,
                  height: 8,
                }}
              >
                <Progress.Bar
                  progress={
                    userDetail.user.activityTranscript.category.empowerment
                      .category.relation.hour / 10
                  }
                  borderRadius={0}
                  borderWidth={0}
                  width={280}
                  height={8}
                  color={progressBarGreen}
                />
              </View>
              <Text style={styles.text_soSmall}>
                2.4 ด้านพัฒนาสุขภาพ (
                {
                  userDetail.user.activityTranscript.category.empowerment
                    .category.health.hour
                }
                /10)
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: progressBarLightGreen,
                  height: 8,
                }}
              >
                <Progress.Bar
                  progress={
                    userDetail.user.activityTranscript.category.empowerment
                      .category.health.hour / 10
                  }
                  borderRadius={0}
                  borderWidth={0}
                  width={280}
                  height={8}
                  color={progressBarGreen}
                />
              </View>
            </View>
            <Text style={styles.text_small}>
              3.กิจกรรมเพื่อสังคม (
              {userDetail.user.activityTranscript.category.society.hour}
              /10)
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: progressBarLightGreen,
                height: 8,
              }}
            >
              <Progress.Bar
                progress={
                  userDetail.user.activityTranscript.category.society.hour / 10
                }
                borderRadius={0}
                borderWidth={0}
                width={null}
                height={8}
                // color="lime"
                color={progressBarGreen}
              />
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text_large: {
    fontFamily: "Kanit600",
  },
  text_small: {
    fontFamily: "Kanit400",
  },
  text_soSmall: {
    fontFamily: "Kanit300",
  },
  profileCard: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  exit: {
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: "transparent"
  },
  quest_button: {
    backgroundColor: "#d4d4d4",
    borderRadius: 10,
    paddingHorizontal: 7,
    overflow: "hidden",
    textAlign: "center",
    fontFamily: "Kanit300",
  },
  text_detail_small: {
    fontFamily: "Kanit400",
    fontSize: 15,
    lineHeight: 19,
  },
});
