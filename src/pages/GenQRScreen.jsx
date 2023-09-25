import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import { getQuestData, getQRCode } from "../data/Quest";
import BigButton from "../components/button/BigButton";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import ActivityName from "../components/Quest/ActivityName";
import {
  buttonBlue,
  buttonBrightGreen,
  buttonDarkRed,
  buttonGrey,
  primaryColor,
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
  const [QRData, setQRData] = useState(null);

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const data = await getQuestData(route.params?.questId);
        const qr = await getQRCode(route.params?.questId);
        setQuestData(data);
        setQRData(qr);
      } catch (error) {
        console.error("Error fetching quest", error);
      }
    };
    fetchQuestData();
  }, []);

  const backHandler = () => {
    TabNavigation.navigate("QuestManage", {
      questId: route.params.questId,
    });
  };

  return (
    <BottomsheetDynamic snapPoints={[]} index={0} hideBar={true}>
      <View style={styles.container}>
        <ActivityName quest={questData} />
        {QRData && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrText}>Check-in QR Code</Text>
            <Image
              source={{ uri: QRData.picturePath.url }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}
        <Text style={styles.detailText}>
          *หากใช้การ Check-in ผู้เข้าร่วมที่สแกน QR Code นี้ เท่านั้นจะรับสถานะ
          “Quest Complete” หลังจบกิจกรรมได้
        </Text>
        <View>
          <BigButton
            text="ย้อนกลับ"
            bg={primaryColor}
            color="white"
            onPress={backHandler}
          />
        </View>
      </View>
    </BottomsheetDynamic>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // padding: 15,
  },
  qrContainer: {
    width: "100%",
    aspectRatio: "1/1",
    position: "relative",
  },
  qrText: {
    position: "absolute",
    zIndex: 1,
    textAlign: "center",
    width: "100%",
    fontFamily: "Kanit600",
    fontSize: 20,
  },
  detailText: {
    textAlign: "center",
    fontFamily: "Kanit300",
    fontSize: 16,
    marginBottom: 13,
  },
});
