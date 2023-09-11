import { StyleSheet, Text, Button, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { LinearGradient } from "expo-linear-gradient";
import { buttonBlue, primaryColor } from "../data/color";

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
  };

  if (hasPermission === null) {
    return <Text>Requesting for Cammera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
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
  absoluteFillObject: {},
});
