import DateTimePicker from "@react-native-community/datetimepicker";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import BigButton from "./button/BigButton";
import { primaryColor, textColor } from "../data/color";

button_color = "#FE9F60";
const options = {
  timeZone: "Asia/Bangkok",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
};

export const TimePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isStart, setIsStart] = useState();
  const [isTime, setIsTime] = useState(false);
  const [sDate, setsDate] = useState("_/_/__");
  const [eDate, seteDate] = useState("_/_/__");
  const [sTime, setsTime] = useState("__:__");
  const [eTime, seteTime] = useState("__:__");
  const [bsDate, bsetsDate] = useState("");
  const [beDate, bseteDate] = useState("");
  const [bsTime, bsetsTime] = useState("");
  const [beTime, bseteTime] = useState("");

  const [changingTime, setChangingTime] = useState(new Date());
  const [selectingMode, setSelectingMode] = useState(null);
  const insets = useSafeAreaInsets();
  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  useEffect(() => {
    if (beDate != "" && beTime != "") {
      const endDateString = beDate + "T" + beTime;
      const endDatep = new Date(endDateString);
      setEndDate(endDatep);
    }
  }, [beDate, beTime]);

  useEffect(() => {
    if (bsDate != "" && bsTime != "") {
      const startDateString = bsDate + "T" + bsTime;
      const startDatep = new Date(startDateString);
      setStartDate(startDatep);
    }
  }, [bsDate, bsTime]);

  const showMode = (currentMode, is_start, is_time) => {
    setShow(true);
    setMode(currentMode);
    setIsStart(is_start);
    setIsTime(is_time);
  };

  const onChangeStartDate = async (event, selectedDate) => {
    setShow(false);

    const currentDate = selectedDate;
    let tempDate = new Date(currentDate);

    if (isTime) {
      setsTime(
        tempDate.getHours().toString().padStart(2, "0") +
          ":" +
          tempDate.getMinutes().toString().padStart(2, "0")
      );
      bsetsTime(
        tempDate.getHours().toString().padStart(2, "0") +
          ":" +
          tempDate.getMinutes().toString().padStart(2, "0") +
          ":" +
          "00" +
          "." +
          "000+07:00"
      );
    } else {
      setsDate(
        tempDate.getDate() +
          "/" +
          (tempDate.getMonth() + 1) +
          "/" +
          tempDate.getFullYear()
      );
      bsetsDate(
        tempDate.getFullYear() +
          "-" +
          (tempDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          tempDate.getDate().toString().padStart(2, "0")
      );
    }
  };
  const onChangeEndDate = async (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate;
    let tempDate = new Date(currentDate);

    if (isTime) {
      seteTime(
        tempDate.getHours().toString().padStart(2, "0") +
          ":" +
          tempDate.getMinutes().toString().padStart(2, "0")
      );
      bseteTime(
        tempDate.getHours().toString().padStart(2, "0") +
          ":" +
          tempDate.getMinutes().toString().padStart(2, "0") +
          ":" +
          "00" +
          "." +
          "000+07:00"
      );
    } else {
      seteDate(
        tempDate.getDate() +
          "/" +
          (tempDate.getMonth() + 1) +
          "/" +
          tempDate.getFullYear()
      );
      bseteDate(
        tempDate.getFullYear() +
          "-" +
          (tempDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          tempDate.getDate().toString().padStart(2, "0")
      );
    }
  };

  const timePickingHandler = (event, selectedTime) => {
    let time = new Date(selectedTime);
    setChangingTime(time);
  };

  const confirmHandler = () => {
    bottomSheetModalRef.current?.dismiss();
    if (selectingMode == "start") {
      setStartDate(changingTime);
    } else {
      setEndDate(changingTime);
    }
  };

  const cancelHander = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback((modePressed) => {
    setSelectingMode(modePressed);
    bottomSheetModalRef.current?.present();
  }, []);

  if (Platform.OS === "android") {
    return (
      <View style={styles.mainview}>
        <View style={styles.view}>
          <View style={styles.innerViewText}>
            <Text style={{ fontSize: 16 }}>เริ่มจัดกิจกรรม</Text>
          </View>
          <View style={styles.innerViewText}>
            <Text style={{ fontSize: 16 }}>เวลาจบ</Text>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.innerView}>
            <View style={styles.datePicker}>
              <Button
                title={sDate}
                color={button_color}
                onPress={() => showMode("date", true, false)}
              />
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={styles.datePicker}>
              <Button
                title={sTime}
                color={button_color}
                onPress={() => showMode("time", true, true)}
              />
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={styles.datePicker}>
              <Button
                title={eDate}
                color={button_color}
                onPress={() => showMode("date", false, false)}
              />
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={styles.datePicker}>
              <Button
                title={eTime}
                color={button_color}
                onPress={() => showMode("time", false, true)}
              />
            </View>
          </View>
          {show && isStart && (
            <DateTimePicker
              value={startDate}
              mode={mode}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={onChangeStartDate}
              style={styles.datePicker}
            />
          )}
          {show && !isStart && (
            <DateTimePicker
              value={endDate}
              mode={mode}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={onChangeEndDate}
              style={styles.datePicker}
            />
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <View style={styles.innerView}>
          <TouchableOpacity onPress={() => handlePresentModalPress("start")}>
            <Text style={styles.dateText}>
              เริ่มจัดกิจกรรม {startDate.toLocaleString("en-US", options)}  ▼
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePresentModalPress("end")}>
            <Text style={styles.dateText}>
              สิ้นสุดกิจกรรม {endDate.toLocaleString("en-US", options)}  ▼
            </Text>
          </TouchableOpacity>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            enableOverDrag={false}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ height: 0 }}
            handleStyle={{ height: 0, padding: 0 }}
            stackBehavior="push"
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
              style={[
                styles.contentContainer,
                { paddingBottom: insets.bottom },
              ]}
            >
              <Text style={{ fontFamily: "Kanit400", fontSize: 20 }}>
                {selectingMode == "start"
                  ? "เลือกเวลาเริ่มต้น"
                  : "เลือกเวลาสิ้นสุด"}
              </Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={changingTime}
                mode={"datetime"}
                is24Hour={true}
                display="spinner"
                onChange={timePickingHandler}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  backgroundColor: "white",
                }}
              >
                <BigButton
                  text="ยืนยัน"
                  bg={primaryColor}
                  onPress={confirmHandler}
                />
                <BigButton
                  text="ยกเลิก"
                  bg="rgba(61, 61, 55, 0.28)"
                  onPress={cancelHander}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    gap: 5,
    // borderWidth: 1
  },
  mainview: {
    flexDirection: "column",
    gap: 5,
    // borderWidth: 1
  },
  innerView: {
    flex: 1,
    height: "100%",
    width: "24%",
    gap: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "flex-start",
    // borderWidth: 1
  },
  innerViewText: {
    flex: 1,
    height: "100%",
    width: "24%",
    gap: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "flex-start",
    // borderWidth: 1
  },
  datePicker: {
    // borderColor: "#000",
    // backgroundColor: "white"
    // padding: 0,
    // borderWidth: 1
  },
  buttonCon: {},
  contentContainer: {
    padding: 20,
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Kanit300",
    lineHeight: 20,
    color: textColor
  },
});
