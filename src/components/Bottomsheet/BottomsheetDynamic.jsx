import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useMemo } from "react";
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useAppContext } from "../../data/AppContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomsheetDynamic({
  children,
  snapPoints,
  index = 0,
  detached = false,
  hideBar = false,
  onChange,
}) {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef(null);
  const { setBottomModalRef } = useAppContext();
  const initialSnapPoints = useMemo(
    () => [...snapPoints, "CONTENT_HEIGHT"],
    []
  );

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    setBottomModalRef(bottomSheetModalRef);
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
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
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
      keyboardBehavior="interactive"
      onChange={onChange}
    >
      <BottomSheetView
        onLayout={handleContentLayout}
        style={[styles.contentContainer, { paddingBottom: insets.bottom }]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

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
