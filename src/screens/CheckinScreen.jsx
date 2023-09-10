import { StyleSheet, Text, Button, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { buttonBlue, primaryColor } from "../data/color";

export default function CheckinScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["purple", "white"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <Button onPress={() => navigation.navigate("App")} title="กลับ" />
        <Text>ควรจะเปิดกล้องครับ</Text>
      </LinearGradient>
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
});
