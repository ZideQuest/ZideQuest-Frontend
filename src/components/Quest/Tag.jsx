import { View, Text, StyleSheet } from "react-native";
import TagItem from "./TagItem";

export default function Tag({ tags, justifyStart }) {
  return (
    <View
      style={[
        styles.DataCon,
        { justifyContent: justifyStart ? "flex-start" : "flex-end" },
      ]}
    >
      {tags &&
        tags.map((tag) => <TagItem tag={tag} key={`quest-tag-${tag._id}`} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  DataCon: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 5,
    columnGap: 5,
    justifyContent: "flex-end",
    flex: 1,
  },
});
