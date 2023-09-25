import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

button_color = "#FE9F60";

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
      setsTime(tempDate.getHours().toString().padStart(2, "0") + ":" + tempDate.getMinutes().toString().padStart(2, "0"));
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
      seteTime(tempDate.getHours().toString().padStart(2, "0") + ":" + tempDate.getMinutes().toString().padStart(2, "0"));
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

  const onChangeStartIOS = (event, selectedTime) => {
    setShow(false);
    let time = new Date(selectedTime);
    setStartDate(time);
  };

  const onChangeEndIOS = (event, selectedTime) => {
    setShow(false);
    let time = new Date(selectedTime);
    setEndDate(time);
  };

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
          <Text style={{ fontSize: 16 }}>เริ่มจัดกิจกรรม</Text>

          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={"datetime"}
            is24Hour={true}
            onChange={onChangeStartIOS}
            style={styles.datePicker}
          />
        </View>
        <View style={styles.innerView}>
          <Text style={{ fontSize: 16 }}>เวลาจบ</Text>
          <DateTimePicker
            testID="dateTimePicker"
            minimumDate={startDate}
            value={endDate}
            mode={"datetime"}
            is24Hour={true}
            onChange={onChangeEndIOS}
            style={styles.datePicker}
          />
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
});
