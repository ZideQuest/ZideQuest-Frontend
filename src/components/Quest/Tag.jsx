import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { BGcolor, textColor } from "../../data/color";

const pallet = ["teal", "yellow", "red", "green", "blue", "lime", "cyan"];
const randomColor = () => {
  const n = Math.floor(Math.random() * pallet.length);
  return pallet[n];
};

export default function Tag({ tags }) {
  return (
    <View style={styles.DataCon}>
      {tags &&
        tags.map((tag, index) => (
          <View
            style={[styles.singleTag, { backgroundColor: randomColor() }]}
            key={index}
          >
            <Text style={styles.tagText}>{tag.tagName}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tagText: {
    color: "white",
    paddingHorizontal: 7,
    fontFamily: "Kanit400",
  },
  tagCon: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
  },
  singleTag: {
    borderRadius: 15,
  },
  DataCon: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    justifyContent: "flex-end",
    flex: 1,
  },
});
