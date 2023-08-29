import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { BGcolor, textColor } from "../../data/color";

export default function Tag({ tags }) {
    return (
      <View style={styles.DataCon}>
        <View style={styles.tagCon}>
            {tags.map((tag, index) => (
              <View style={styles.singleTag } key={index}>
                  <Text  style={styles.tagText}>
                    {tag.tagName}
                  </Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagText: {
    color: textcolor,
    padding: 5,
  },
  tagCon: {
    backgroundColor: BGcolor,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
  },
  singleTag: {
    backgroundColor: "#FDEBD0",
    alignSelf: "flex-start",
    borderRadius: 40,
  },
  DataCon: {
    backgroundColor: BGcolor,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    justifyContent: "center",
  },
});
