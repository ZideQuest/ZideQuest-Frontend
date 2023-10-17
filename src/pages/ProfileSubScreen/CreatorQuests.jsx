import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import back_icon from "../../../assets/images/leave_icon.png";
import AdminQuestListItem from "../../components/Quest/AdminQuestListItem";
import { getCratorQuests } from "../../data/Quest";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useAppContext } from "../../data/AppContext";

export default function CreatorQuests({ navigation }) {
  const [creatorQuest, setCreatorQuest] = useState([]);
  const { userDetail } = useAppContext();
  useEffect(() => {
    const fetchCreatorQuestData = async () => {
      try {
        const data = await getCratorQuests();
        setCreatorQuest(data);
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
        <View style={styles.questListItemContainer}>
          {creatorQuest.map((quest) => (
            <AdminQuestListItem quest={quest} key={`all-quest-${quest._id}`} />
          ))}
        </View>
      </BottomSheetScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    padding: 15,
    gap: 15,
    backgroundColor: "white",
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: "blue",
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
  questListItemContainer: {
    // backgroundColor: "blue",
    gap: 5,
  },
});
