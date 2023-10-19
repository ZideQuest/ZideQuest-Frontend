import { Text, View, StyleSheet, Pressable, Image } from "react-native";

import { useMemo, useRef, useState } from "react";

import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

import * as TabNavigation from "../../data/TabNavigation.jsx";

import BackButton from "../button/BackButton";
import { creatorCancelQuest } from "../../data/Quest";
import BigButton from "../button/BigButton";
import { buttonDarkRed } from "../../data/color";
import bin_icon from "../.././../assets/images/bin.png";
import Alert from "../misc/Alert.js";

export default function CancelQuest({ questId, locationId, questName }) {
  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const bottomSheetModalRef = useRef(null);

  const [cancelReason, setCancelReason] = useState("");

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const sendInputData = async () => {
    if (
      await Alert(
        "ต้องการที่จะลบเควสนี้?",
        `คุณยืนยันที่จะลบเควส ${questName} หรือไม่ การกระทำนี้ไม่สามารถย้อนกลับได้`
      )
    ) {
      try {
        await creatorCancelQuest(questId, cancelReason);
        bottomSheetModalRef.current?.dismiss();
        TabNavigation.navigate("PinDetail", { pinId: locationId });
        alert(`ยกเลิกเควส ${questName} สำเร็จ`);
      } catch (error) {
        alert(`error occured ${error}`);
      }
    }
  };

  return (
    <View>
      <Pressable onPress={() => handlePresentModalPress()}>
        <Image source={bin_icon} style={{ width: 20, height: 20 }} />
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableOverDrag={false}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ height: 0 }}
        handleStyle={{ height: 0, padding: 0 }}
        stackBehavior="push"
        keyboardBehavior="interactive"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
      >
        <BottomSheetView
          onLayout={handleContentLayout}
          // style={[styles.contentContainer]}
        >
          <View style={styles.modalContainer}>
            <View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontFamily: "Kanit500" }}>
                  ทำไมถึงจะยกเลิกล่ะ?
                </Text>
                <BackButton
                  onPress={() => {
                    bottomSheetModalRef.current?.dismiss();
                    setCancelReason("");
                  }}
                  changeRoute={false}
                />
              </View>

              <BottomSheetTextInput
                style={styles.input}
                placeholder="Enter something"
                value={cancelReason}
                onChangeText={setCancelReason}
                autoFocus
              />

              <BigButton
                text="Remove Quest"
                bg={buttonDarkRed} // Change the color as needed
                color="white"
                onPress={sendInputData}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
