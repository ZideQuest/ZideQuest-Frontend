import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import BigButton from "../components/button/BigButton";
import Buttomsheet from "../components/Bottomsheet/Bottomsheet";

export default function CreatePinScreen() {
  const { setNewMarker } = useAppContext();

  const confirmHandler = () => {
    TabNavigation.navigate("PinCreateInfo");
  };

  const cancelHandler = () => {
    setNewMarker(null);
    TabNavigation.navigate("Recommend");
  };

  return (
    <Buttomsheet snapPoints={["15%"]} detached={true}>
      <View style={styles.container}>
        <Text style={styles.headerText}>เลือกตำแหน่ง</Text>
        <View style={styles.buttonContainer}>
          <BigButton text="ยืนยัน" bg="#E86A33" onPress={confirmHandler} />
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
