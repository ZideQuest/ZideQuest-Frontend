import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import userprofiletest from "../../assets/images/UserProfileTest.jpg";
import Activity from "../../assets/images/ActivityTest.jpg";

import SearchBar from "../components/SearchBar";
import MinimalCard from "../components/MinimalCard/MinimalCard";
import GridCard from "../components/MinimalCard/Gridcard";

const Recommend = () => {
  return (
    <View style={styles.Container}>
      <SearchBar />
      <GridCard />
    </View>
  );
};

const styles = StyleSheet.create({
  Card: { height: "50%" },
  Container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    // borderWidth: 2,
    // borderColor: "blue",
  },
});

export default Recommend;
