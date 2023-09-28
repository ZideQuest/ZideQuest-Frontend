import { View, Text, StyleSheet } from "react-native";
import TagItem from "./TagItem";

export default function Tag({ tags }) {
  return (
    <View style={styles.DataCon}>
      {tags &&
        tags.map((tag) => <TagItem tag={tag} key={`quest-tag-${tag._id}`} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  DataCon: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    justifyContent: "flex-end",
    flex: 1,
  },
});
