import React from "react";
import {View, Text, StyleSheet, TextInput, Button} from "react-native"

import * as TabNavigation from "../data/TabNavigation";

export default function CreatePinScreen() {
  return (
    <View style={styles.container}>
      {TabNavigation.currentScreen() == "CreatePin" && (
        <View style={styles.mapCondition}>
          <Text style={styles.mapConditionText}>เลือกสถานที่เพื่อปักหมุด</Text>
          <Button title="ปิด" onPress={() => TabNavigation.navigate("Recommend")} />
        </View>
      )}
      <Text>Create Pin</Text>
      <TextInput/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    flex: 1,
  },
  textColor: {
    color: "black"
  },
  mapCondition: {
    position: "absolute",
    width: "100%",
    zIndex: 3,
    top: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  mapConditionText: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});