import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import ProfilePic from "../../../assets/images/Jitat.jpg";
import goBackPic from "../../../assets/images/back-button.png";
import * as Progress from "react-native-progress";
import {
  buttonGrey,
  progressBarGreen,
  buttonLightGrey,
} from "../../data/color";
import { Divider } from "@rneui/themed";
import { useAppContext } from "../../data/AppContext";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function Profile({ navigation }) {
  const { userDetail } = useAppContext();
  console.log(userDetail.user.activityTranscript);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        onPress={() => TabNavigation.navigate("Recommend")}
        style={styles.exit}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 5 }}
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

            <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>
              {userDetail.user.firstName} {userDetail.user.lastName}
            </Text>
          </View>

          {/* Progress Bar */}

          {/* Header and Quest Button */}
          <View
            style={{
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
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginRight: 116 }}
              >
                PROGRESS
              </Text>

              {/* Quest Button */}
              <Pressable
                onPress={() => navigation.navigate("Quests")}
                style={styles.exit}
              >
                <Text style={styles.quest_button}>Quests</Text>
              </Pressable>
            </View>
            {/* Main Progress */}
            <Text>1. กิจกรรมหาลัย</Text>
            <Progress.Bar
              progress={
                userDetail.user.activityTranscript.category.university.hour / 10
              }
              width={300}
              height={10}
              color={progressBarGreen}
            />
            <Text>2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Text>
            <Progress.Bar
              progress={
                userDetail.user.activityTranscript.category.empowerment.hour /
                10
              }
              width={300}
              height={10}
              color={progressBarGreen}
            />
            <Text>2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Text>
            <Progress.Bar
              progress={
                userDetail.user.activityTranscript.category.empowerment.category
                  .morality.hour / 10
              }
              width={300}
              height={10}
              color={progressBarGreen}
            />
            <Text>2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Text>
            <Progress.Bar
              progress={
                userDetail.user.activityTranscript.category.empowerment.category
                  .thinking.hour / 10
              }
              width={300}
              height={10}
              color={progressBarGreen}
            />
            <Text>2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Text>
            <Progress.Bar
              progress={
                userDetail.user.activityTranscript.category.empowerment.category
                  .relation.hour / 10
              }
              width={300}
              height={10}
              color={progressBarGreen}
            />
            <Text>2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Text>
            <Progress.Bar
              progress={
                userDetail.user.activityTranscript.category.empowerment.category
                  .health.hour / 10
              }
              width={300}
              height={10}
              color={progressBarGreen}
            />
            <Text>3.กิจกรรมเพื่อสังคม</Text>
            <Progress.Bar
              progress={
                userDetail.user.activityTranscript.category.society.hour / 10
              }
              width={300}
              height={10}
              color={progressBarGreen}
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  exit: {
    padding: 5,
  },
  progress_container: {
    margin: 10,
    padding: 10,
    paddingBottom: 30,
    borderRadius: 5,
    backgroundColor: buttonGrey,
  },
  badges_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft: 30,
  },
  badge: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 5,
  },
  quest_button: {
    backgroundColor: "#e8e7e6",
    borderRadius: 20,
    padding: 5,
    width: 100,
    textAlign: "center",
  },
});
