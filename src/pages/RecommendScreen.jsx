import { useState } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import SearchBar from "../components/Searchbar/SearchBar";
import GridCard from "../components/MinimalCard/Gridcard";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";

const Recommend = () => {
  const [searching, setSearching] = useState(false);

  return (
    <Bottomsheet snapPoints={["15%", "50%", "83%"]} index={0}>
      <BottomSheetScrollView
        style={styles.Container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <SearchBar searching={searching} setSearching={setSearching}/>
        {!searching && <GridCard />}
      </BottomSheetScrollView>
    </Bottomsheet>
  );
};

const styles = StyleSheet.create({
  Card: { height: "50%" },
  Container: {
    width: "100%",
    flex: 1,
    // borderWidth: 5,
    // borderColor: "blue",
    // backgroundColor: "#F2F2F2",
    backgroundColor: "white",
  },
  Rec_text: {
    marginTop: 30,
    marginLeft: 30,
  },
});

export default Recommend;
