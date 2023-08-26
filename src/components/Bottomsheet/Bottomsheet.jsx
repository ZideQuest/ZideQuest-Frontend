import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useAppContext } from "../../data/AppContext";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Bottomsheet = ({ children }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["15", "45%", "90%"];
  const { bottomModalRef, setBottomModalRef } = useAppContext();

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    setBottomModalRef(bottomSheetModalRef);
  }, []);

  return (
    <View style={styles.bottomSheetContainer}>
      <BottomSheetModal
        handleIndicatorStyle={styles.headerIndicator}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        // backgroundStyle={styles.backgroundStyle}
        style={styles.pullBar}
      >
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
  },
  headerIndicator: {
    width: 80,
    // backgroundColor: "lightgrey",
    height: 4,
  },
  contentContainer: {
    flex: 1,
  },
  backgroundStyle: {
    // backgroundColor: "transparent",
  },
  pullBar: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.81,
    shadowRadius: 13.16,

    elevation: 20,
  },
});

export default Bottomsheet;
