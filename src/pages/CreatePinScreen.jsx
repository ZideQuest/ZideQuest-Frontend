import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import BigButton from "../components/button/BigButton";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import { primaryColor } from "../data/color";

export default function CreatePinScreen() {
  const { setNewMarker, newMarker, setFocusedPin } = useAppContext();

  const confirmHandler = () => {
    if (newMarker) {
      TabNavigation.navigate("PinCreateInfo");
    } else {
      alert("เลือกตำแหน่งก่อนครับ");
    }
  };

  const cancelHandler = () => {
    setNewMarker(null);
    setFocusedPin(null);
    TabNavigation.navigate("Recommend");
  };

  return (
    <BottomsheetDynamic snapPoints={[]} detached={true} hideBar={true}>
      <View style={styles.container}>
        <Text style={styles.headerText}>เลือกตำแหน่ง</Text>
        <View
          style={{ flexDirection: "row", gap: 20, backgroundColor: "white" }}
        >
          <BigButton
            text="ยกเลิก"
            bg="rgba(61, 61, 55, 0.28)"
            onPress={cancelHandler}
          />
          <BigButton
            text="ยืนยัน"
            bg={newMarker ? primaryColor : "rgba(61, 61, 55, 0.28)"}
            onPress={confirmHandler}
          />
        </View>
      </View>
    </BottomsheetDynamic>
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
    paddingTop: 5,
  },
  headerText: {
    fontFamily: "Kanit500",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
  },
});
