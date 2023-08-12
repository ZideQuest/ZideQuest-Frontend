import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import MinimalCard from "./MinimalCard";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Bottomsheet = () => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["30%", "90%"];

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.bottomSheetContainer}>
        <StatusBar style="auto" />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
        >
          <Text style={styles.header_recommend}>กิจกรรมแนะนำ</Text>
          <View style={styles.bottomSheetContent}>
            <MinimalCard />
            {/* put in card and scroll down the component */}
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
  },
  bottomSheetContent: {
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    alignItems: "center",
    top: "5%",
  },
  header_recommend: {
    top: "1%",
    left: "3%",
    fontWeight: "bold",
  },
});

export default Bottomsheet;
