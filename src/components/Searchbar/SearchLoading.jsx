import { View, Text, StyleSheet } from "react-native";
import { textColor } from "../../data/color";

export default function SearchLoading({ search, selectedTag }) {
  return (
    <View style={styles.searchStatusText}>
      <Text
        style={{
          color: textColor,
          fontFamily: "Kanit300",
          fontSize: 16,
        }}
      >
        Search for
        {search && <Text style={{ color: "black" }}>{` ${search}`}</Text>}
        {selectedTag.map((tag) => (
          <Text
            key={`searching-indicator-${tag._id}`}
            style={{ color: tag.tagColor }}
          >{` ${tag.tagName}`}</Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchStatusText: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
});
