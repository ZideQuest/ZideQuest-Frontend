import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Bottomsheet = ({ children }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["15", "45%", "90%"];

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.bottomSheetContainer}>
        <BottomSheetModal
          // handleIndicatorStyle={styles.headerIndicator}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          // backgroundStyle={styles.backgroundStyle}
          // style={styles.pullBar}
        >
          <View style={styles.contentContainer}>{children}</View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
  },
  headerIndicator: {
    height: 0,
  },
  contentContainer: {
    flex: 1,
  },
  backgroundStyle: {
    backgroundColor: "transparent",
  },
  pullBar: {
  }
});

export default Bottomsheet;
