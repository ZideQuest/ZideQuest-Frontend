import { Dimensions, StyleSheet, Text, View, Keyboard } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useAppContext } from "../../data/AppContext";
import { BGcolor, buttonGrey, buttonLightGrey } from "../../data/color";

const Bottomsheet = ({
  children,
  snapPoints,
  index = 0,
  detached = false,
  hideBar = false,
}) => {
  const bottomSheetModalRef = useRef(null);
  const { bottomModalRef, setBottomModalRef } = useAppContext();

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    setBottomModalRef(bottomSheetModalRef);
  }, []);

  const collapsDragHandler = (e) => {
    if (e == 1 || e == 0) {
      Keyboard.dismiss()
    }
  }

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
      enablePanDownToClose={false}
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
      onChange={collapsDragHandler}
    >
      <View style={{ flex: 1, borderRadius: 15, overflow: "hidden" }}>
        {children}
      </View>
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
