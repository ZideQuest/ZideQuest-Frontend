import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import AddPhoto from "../components/AddPhoto";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";
import { TimePicker } from "../components/TimePicker";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { createQuest } from "../data/Quest";
const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";
// const activityCategories = ["ไม่มีชั่วโมงกิจกรรม", "1 กิจกรรมมหาวิทยาลัย", "2.1 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาคุณธรรม จริยธรรม", "2.2 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านการคิดและการเรียนรู้", "2.3 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล", "2.4 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล", "3 กิจกรรมเพื่อสังคม"]
const activityCategories = [
  "ไม่มีชั่วโมงกิจกรรม",
  "1 กิจกรรมมหาวิทยาลัย",
  "2.1  ด้านพัฒนาคุณธรรม จริยธรรม",
  "2.2  ด้านการคิดและการเรียนรู้",
  "2.3  ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล",
  "2.4  ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล",
  "3 กิจกรรมเพื่อสังคม",
];

import Spinner from "../components/Animations/Spinner";
import BigButton from "../components/button/BigButton.jsx";
import BackButton from "../components/button/BackButton";
import { buttonOrange, textColor } from "../data/color";
import * as TabNavigation from "../data/TabNavigation";

function CreateQuest() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [questName, setQuestName] = useState("");
  const [description, setDescription] = useState("");
  const [maxParticipant, setMaxParticipant] = useState("");
  const [activity, setActivity] = useState("");
  const [activityHour, setActivityHour] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const route = useRoute();
  const { locationId } = route.params;
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const buttonHandler = async (e) => {
    setIsLoading(true);
    try {
      const questDetail = new FormData();
      questDetail.append("timeStart", startDate.toISOString());
      questDetail.append("timeEnd", endDate.toISOString());
      questDetail.append("questName", questName);
      questDetail.append("description", description);
      questDetail.append("maxParticipant", maxParticipant);
      questDetail.append("autoComplete", true);

      if (image != null) {
        questDetail.append("img", {
          name: image.fileName,
          type: image.type,
          uri:
            Platform.OS === "ios"
              ? image.uri.replace("file://", "")
              : image.uri,
        });
      }

      if (activity != "" || activityHour != 0) {
        const activityDetail = {
          category: activity,
          hour: activityHour,
        };
        questDetail.append("activityHour", activityDetail);
      }

      if (tagId != "") {
        const handleTag = [tagId];
        questDetail.append("tagId", handleTag);
      }
      console.log(questDetail);
      const newQuest = await createQuest(questDetail, locationId);
      setIsLoading(false);
      TabNavigation.navigate("QuestManage", { questId: newQuest._id });
    } catch (error) {
      setIsLoading(false);
      alert("failed to create quest", error);
    }
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/tag`);
        setTags(data);
      } catch (error) {
        return {
          message: "failed to load locations",
          status: 401,
        };
      }
    };
    getTags();
  }, []);

  const tagArray = ["ไม่มีแท็ก", ...tags.map((item) => item.tagName)];
  return (
    <Bottomsheet
      style={styles.container}
      snapPoints={["31%", "65%", "90%"]}
      index={1}
    >
      <BottomSheetScrollView style={{ backgroundColor: "white" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.textXl}>เพิ่มเควสใหม่</Text>
              <BackButton />
            </View>

            <View style={styles.detailBox}>
              <View style={styles.box}>
                <Text style={styles.textMd}>ชื่อเควส</Text>
                <BottomSheetTextInput
                  style={styles.textIn}
                  value={questName}
                  onChangeText={setQuestName}
                />
              </View>
              <View style={styles.box}>
                <Text style={styles.textMd}>รายละเอียด</Text>
                <BottomSheetTextInput
                  style={styles.textIn}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ ...styles.box, flex: 1 }}>
                  <Text style={styles.textMd}>แท็ก</Text>
                  <SelectDropdown
                    search={true}
                    defaultValueByIndex={0}
                    data={tagArray}
                    onSelect={(selectedItem, index) => {
                      if (index === 0) {
                        setTagId("");
                      } else {
                        setTagId(tags[index]._id);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    // search={true}
                    buttonTextStyle={{
                      fontSize: 16,
                    }}
                    dropdownStyle={{
                      borderRadius: 20,
                      backgroundColor: "#fbfbfb",
                    }}
                    rowTextStyle={{
                      fontSize: 16,
                      textAlign: "left",
                    }}
                    buttonStyle={{
                      height: 30,
                      borderColor: "#CDCDCD",
                      borderWidth: 1,
                      width: "100%",

                      backgroundColor: "#fbfbfb",
                      borderRadius: 10,
                      fontSize: 16,
                    }}
                  />
                </View>
                <View style={{ ...styles.box, flex: 0.32 }}>
                  <Text style={styles.textMd}>จำนวนคน</Text>
                  <BottomSheetTextInput
                    style={styles.textIn}
                    value={maxParticipant?.toString()}
                    onChangeText={setMaxParticipant}
                  />
                </View>
              </View>
              <View style={styles.box}>
                {/* <Text style={styles.textMd}>ช่วงเวลาจัดกิจกรรม</Text> */}
                <TimePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ ...styles.box, flex: 1 }}>
                  <Text style={styles.textMd}>ชั่วโมงกิจกรรม</Text>
                  <SelectDropdown
                    defaultValueByIndex={0}
                    data={activityCategories}
                    onSelect={(selectedItem, index) => {
                      if (index === 0) {
                        setActivity("");
                      }
                      const activityType = selectedItem.split(" ")[0];
                      setActivity(activityType);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonTextStyle={{
                      fontSize: 16,
                    }}
                    dropdownStyle={{
                      borderRadius: 20,
                      backgroundColor: "#fbfbfb",
                    }}
                    rowTextStyle={{
                      fontSize: 16,
                      textAlign: "left",
                    }}
                    buttonStyle={{
                      height: 30,
                      borderColor: "#CDCDCD",
                      borderWidth: 1,
                      width: "100%",
                      backgroundColor: "#fbfbfb",
                      borderRadius: 10,
                      fontSize: 16,
                    }}
                  />
                </View>
                <View style={styles.box}>
                  <Text style={styles.textMd}>จำนวนชั่วโมง</Text>
                  <BottomSheetTextInput
                    style={styles.textIn}
                    value={activityHour?.toString()}
                    onChangeText={setActivityHour}
                  />
                </View>
              </View>

              <View style={styles.box}>
                <Text style={styles.textMd}>เพิ่่มรูปภาพ</Text>
                <AddPhoto image={image} setImage={setImage} />
                {image && (
                  <View style={styles.image}>
                    <Pressable
                      style={styles.xBtn}
                      onPress={() => {
                        setImage(null);
                      }}
                    >
                      <Text style={styles.xtextbtn}>X</Text>
                    </Pressable>
                    <Image
                      source={{ uri: image.uri }}
                      style={{ height: 150, flex: 1 }}
                    />
                  </View>
                )}
              </View>
            </View>
            <BigButton
              bg={buttonOrange}
              text="สร้างกิจกรรม"
              onPress={buttonHandler}
            />
          </View>
        )}
      </BottomSheetScrollView>
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFEFE",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    flex: 1,
    overflow: "scroll",
  },
  innerContainer: {
    paddingHorizontal: 25,
    gap: 20,
  },
  textIn: {
    borderColor: "#CDCDCD",
    borderWidth: 1,
    padding: 4,
    backgroundColor: "#fbfbfb",
    borderRadius: 10,
    fontSize: 16,
  },
  textXl: {
    fontSize: 28,
    fontWeight: "bold",
  },
  textMd: {
    fontSize: 16,
  },
  box: {
    gap: 4,
    // borderWidth: 1
  },
  detailBox: {
    gap: 10,
  },
  btn: {
    backgroundColor: "#e86a33",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textBtn: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  image: {
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: "relative",
  },
  xBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 100,
    padding: 3,
    width: 20,
    height: 20,
  },
  xtextbtn: {
    color: textColor,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CreateQuest;
