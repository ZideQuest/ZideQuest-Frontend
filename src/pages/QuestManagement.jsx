import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import { getQuestData, sendQuestComplete } from "../data/Quest";
import BigButton from "../components/button/BigButton";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import ActivityName from "../components/Quest/ActivityName";
import {
  buttonBlue,
  buttonBrightGreen,
  buttonDarkRed,
  buttonGrey,
} from "../data/color";
import Participants from "../components/Participants/Participants";
import Alert from "../components/misc/Alert";

const showConfirmDialog = (title, description) => {
  return Alert(title, description, [
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

  const questCompleteHandler = async () => {
    if (questData.status) {
      return;
    } else if (
      await Alert(
        "Confirm Quest completed",
        "Are you sure you want to end this quest?"
      )
    ) {
      const data = await sendQuestComplete(route.params.questId);
      alert("ยืนยันสำเร็จ");
      setQuestData((prev) => ({ ...prev, status: true }));
    }
  };

  const GenQRHandler = async () => {
    if (questData.status) {
      return;
    } else if (
      await Alert(
        "สร้าง QR code",
        "ต้องการแสดง QR Code สำหรับ Check-in หรือไม่"
      )
    ) {
      TabNavigation.navigate("GenQRScreen", { questId: route.params?.questId });
    }
  };

  const editQuestButtonHandler = async () => {
    TabNavigation.navigate("EditQuest", { questId: route.params.questId });
  };

  return (
    <BottomsheetDynamic snapPoints={["20%"]} index={1} hideBar={true}>
      <View style={styles.container}>
        {questData?.picturePath && (
          <View style={styles.bannerContainer}>
            <Image src={questData?.picturePath} style={styles.bannerImage} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <ActivityName quest={questData} />
          <TouchableOpacity onPress={editQuestButtonHandler}>
            <Text>แก้ไขข้อมูลเควส</Text>
          </TouchableOpacity>
          <Participants questId={route.params.questId} />
          <View style={styles.buttonContainer}>
            <BigButton
              text="ยืนยัน Quest Completed"
              bg={questData?.status ? buttonGrey : buttonBrightGreen}
              color={questData?.status ? "grey" : "white"}
              onPress={questCompleteHandler}
            />
          </View>
          <View style={styles.buttonContainer}>
            <BigButton
              text="สร้าง Check-in QR Code"
              bg={questData?.status ? buttonGrey : buttonBlue}
              color={questData?.status ? "grey" : "white"}
              onPress={GenQRHandler}
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
