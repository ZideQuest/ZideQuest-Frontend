import { StyleSheet, Text, Button, View, Linking } from "react-native";
import React, { useEffect, useState, navigation } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { LinearGradient } from "expo-linear-gradient";
import { buttonBlue, primaryColor } from "../data/color";
import * as TabNavigation from "../data/TabNavigation";
import { buttonOrange, textColor } from "../data/color";
import { BASE_URL } from "../data/backend_url";

export default function CheckinScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data.startsWith("http://") || data.startsWith("https://")) {
      alert(`Please scan only Zidequest QR CODE`);
    } else {
      const fixedDomain = BASE_URL;
      const fullURL = fixedDomain + data;

      alert(
        `Barcode with type ${type} and data ${Linking.openURL(
          fullURL
        )} has been scanned`
      );
    }
  };
  const requestCameraPermissionAgain = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
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
          onPress={requestCameraPermissionAgain}
          color={buttonOrange}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  Access_text: {
    fontSize: 20,
    fontFamily: "Kanit400",
  },
});
