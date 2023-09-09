import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import BigButton from "../components/button/BigButton";
import Buttomsheet from "../components/Bottomsheet/Bottomsheet";
import { primaryColor } from "../data/color";

export default function CreatePinScreen() {
  const { setNewMarker, newMarker } = useAppContext();

  const confirmHandler = () => {
    if (newMarker) {
      TabNavigation.navigate("PinCreateInfo");
    } else {
      alert("เลือกตำแหน่งก่อนครับ");
    }
  };

  const cancelHandler = () => {
    setNewMarker(null);
    TabNavigation.navigate("Recommend");
  };

  return (
    <Buttomsheet snapPoints={["14%"]} detached={true} hideBar={true}>
      <View style={styles.container}>
        <Text style={styles.headerText}>เลือกตำแหน่ง</Text>
        <View style={styles.buttonContainer}>
          <BigButton text="ยืนยัน" bg={primaryColor} onPress={confirmHandler} />
          <BigButton
            text="ยกเลิก"
            bg="rgba(61, 61, 55, 0.28)"
            onPress={cancelHandler}
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
    overflow: "hidden",
    borderRadius: 15,
    justifyContent: "center",
  },
  headerText: {
    fontWeight: 700,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
  },
});
