import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'


export default function Participant() {
  return (
    <View style={styles.container}>
      <Text>Participant 1</Text>
      <Text>Participant 2</Text>
      <Text>Participant 3</Text>
      <Text>Participant 4</Text>
      <Pressable style={[styles.button, {backgroundColor: "green"}]}>
        <Text>ยืนยัน Quest Complete</Text>
      </Pressable>
      <Pressable style={[styles.button, {backgroundColor: "cyan"}]}>
        <Text>สร้าง QR code check-in</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems: "center"
  },
  button: {
    width: "90%",
    margin: 5,
    padding: 5,
    alignItems: "center",
    borderRadius: 10
  },
});