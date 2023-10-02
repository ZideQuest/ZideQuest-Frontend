import { View, Text, StyleSheet } from "react-native";

const pallet = ["teal", "yellow", "red", "green", "blue", "lime", "cyan"];
const randomColor = () => {
  const n = Math.floor(Math.random() * pallet.length);
  return pallet[n];
};

export default function TagItem({ tag }) {
  return (
    <View style={[styles.singleTag, { backgroundColor: randomColor() }]}>
      <Text style={styles.tagText}>{tag.tagName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tagText: {
    color: "white",
    paddingHorizontal: 7,
    fontFamily: "Kanit400",
  },
  singleTag: {
    borderRadius: 15,
  },
});
