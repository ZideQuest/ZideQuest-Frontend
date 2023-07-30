import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RecommendScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Recommened 1</Text>
      <Text>Recommened 2</Text>
      <Text>Recommened 3</Text>
      <Text>Recommened 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    flex: 1,
  },
  textColor: {
    color: "black"
  }
});
