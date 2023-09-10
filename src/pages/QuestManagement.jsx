import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Image } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import { getQuestData } from "../data/Quest";
import BigButton from "../components/button/BigButton";
import BackButton from "../components/button/BackButton";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import ActivityName from "../components/Quest/ActivityName";
import { buttonBlue, buttonBrightGreen } from "../data/color";
import Participants from "../components/Participants/Participants";

const showConfirmDialog = (title, description) => {
  return Alert.alert(title, description, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};

export default function QuestManagement({ route }) {
  const [questData, setQuestData] = useState(null);

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const data = await getQuestData(route.params?.questId);
        setQuestData(data);
      } catch (error) {
        console.error("Error fetching quest", error);
      }
    };
    fetchQuestData();
  }, []);

  return (
    <BottomsheetDynamic
      snapPoints={["20%"]}
      index={0}
      hideBar={true}
    >
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image src={questData?.picturePath} style={styles.bannerImage} />
        </View>
        <View style={styles.infoContainer}>
          <ActivityName quest={questData} />
          <Participants questId={route.params.questId} />
          <View style={styles.buttonContainer}>
            <BigButton
              text="ยืนยัน Quest Completed"
              bg={buttonBrightGreen}
              onPress={() =>
                showConfirmDialog(
                  "Confirm Quest completed",
                  "Are you sure you want to end this quest?"
                )
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <BigButton
              text="สร้าง Check-in QR Code"
              bg={buttonBlue}
              onPress={() =>
                showConfirmDialog(
                  "Confirm Quest completed",
                  "Are you sure you want to end this quest?"
                )
              }
            />
          </View>
        </View>
      </View>
    </BottomsheetDynamic>
  );
}

const styles = StyleSheet.create({
  container: {},
  infoContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
  },
  bannerContainer: {
    width: "100%",
    height: 240,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
