import React from "react";
import {View, Text, StyleSheet, TextInput} from "react-native"

export default function CreatePinScreen() {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <TextInput/>
    </View>
  )
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
    color: "black"
  }
});