import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";

import BottomsheetDynamic from "../../components/Bottomsheet/BottomsheetDynamic";
import AddPhoto from "../../components/AddPhoto";
import Spinner from "../../components/Animations/Spinner";
import BigButton from "../../components/button/BigButton.jsx";
import BackButton from "../../components/button/BackButton";
import { TimePicker } from "../../components/TimePicker";
import Alert from "../../components/misc/Alert";

import { buttonOrange, textColor } from "../../data/color";
import { editQuest } from "../../data/Quest";
import { BASE_URL } from "../../data/backend_url";
import * as TabNavigation from "../../data/TabNavigation";
import { getQuestData, deleteQuest } from "../../data/Quest";

import bin_icon from "../../../assets/images/bin.png";

const activityCategories = [
  "ไม่มีชั่วโมงกิจกรรม",
  "1 กิจกรรมมหาวิทยาลัย",
  "2.1  ด้านพัฒนาคุณธรรม จริยธรรม",
  "2.2  ด้านการคิดและการเรียนรู้",
  "2.3  ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล",
  "2.4  ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล",
  "3 กิจกรรมเพื่อสังคม",
];

export default function QuestEditing({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [questName, setQuestName] = useState(null);
  const [description, setDescription] = useState(null);
  const [maxParticipant, setMaxParticipant] = useState(null);
  const [activity, setActivity] = useState(null);
  const [activityHour, setActivityHour] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getQuest = async () => {
      try {
        const data = await getQuestData(route.params?.questId);
        setQuestName(data.questName);
        setStartDate(new Date(data.timeStart));
        setEndDate(new Date(data.timeEnd));
        setDescription(data.description);
        setTagId(data.tag[0]);
        setMaxParticipant(data.maxParticipant);
        setImage(data.picturePath ? { uri: data.picturePath } : null);
        setIsLoading(false);
      } catch (error) {
        TabNavigation.navigate("QuestManage", {
          questId: route.params?.questId,
        });
        alert("error occur");
        setIsLoading(false);
      }
    };
    getQuest();
  }, []);

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

  const submitHandler = async (e) => {
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

      if (tagId != "" && tagId != null) {
        const handleTag = [tagId];
        questDetail.append("tagId", handleTag);
      }

      const newQuest = await editQuest(questDetail, route.params?.questId);
      setIsLoading(false);
      TabNavigation.navigate("QuestManage", { questId: newQuest._id });
    } catch (error) {
      setIsLoading(false);
      alert("failed to edit quest", error);
    }
  };

  const questDeleteHandler = async () => {
    if (
      await Alert(
        "Confirm Deleting Quest?",
        "Are you sure you want to delete this quest?"
      )
    ) {
      deleteQuest(route.params?.questId);
      TabNavigation.navigate("Recommend");
      alert("ลบเควสสำเร็จ");
    }
  };

  const tagArray = ["ไม่มีแท็ก", ...tags.map((item) => item.tagName)];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BottomsheetDynamic style={styles.container} snapPoints={["30%"]} index={1}>
      <BottomSheetScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.innerContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text style={styles.textXl}>แก้ไขข้อมูล</Text>
              <TouchableOpacity
                style={styles.binIcon}
                onPress={questDeleteHandler}
              >
                <Image
                  source={bin_icon}
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            </View>
            <BackButton
              targetRoute="QuestManage"
              params={{ questId: route.params?.questId }}
              resetFocus={false}
            />
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
            text="ยืนยันการแก้ไข"
            onPress={submitHandler}
          />
        </View>
      </BottomSheetScrollView>
    </BottomsheetDynamic>
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
    fontSize: 25,
    fontFamily: "Kanit400",
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
    backgroundColor: "white",
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
  binIcon: {
    width: 25,
    height: 25,
  },
});
