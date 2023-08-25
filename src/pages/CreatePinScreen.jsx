import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";

export default function CreatePinScreen() {

  return (
    <View style={styles.container}>
      <Text>Create Pin</Text>
      <TextInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    flex: 1,
  },
  textColor: {
    color: "black",
  },
});
