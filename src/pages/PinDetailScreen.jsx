import react from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAppContext } from "../data/AppContext";

export default function PinDetailScreen({route}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Pin: {route.params?.pinId}</Text>
      <Text style={styles.textColor}>Detail 1</Text>
      <Text style={styles.textColor}>Detail 2</Text>
      <Text style={styles.textColor}>Detail 3</Text>
      <Text style={styles.textColor}>Detail 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
