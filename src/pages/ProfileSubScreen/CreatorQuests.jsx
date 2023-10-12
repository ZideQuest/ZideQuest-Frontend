import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import back_icon from "../../../assets/images/leave_icon.png";
import QuestListItem from "../../components/QuestListItem";
import { getCratorQuests } from "../../data/Quest";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function MyQuests({ navigation }) {
  const [creatorQuest, setCreatorQuest] = useState({});

  useEffect(() => {
    const fetchCreatorQuestData = async () => {
      try {
        const data = await getCratorQuests();
        setCreatorQuest(data);
        console.log(creatorQuest);
      } catch (error) {
        console.error("Error fetching UserQuest", error);
      }
    };
    fetchCreatorQuestData();
  }, []);

  return (
    <View style={styles.allContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("CreatorProfile")}
        >
          <Image source={back_icon} style={{ width: "100%", height: "100%" }} />
        </Pressable>
        <Text style={styles.header}>เควสที่ฉันสร้าง</Text>
      </View>

      <BottomSheetScrollView style={styles.questListContainer}>
        {/* {creatorQuest.} */}
        <Pressable style={styles.byMonthQuest}>

        </Pressable>
      </BottomSheetScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    padding: 15,
    gap: 30,
    backgroundColor: "white",
    flex: 1,
  },
  headerContainer: {},
  background: {
    backgroundColor: "blue",
    borderBottomWidth: 2,
  },
  backButton: {
    position: "absolute",
    marginLeft: 15,
    top: 12,
    width: 17,
    height: 17,
    zIndex: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Kanit400",
  },
});
