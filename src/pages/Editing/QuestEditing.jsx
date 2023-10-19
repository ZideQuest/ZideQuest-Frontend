import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

import BottomsheetDynamic from "../../components/Bottomsheet/BottomsheetDynamic";
import AddPhoto from "../../components/AddPhoto";
import Spinner from "../../components/Animations/Spinner";
import BigButton from "../../components/button/BigButton.jsx";
import BackButton from "../../components/button/BackButton";
import { TimePicker } from "../../components/TimePicker";

import { buttonOrange, primaryColor } from "../../data/color";
import { getQuestData, editQuest } from "../../data/Quest";
import * as TabNavigation from "../../data/TabNavigation";

import ImagePreviewModal from "../../components/misc/ImagePreviewModal";

import close_icon from "../../../assets/images/close_icon.png";

import ItemSelectingModal from "../../components/misc/ItemSelectingModal";
import TagItem from "../../components/Quest/TagItem";
import CancelQuest from "../../components/Quest/CancelQuest";
import { getTags } from "../../data/tag";
import { activityCategories } from "../../data/activityCategory";

export default function QuestEditing() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [questName, setQuestName] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState(0);
  const [activityHour, setActivityHour] = useState(1);
  const [tags, setTags] = useState([]);
  const route = useRoute();
  const { questId } = route.params;
  const [image, setImage] = useState(null);
  const [isAuto, setIsAuto] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [locationId, setLocationId] = useState(null);

  const [limitParticipants, setLimitParticipants] = useState(false);
  const [maxParticipant, setMaxParticipant] = useState("");

  const [selectedTag, setSelectedTag] = useState([]);
  const [tagSearch, setTagSearch] = useState("");
  const selectedTagIds = selectedTag.map((t) => t._id);
  const tagPressHandler = (tag) => {
    if (selectedTagIds.includes(tag._id)) {
      setSelectedTag((prev) => prev.filter((p) => p._id != tag._id));
    } else {
      setSelectedTag((prev) => [...prev, tag]);
    }
  };

  const [refresher, setRefresher] = useState(false);
  const activityPressHandler = (act) => {
    setActivity(act);
    setRefresher((prev) => !prev);
  };

  const buttonHandler = async (e) => {
    setIsLoading(true);
    try {
      const questDetail = new FormData();
      questDetail.append("timeStart", startDate.toISOString());
      questDetail.append("timeEnd", endDate.toISOString());
      questDetail.append("questName", questName);
      questDetail.append("description", description);

      if (limitParticipants) {
        questDetail.append("maxParticipant", maxParticipant);
      }

      questDetail.append("autoComplete", isAuto);

      if (
        image != null &&
        !image?.uri.startsWith("https://res.cloudinary.com")
      ) {
        questDetail.append("img", {
          name: image.fileName,
          type: image.type,
          uri:
            Platform.OS === "ios"
              ? image.uri.replace("file://", "")
              : image.uri,
        });
      }

      if (activity != 0) {
        questDetail.append("activityHour[category]", activity);
        questDetail.append("activityHour[hour]", activityHour);
      }

      if (selectedTag.length) {
        selectedTag.forEach((tag) => questDetail.append("tagId", tag._id));
      }

      const newQuest = await editQuest(questDetail, questId);
      setIsLoading(false);
      TabNavigation.navigate("QuestManage", { questId: newQuest._id });
    } catch (error) {
      setIsLoading(false);
      alert("failed to edit quest", error);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const getQuest = async () => {
      try {
        const data = await getQuestData(questId);
        setLocationId(data.locationId);
        setQuestName(data.questName);
        setStartDate(new Date(data.timeStart));
        setEndDate(new Date(data.timeEnd));
        setDescription(data.description);
        setSelectedTag(data.tag);
        setMaxParticipant(data.maxParticipant);
        if (data.maxParticipant) {
          setLimitParticipants(true);
        }
        setActivity(data.activityHour?.category || 0);
        setActivityHour(data.activityHour?.hour || 1);
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

  return (
    <BottomsheetDynamic style={styles.container} snapPoints={["20%"]} index={1}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ImagePreviewModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            imageUri={image?.uri}
          />
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Text style={styles.textXl}>แก้ไขเควส</Text>
                <CancelQuest
                  questId={route.params.questId}
                  locationId={locationId}
                  questName={questName}
                />
              </View>
              <BackButton
                targetRoute="QuestManage"
                params={{ questId: route.params.questId }}
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
              <View style={{ ...styles.box, flex: 1 }}>
                <Text style={styles.textMd}>แท็ก</Text>
                <ItemSelectingModal
                  subject={
                    selectedTag.length != 0
                      ? `${selectedTag.length} แท็ก`
                      : "แท็ก"
                  }
                  isActive={selectedTag.length != 0}
                >
                  <View style={{ padding: 5, paddingTop: 10, width: "100%" }}>
                    <TextInput
                      placeholder="ค้นหาแท็ก"
                      value={tagSearch}
                      onChangeText={setTagSearch}
                    />
                    <View style={styles.tagContainer}>
                      {tags
                        .filter((tag) => tag.tagName.startsWith(tagSearch))
                        .map((tag) => (
                          <TouchableOpacity
                            onPress={() => tagPressHandler(tag)}
                            key={`search-tag-${tag._id}`}
                            style={{
                              borderColor: selectedTagIds.includes(tag._id)
                                ? "black"
                                : "white",
                              borderWidth: 3,
                              borderRadius: 15,
                            }}
                          >
                            <TagItem tag={tag} />
                          </TouchableOpacity>
                        ))}
                    </View>
                  </View>
                </ItemSelectingModal>
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>
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
                  <ItemSelectingModal
                    subject={activityCategories[activity]}
                    closeOnPress
                    refresher={refresher}
                    isActive={activity != 0}
                  >
                    <View>
                      <Text
                        style={{
                          paddingHorizontal: 7,
                          marginTop: 10,
                          marginBottom: 6,
                          fontFamily: "Kanit400",
                          fontSize: 18,
                        }}
                      >
                        เลือกชั่วโมงกิจกรรม
                      </Text>
                      {Object.keys(activityCategories).map((act) => (
                        <TouchableHighlight
                          underlayColor="#DDDDDD"
                          onPress={() => activityPressHandler(act)}
                          key={`activity-hour-${act}`}
                          style={{ width: "100%", padding: 7, paddingLeft: 13 }}
                        >
                          <Text
                            style={{ fontFamily: "Kanit300", fontSize: 15 }}
                          >
                            {activityCategories[act]}
                          </Text>
                        </TouchableHighlight>
                      ))}
                    </View>
                  </ItemSelectingModal>
                </View>
                <View style={styles.box}>
                  <Text
                    style={[
                      styles.textMd,
                      { color: activity != 0 ? "black" : "grey" },
                    ]}
                  >
                    จำนวนชั่วโมง
                  </Text>
                  <BottomSheetTextInput
                    style={[
                      styles.textIn,
                      { color: activity != 0 ? "black" : "grey" },
                    ]}
                    value={activity != 0 ? activityHour?.toString() : ""}
                    onChangeText={setActivityHour}
                    editable={activity != 0}
                    inputMode="numeric"
                  />
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <TimePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </View>

              <Pressable
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginVertical: 4,
                  alignItems: "center",
                }}
                onPress={() => setIsAuto((prev) => !prev)}
              >
                <Checkbox
                  color={primaryColor}
                  value={isAuto}
                  onValueChange={(v) => setIsAuto(v)}
                />
                <Text style={styles.textMd}>
                  ให้เควสจบอัตโนมัติเมื่อถึงเวลา
                </Text>
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color={primaryColor}
                    value={limitParticipants}
                    onValueChange={setLimitParticipants}
                  />
                  <Text style={styles.textMd}>จำกัดจำนวนคน</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BottomSheetTextInput
                    style={[
                      styles.textIn,
                      { width: 100, marginHorizontal: 10 },
                    ]}
                    value={maxParticipant?.toString()}
                    onChangeText={setMaxParticipant}
                    editable={limitParticipants}
                  />
                  <Text
                    style={[
                      styles.textMd,
                      {
                        color: limitParticipants ? "black" : "gray",
                      },
                    ]}
                  >
                    คน
                  </Text>
                </View>
              </View>

              <View style={styles.box}>
                <Text style={styles.textMd}>เพิ่มรูปภาพ</Text>
                <AddPhoto image={image} setImage={setImage} />
                {image && (
                  <View style={styles.image}>
                    <TouchableOpacity
                      onPress={() => {
                        setImage(null);
                      }}
                      style={styles.xBtn}
                    >
                      <Image source={close_icon} style={styles.x} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Image
                        source={{ uri: image.uri }}
                        style={{ height: 150, flex: 1 }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <BigButton
              bg={buttonOrange}
              text="ยืนยันการแก้ไข"
              onPress={buttonHandler}
            />
          </View>
        </>
      )}
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
    paddingHorizontal: 15,
  },
  textIn: {
    borderColor: "#CDCDCD",
    borderWidth: 1,
    padding: 4,
    backgroundColor: "#fbfbfb",
    borderRadius: 6,
    fontSize: 16,
  },
  textXl: {
    fontSize: 30,
    fontFamily: "Kanit400",
  },
  textMd: {
    fontSize: 16,
    fontFamily: "Kanit300",
  },
  box: {
    gap: 2,
    // borderWidth: 1
  },
  detailBox: {
    gap: 10,
    marginBottom: 10,
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
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  tagContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    padding: 10,
  },
  x: {
    width: "100%",
    height: "100%",
  },
});
