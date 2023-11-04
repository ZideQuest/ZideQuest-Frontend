import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { createQuest } from "../data/Quest";

import Spinner from "../components/Animations/Spinner";
import BigButton from "../components/button/BigButton.jsx";
import BackButton from "../components/button/BackButton";
import { buttonOrange } from "../data/color";
import * as TabNavigation from "../data/TabNavigation";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import QuestDetailForm, {
  createQuestFormData,
  useQuestForm,
} from "../components/Quest/QuestDetailForm";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

function CreateQuest() {
  const route = useRoute();
  const { locationId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [questForm, setQuestForm] = useQuestForm();

  const buttonHandler = async (e) => {
    setIsLoading(true);
    try {
      const questDetail = createQuestFormData(questForm);
      // console.log(questDetail);
      const newQuest = await createQuest(questDetail, locationId);
      setIsLoading(false);
      TabNavigation.navigate("QuestManage", { questId: newQuest._id });
    } catch (error) {
      setIsLoading(false);
      alert("failed to create quest", error);
    }
  };

  return (
    <BottomsheetDynamic style={styles.container} snapPoints={["20%"]} index={1}>
      {isLoading ? (
        <Spinner />
      ) : (
        <BottomSheetScrollView>
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.textXl}>เพิ่มเควสใหม่</Text>
              <BackButton
                targetRoute="PinDetail"
                params={{ pinId: locationId }}
                resetFocus={false}
              />
            </View>

            <QuestDetailForm {...questForm} setQuestForm={setQuestForm} />

            <BigButton
              bg={buttonOrange}
              text="สร้างกิจกรรม"
              onPress={buttonHandler}
            />
          </View>
        </BottomSheetScrollView>
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

export default CreateQuest;
