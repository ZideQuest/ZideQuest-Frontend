import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RecommendScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Recommened 1</Text>
      <Text>Recommened 2</Text>
      <Text>Recommened 3</Text>
      <Text>Recommened 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 30,
    padding: 30
  },
});
