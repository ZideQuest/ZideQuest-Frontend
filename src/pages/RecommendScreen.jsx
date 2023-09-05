import { Image, StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useEffect, useRef } from "react";
import {BottomSheetScrollView} from "@gorhom/bottom-sheet"

import SearchBar from "../components/SearchBar";
import GridCard from "../components/MinimalCard/Gridcard";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";


const Recommend = () => {
  return (
    <Bottomsheet snapPoints={["20%", "60%", "90%"]} index={1}>
      <BottomSheetScrollView style={styles.Container}>
        <SearchBar />
        <GridCard />
      </BottomSheetScrollView>
    </Bottomsheet>
  );
};

const styles = StyleSheet.create({
  Card: { height: "50%" },
  Container: {
    width: "100%",
    flex: 1,
    backgroundColor: "lightgrey",
  },
  Rec_text: {
    marginTop: 30,
    marginLeft: 30,
  },
});

export default Recommend;
