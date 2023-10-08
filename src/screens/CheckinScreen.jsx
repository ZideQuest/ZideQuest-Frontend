import { StyleSheet, Text, Button, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as TabNavigation from "../data/TabNavigation";
import { buttonOrange, textColor } from "../data/color";
import { userCheckin } from "../data/authen";

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
    const quest = data.split("/");
    const questId = quest[2];
    
    navigation.navigate("App");
    
    try {
      const res = await userCheckin(questId);
      TabNavigation.navigate("QuestDetail", { questId });
      alert(`เช็คอินกิจกรรม ${res.questName} สำเร็จ!`)
      
    } catch (error) {
      console.error(error);
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
        style={{ width: "100%", height: "100%" }}
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
