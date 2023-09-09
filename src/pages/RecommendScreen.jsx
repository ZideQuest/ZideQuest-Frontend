import { StyleSheet } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import SearchBar from "../components/SearchBar";
import GridCard from "../components/MinimalCard/Gridcard";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";

const Recommend = () => {
  return (
    <Bottomsheet snapPoints={["10%", "20%", "50%", "90%"]} index={1}>
      <BottomSheetScrollView
        style={styles.Container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode='on-drag'
      >
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
    // backgroundColor: "#F2F2F2",
    backgroundColor: "white",
  },
  Rec_text: {
    marginTop: 30,
    marginLeft: 30,
  },
});

export default Recommend;
