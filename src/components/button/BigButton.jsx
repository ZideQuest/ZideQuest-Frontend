import { View, Text, StyleSheet, Pressable } from "react-native";

export default function BigButton({ text, bg , onPress}) {
  return (
    <Pressable style={[styles.bigButton, { backgroundColor: bg }]} onPress={onPress}>
      <Text style={styles.bigButtonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bigButton: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    overflow: "hidden",
    // height: 45,
    justifyContent: "center",
  },
  bigButtonText: {
    fontSize: 17,
    color: "white",
    fontFamily: "Kanit600",
  },
});
