import { StyleSheet, Text, View, Platform } from "react-native";

import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import BottomsheetDynamic from "../../components/Bottomsheet/BottomsheetDynamic";
import Spinner from "../../components/Animations/Spinner";
import BigButton from "../../components/button/BigButton.jsx";
import BackButton from "../../components/button/BackButton";

import { buttonOrange } from "../../data/color";
import { getQuestData, editQuest } from "../../data/Quest";
import * as TabNavigation from "../../data/TabNavigation";

import CancelQuest from "../../components/Quest/CancelQuest";
import QuestDetailForm from "../../components/Quest/QuestDetailForm";

export default function QuestEditing() {
  const [questForm, setQuestForm] = useState({
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

  const route = useRoute();
  const { questId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [locationId, setLocationId] = useState(null);

  const buttonHandler = async (e) => {
    setIsLoading(true);
    try {
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

      console.log(questDetail);
      const newQuest = await editQuest(questDetail, locationId);
      setIsLoading(false);
      TabNavigation.navigate("QuestManage", { questId: newQuest._id });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("failed to edit quest", error);
    }
  };

  useEffect(() => {
    const getQuest = async () => {
      try {
        const data = await getQuestData(questId);
        setLocationId(data.locationId);

        setQuestForm({
          startDate: new Date(data.timeStart),
          endDate: new Date(data.timeEnd),
          questName: data.questName,
          description: data.description,
          activity: data.activityHour?.category || 0,
          activityHour: data.activityHour?.hour || 1,
          image: data.picturePath ? { uri: data.picturePath } : null,
          isAuto: data.autoComplete,
          limitParticipants: !!data.maxParticipant,
          maxParticipant: data.maxParticipant,
          selectedTag: data.tag,
        });
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
                  questName={questForm.questName}
                />
              </View>
              <BackButton
                targetRoute="QuestManage"
                params={{ questId: route.params.questId }}
                resetFocus={false}
              />
            </View>

            <QuestDetailForm {...questForm} setQuestForm={setQuestForm} />

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
    fontFamily: "Kanit300",
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
