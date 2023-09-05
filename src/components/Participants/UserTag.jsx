import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { buttonGrey, buttonLightGrey } from "../../data/color";

export default function UserTag({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textInfo}>
        {user?.userId?.firstName} {user?.userId?.lastName}
      </Text>
      <View
        style={{
          width: 13,
          height: 13,
          backgroundColor: user?.status ? "green" : "red",
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: buttonGrey,
    padding: 10,
    borderRadius: 10,
  },
  textInfo: {
    fontSize: 15,
  },
});
