import { StyleSheet, Text, Button, View, Linking, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as TabNavigation from "../data/TabNavigation";
import { buttonOrange, textColor } from "../data/color";
import { userCheckin } from "../data/authen";
import { startsWith } from "lodash";

export default function CheckinScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    setScanned(true);
    if (data.startsWith(`https://`) || data.startsWith(`http://`)) {
      alert(`กรุณาแสกน QR Code ของ Zidequest เท่านั้น`);
      setScanned(false);
    } else {
      navigation.navigate("App");
      const quest = data.split("/");
      const questId = quest[2];
      console.log(questId);
      try {
        const res = await userCheckin(questId);
        TabNavigation.navigate("QuestDetail", { questId });

        Alert.alert(`เช็คอินกิจกรรม ${res.questName} สำเร็จ!`);
      } catch (error) {
        console.log(error);
        if (error.response.status === 444) {
          Alert.alert(
            "กิจกรรมที่คุณกำลังจะเข้าร่วมนั้นมีผู้เข้าร่วมเต็มจำนวนแล้ว"
          );
        } else if (error.response.status === 400) {
          Alert.alert("ไม่มีกิจกรรมนี้ในระบบ");
        } else if (
          error.response.status === 428 ||
          error.response.status === 430
        ) {
          Alert.alert("กิจกรรมนี้ได้สิ้นสุดไปแล้ว");
        }
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.Access_text}>No Access to Camera</Text>
        <Button
          title="Request permission again"
          onPress={requestCameraPermission}
          color={buttonOrange}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.qrbox}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },
  qrbox: {
    width: "100%",
    height: "100%",
  },
  // linearGradient: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flex: 1,
  //   width: "100%",
  // },
  // Access_text: {
  //   fontSize: 20,
  //   fontFamily: "Kanit400",
  // },
});
