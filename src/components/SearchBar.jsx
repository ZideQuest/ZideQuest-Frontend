import React from "react";

import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

import { useAppContext } from "../data/AppContext";
import { primaryColor } from "../data/color";

export default function SearchBar() {
  const { bottomModalRef } = useAppContext();

  const searchHandler = () => {
    bottomModalRef.current?.snapToIndex(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.serchTextContainer}>
        <TextInput style={styles.searchText} placeholder="ค้นหาชื่อเควส" />
        <Pressable style={styles.searchButton} onPress={searchHandler}>
          <Text>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  serchTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchText: {
    backgroundColor: "rgb(244,244,244)",
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 10,
  },
});
