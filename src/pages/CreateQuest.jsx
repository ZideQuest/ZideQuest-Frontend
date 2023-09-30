import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import AddPhoto from "../components/AddPhoto";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";
import { TimePicker } from "../components/TimePicker";
import { useRoute } from "@react-navigation/native";
import { createQuest } from "../data/Quest";
import { getTags } from "../data/tag";
import close_icon from "../../assets/images/close_icon.png";

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
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import ItemSelectingModal from "../components/misc/ItemSelectingModal";
import TagItem from "../components/Quest/TagItem";
import ImagePreviewModal from "../components/misc/ImagePreviewModal";

function CreateQuest() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [questName, setQuestName] = useState("");
  const [description, setDescription] = useState("");
  const [maxParticipant, setMaxParticipant] = useState("");
  const [activity, setActivity] = useState("");
  const [activityHour, setActivityHour] = useState(1);
  const [tags, setTags] = useState([]);
  const route = useRoute();
  const { locationId } = route.params;
  const [image, setImage] = useState(null);

  const [selectedTag, setSelectedTag] = useState([]);
  const [isAuto, setIsAuto] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const buttonHandler = async (e) => {
    setIsLoading(true);
    try {
      const questDetail = new FormData();
      questDetail.append("timeStart", startDate.toISOString());
      questDetail.append("timeEnd", endDate.toISOString());
      questDetail.append("questName", questName);
      questDetail.append("description", description);
      questDetail.append("maxParticipant", maxParticipant);
      questDetail.append("autoComplete", isAuto);

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

      if (activity != "") {
        const activityDetail = {
          category: activity,
          hour: activityHour,
        };
        questDetail.append("activityHour", activityDetail);
      }

      if (selectedTag.length) {
        selectedTag.forEach((tag) => questDetail.append("tagId", tag.id));
      }

      const newQuest = await createQuest(questDetail, locationId);
      setIsLoading(false);
      TabNavigation.navigate("QuestManage", { questId: newQuest._id });
    } catch (error) {
      setIsLoading(false);
      alert("failed to create quest", error);
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
                  <ItemSelectingModal subject="แท็ก">
                    <View style={styles.tagContainer}>
                      {tags.map((tag) => (
                        <TouchableOpacity
                          key={`select-qeusts-tag-${tag._id}`}
                          onPress={() =>
                            setSelectedTag((prev) => [...prev, tag])
                          }
                        >
                          <TagItem tag={tag} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ItemSelectingModal>
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
                    style={[
                      styles.textIn,
                      { color: activity ? "black" : "grey" },
                    ]}
                    value={activityHour?.toString()}
                    onChangeText={setActivityHour}
                    editable={activity == "" ? false : true}
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

              <Pressable
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginVertical: 4,
                  alignItems: "center",
                }}
                onPress={() => setIsAuto((prev) => !prev)}
              >
                <Checkbox value={isAuto} onValueChange={(v) => setIsAuto(v)} />
                <Text style={styles.textMd}>
                  ให้เควสจบอัตโนมัติเมื่อถึงเวลา
                </Text>
              </Pressable>

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
              text="สร้างกิจกรรม"
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
    borderRadius: 10,
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

export default CreateQuest;
