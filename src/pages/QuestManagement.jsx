import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Image } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import { getQuestData } from "../data/Quest";
import BigButton from "../components/button/BigButton";
import BackButton from "../components/button/BackButton";
import Buttomsheet from "../components/Bottomsheet/Bottomsheet";
import ActivityName from "../components/Quest/ActivityName";
import { buttonBlue, buttonBrightGreen } from "../data/color";

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
    const fetchLocationData = async () => {
      try {
        const data = await getQuestData(route.params?.questId);
        setQuestData(data);
      } catch (error) {
        console.error("Error fetching quest", error);
      }
    };
    fetchLocationData();
  }, []);

  return (
    <Buttomsheet snapPoints={["20%", "60%", "90%"]} index={1}>
      <BackButton />
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image src={questData?.picturePath} style={styles.bannerImage} />
        </View>
        {questData && <ActivityName quest={questData} />}
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
    </Buttomsheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    flex: 1,
    gap: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
  },
  bannerContainer: {
    width: "100%",
    height: 200,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    // resizeMode: "contain"
  },
});
