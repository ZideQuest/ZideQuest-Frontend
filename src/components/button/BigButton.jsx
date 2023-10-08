import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function BigButton({
  text,
  bg,
  onPress,
  disable,
  color = "white",
  pd = 12,
}) {
  return (
    <TouchableOpacity
      style={[styles.bigButton, { backgroundColor: bg, padding: pd }]}
      onPress={onPress}
      disabled={disable}
    >
      <Text style={[styles.bigButtonText, { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bigButton: {
    flex: 1,
    alignItems: "center",
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
