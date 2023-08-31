import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";

export default function SearchItem({ quest }) {
  const queryPressHandler = () => {
    TabNavigation.navigate("QuestDetail", { questId: quest._id });
  };

  return (
    <Pressable style={styles.container} onPress={queryPressHandler}>
      <View style={styles.imageContainer}>
        <Image source={quest.picturePath} style={styles.image} />
      </View>
      <View>
        <Text>{quest.questName}</Text>
        <Text>{quest.description}</Text>
        <Text>{quest.timeStart}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    padding: 8,
  },
  imageContainer: {
    width: 40,
    height: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
