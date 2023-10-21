import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAppContext } from "../../data/AppContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Bottomsheet = ({
  children,
  snapPoints,
  index = 0,
  detached = false,
  hideBar = false,
  onChange,
}) => {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef(null);
  const { setBottomModalRef } = useAppContext();

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
      topInset={insets.top}
      bottomInset={detached ? 30 : 0}
      enableOverDrag={!detached}
      keyboardBehavior="extend"
      onChange={onChange}
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
    paddingBottom: 13,
  },
  backgroundStyle: {
    // backgroundColor: "transparent",
    // backgroundColor: "red",
  },
  pullBar: {
    backgroundColor: "white",
    borderRadius: 10,
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
