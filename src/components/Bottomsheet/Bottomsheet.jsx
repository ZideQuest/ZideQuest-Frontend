import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAppContext } from "../../data/AppContext";
import * as TabNavigation from "../../data/TabNavigation";

const Bottomsheet = ({
  children,
  snapPoints,
  index = 0,
  detached = false,
  hideBar = false,
  enablePanDownToClose = false,
}) => {
  const bottomSheetModalRef = useRef(null);
  const { setBottomModalRef, setNewMarker, setFocusedPin } = useAppContext();

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    setBottomModalRef(bottomSheetModalRef);
  }, []);

  const handleSheetClose = useCallback((index) => {
    if (index == -1) {
      TabNavigation.navigate("Recommend");
      setNewMarker(null);
      setFocusedPin(null);
    }
  }, []);

  return (
    <BottomSheetModal
      handleIndicatorStyle={[
        styles.headerIndicator,
        { height: hideBar ? 0 : 4 },
      ]}
      handleStyle={{ padding: hideBar ? 0 : 5 }}
      ref={bottomSheetModalRef}
      index={index}
      snapPoints={snapPoints}
      backgroundStyle={styles.backgroundStyle}
      style={[
        styles.pullBar,
        {
          marginHorizontal: detached ? 24 : 0,
        },
      ]}
      detached={detached}
      bottomInset={detached ? 30 : 0}
      enableOverDrag={!detached}
      keyboardBehavior="extend"
      enablePanDownToClose={enablePanDownToClose}
      onChange={enablePanDownToClose && handleSheetClose}
    >
      <View style={styles.contentContainer}>{children}</View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
  },
  headerIndicator: {
    width: 35,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  backgroundStyle: {
    // backgroundColor: "transparent",
    // backgroundColor: "red",
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
    // maxWidth: 700,
    elevation: 20,
  },
});

export default Bottomsheet;
