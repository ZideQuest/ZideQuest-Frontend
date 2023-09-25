import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import back_icon from "../../../assets/images/leave_icon.png";
import QuestListItem from "../../components/QuestListItem";
import { usersQuest } from "../../data/Quest";
import { useAppContext } from "../../data/AppContext";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function MyQuests({ navigation }) {
  const [UserQuest, setUserQuest] = useState({});
  const { userDetail } = useAppContext();
  const [indexCurrent, setindexCurrent] = useState(5);
  const [indexSuccess, setindexSuccess] = useState(5);
  const [pressCurrent, setpressCurrent] = useState(false);
  const [pressSuccess, setpressSuccess] = useState(false);
  const newindexCurrent = UserQuest.currentQuest?.length;
  const newindexSuccess = UserQuest.successQuest?.length;

  useEffect(() => {
    const fetchUserQuestData = async () => {
      try {
        const data = await usersQuest();
        setUserQuest(data);
      } catch (error) {
        console.error("Error fetching UserQuest", error);
      }
    };
    fetchUserQuestData();
  }, []);

  const seeMoreCurrent = () => {
    setpressCurrent(!pressCurrent);
    pressCurrent ? setindexCurrent(5) : setindexCurrent(newindexCurrent);
  };

  const seeMoreSuccess = () => {
    setpressSuccess(!pressSuccess);
    pressSuccess ? setindexSuccess(5) : setindexSuccess(newindexSuccess);
  };

  return (
    <View style={styles.allContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={back_icon} style={{ width: "100%", height: "100%" }} />
        </Pressable>
        <Text style={styles.header}>เควสของฉัน</Text>
      </View>

      <View style={styles.questContainer}>
        <View style={styles.questList}>
          <Text style={styles.questHeader}>เควสที่กำลังเข้าร่วม</Text>
          <BottomSheetScrollView style={styles.questListContainer}>
            <View style={styles.questListItemContainer}>
              {UserQuest.currentQuest?.map((quest) => (
                <QuestListItem
                  quest={quest.quest}
                  key={`my-active-quests-${quest.quest._id}`}
                  isAdmin={userDetail?.isAdmin}
                />
              ))}
            </View>
          </BottomSheetScrollView>
        </View>

        <View style={styles.questList}>
          <Text style={styles.questHeader}>เควสที่เข้าร่วมสำเร็จ</Text>
          <BottomSheetScrollView style={styles.questListContainer}>
            <View style={styles.questListItemContainer}>
              {UserQuest.successQuest?.map((quest) => (
                <QuestListItem
                  quest={quest.quest}
                  key={`my-done-quests-${quest.quest._id}`}
                  isAdmin={userDetail?.isAdmin}
                />
              ))}
            </View>
          </BottomSheetScrollView>
        </View>
      </View>
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
  questList: {
    gap: 7,
    // backgroundColor: "green",
    flex: 1,
    marginBottom: 10,
  },
  questHeader: {
    borderBottomWidth: 2,
    borderColor: "#E1E1E1",
    fontWeight: "bold",
    fontSize: 15,
    // marginTop:10,
    fontFamily: "Kanit400",
    fontSize: 16,
  },
  header: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Kanit400",
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
  questListContainer: {
    // backgroundColor: "red",
    // top:10
    // bottom:10
  },
  seeMoreButton: {
    borderRadius: 10,
    backgroundColor: "#D4D4D4",
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  seeMoreContainer: {
    alignItems: "center",
  },
  seeMoreText: {
    textAlign: "center",
    fontFamily: "Kanit300",
  },
  questContainer: {
    flex: 1,
    gap: 20,
    bottom: 20,
    // backgroundColor:"gray"
  },
  questListItemContainer: {
    gap: 6,
    // backgroundColor:"red",
  },
});
