import { StyleSheet, Text, View } from "react-native";

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
import QuestDetailForm, {
  createQuestFormData,
  useQuestForm,
} from "../../components/Quest/QuestDetailForm";

export default function QuestEditing() {
  const [questForm, setQuestForm] = useQuestForm();

  const route = useRoute();
  const { questId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [locationId, setLocationId] = useState(null);

  const buttonHandler = async (e) => {
    setIsLoading(true);
    try {
      const questDetail = createQuestFormData(questForm);
      await editQuest(questDetail, questId);
      setIsLoading(false);
      TabNavigation.navigate("QuestManage", { questId: questId });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
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
          isAuto: data.autoComplete || false,
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
  textXl: {
    fontSize: 30,
    fontFamily: "Kanit400",
  },
});
