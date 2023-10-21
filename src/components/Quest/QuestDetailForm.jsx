import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Checkbox from "expo-checkbox";

import TagSelectingModal from "./TagSelectingModal";
import ActivityHourSelectingModal from "./ActivityHourSelectingModal";
import { TimePicker } from "../TimePicker";
import AddPhoto from "../AddPhoto";
import { primaryColor } from "../../data/color";
import { getTags } from "../../data/tag";
import ImagePreviewModal from "../misc/ImagePreviewModal";

import close_icon from "../../../assets/images/close_icon.png";

export function useQuestForm() {
  return useState({
    startDate: new Date(),
    endDate: new Date(),
    questName: "",
    description: "",
    activity: 0,
    activityHour: 1,
    image: null,
    isAuto: true,
    limitParticipants: false,
    maxParticipant: "",
    selectedTag: [],
  });
}

export function createQuestFormData(questForm) {
  const questDetail = new FormData();
  questDetail.append("timeStart", questForm.startDate.toISOString());
  questDetail.append("timeEnd", questForm.endDate.toISOString());
  questDetail.append("questName", questForm.questName);
  questDetail.append("description", questForm.description);

  if (questForm.limitParticipants) {
    questDetail.append("maxParticipant", questForm.maxParticipant);
  }

  questDetail.append("autoComplete", questForm.isAuto);

  if (questForm.image != null) {
    questDetail.append("img", {
      name: questForm.image.fileName,
      type: questForm.image.type,
      uri:
        Platform.OS === "ios"
          ? questForm.image.uri.replace("file://", "")
          : questForm.image.uri,
    });
  }

  if (questForm.activity != 0) {
    questDetail.append("activityHour[category]", questForm.activity);
    questDetail.append("activityHour[hour]", questForm.activityHour);
  }

  if (questForm.selectedTag.length) {
    questForm.selectedTag.forEach((tag) =>
      questDetail.append("tagId", tag._id)
    );
  }

  return questDetail;
}

export default function QuestDetailForm({
  startDate,
  endDate,
  questName,
  description,
  activity,
  activityHour,
  image,
  isAuto,
  limitParticipants,
  maxParticipant,
  selectedTag,
  setQuestForm,
}) {
  const [tags, setTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    <View>
      <ImagePreviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageUri={image?.uri}
      />

      <View style={styles.detailBox}>
        <View style={styles.box}>
          <Text style={styles.textMd}>ชื่อเควส</Text>
          <BottomSheetTextInput
            placeholder="ชื่อเควส..."
            style={styles.textIn}
            value={questName}
            onChangeText={(text) =>
              setQuestForm((prev) => ({ ...prev, questName: text }))
            }
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.textMd}>รายละเอียด</Text>
          <BottomSheetTextInput
            placeholder="รายละเอียด..."
            style={styles.textIn}
            value={description}
            onChangeText={(text) =>
              setQuestForm((prev) => ({ ...prev, description: text }))
            }
          />
        </View>
        <View style={{ ...styles.box, flex: 1 }}>
          <Text style={styles.textMd}>แท็ก</Text>
          <TagSelectingModal
            selectedTag={selectedTag}
            setSelectedTag={setQuestForm}
            tags={tags}
            setTags={setTags}
          />
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
            <ActivityHourSelectingModal
              activity={activity}
              setActivity={(act) =>
                setQuestForm((prev) => ({ ...prev, activity: act }))
              }
            />
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
              placeholder="1"
              style={[
                styles.textIn,
                {
                  color: activity != 0 ? "black" : "grey",
                  textAlign: "center",
                },
              ]}
              value={activity != 0 ? activityHour?.toString() : ""}
              onChangeText={(act) =>
                setQuestForm((prev) => ({ ...prev, activityHour: act }))
              }
              editable={activity != 0}
              inputMode="numeric"
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <TimePicker
            startDate={startDate}
            setStartDate={(date) =>
              setQuestForm((prev) => ({ ...prev, startDate: date }))
            }
            endDate={endDate}
            setEndDate={(date) =>
              setQuestForm((prev) => ({ ...prev, endDate: date }))
            }
          />
        </View>

        <Pressable
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 4,
            alignItems: "center",
          }}
          onPress={() =>
            setQuestForm((prev) => ({ ...prev, isAuto: !prev.isAuto }))
          }
        >
          <Checkbox
            color={primaryColor}
            value={isAuto}
            onValueChange={(v) =>
              setQuestForm((prev) => ({ ...prev, isAuto: v }))
            }
          />
          <Text style={styles.textMd}>ให้เควสจบอัตโนมัติเมื่อถึงเวลา</Text>
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
              onValueChange={(isLimit) =>
                setQuestForm((prev) => ({
                  ...prev,
                  limitParticipants: isLimit,
                }))
              }
            />
            <Text style={styles.textMd}>จำกัดจำนวนคน</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BottomSheetTextInput
              style={[styles.textIn, { width: 100, marginHorizontal: 10 }]}
              value={maxParticipant?.toString()}
              onChangeText={(maxP) =>
                setQuestForm((prev) => ({ ...prev, maxParticipant: maxP }))
              }
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
          <AddPhoto
            image={image}
            setImage={(img) =>
              setQuestForm((prev) => ({ ...prev, image: img }))
            }
          />
          {image && (
            <View style={styles.image}>
              <TouchableOpacity
                onPress={() =>
                  setQuestForm((prev) => ({ ...prev, image: null }))
                }
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
    </View>
  );
}

const styles = StyleSheet.create({
  textIn: {
    borderColor: "#CDCDCD",
    borderWidth: 1,
    padding: 4,
    backgroundColor: "#fbfbfb",
    borderRadius: 6,
    fontSize: 16,
    fontFamily: "Kanit300",
  },
  textMd: {
    fontSize: 16,
    fontFamily: "Kanit300",
  },
  box: {
    gap: 2,
  },
  detailBox: {
    gap: 10,
    marginBottom: 10,
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
