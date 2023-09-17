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

export default function MyQuests({ navigation }) {
  const [UserQuest, setUserQuest] = useState({});
  const { userDetail } = useAppContext();
  const [indexCurrent, setindexCurrent] = useState(4);
  const [indexSuccess, setindexSuccess] = useState(4);
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
    pressCurrent ? setindexCurrent(4) : setindexCurrent(newindexCurrent);
  };

  const seeMoreSuccess = () => {
    setpressSuccess(!pressSuccess);
    pressSuccess ? setindexSuccess(4) : setindexSuccess(newindexSuccess);
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

      <ScrollView style={styles.scrollView}>
        <View style={styles.questList}>
          <Text style={styles.questHeader}>เควสที่กำลังเข้าร่วม</Text>
          {/* {UserQuest.currentQuest?.map((quest)=>console.log(quest.quest.questName))}
          {console.log(UserQuest.currentQuest?.length)} */}
          {UserQuest.currentQuest?.length > 4 ? (
            <View style={styles.questListContainer}>
              {UserQuest.currentQuest?.slice(0, indexCurrent).map((quest) => (
                <QuestListItem
                  quest={quest.quest}
                  key={`myquest-${quest.quest._id}`}
                  isAdmin={userDetail?.isAdmin}
                  panMap={true}
                />
              ))}
              <View style={styles.seeMoreContainer}>
                <Pressable
                  style={styles.seeMoreButton}
                  onPress={seeMoreCurrent}
                >
                  <Text style={styles.seeMoreText}>
                    {pressCurrent ? "see less" : "see more"}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.questListContainer}>
              {UserQuest.currentQuest?.map((quest) => (
                <QuestListItem
                  quest={quest.quest}
                  key={quest._id}
                  isAdmin={userDetail?.isAdmin}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.questList}>
          <Text style={styles.questHeader}>เควสที่เข้าร่วมสำเร็จ</Text>
          {UserQuest.successQuest?.length > 4 ? (
            <View style={styles.questListContainer}>
              {UserQuest.successQuest?.slice(0, indexSuccess).map((quest) => (
                <QuestListItem
                  quest={quest.quest}
                  key={`myquest-${quest.quest._id}`}
                  isAdmin={userDetail?.isAdmin}
                  panMap={true}
                />
              ))}
              <View style={styles.seeMoreContainer}>
                <Pressable
                  style={styles.seeMoreButton}
                  onPress={seeMoreSuccess}
                >
                  <Text style={styles.seeMoreText}>
                    {pressSuccess ? "see less" : "see more"}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.questListContainer}>
              {UserQuest.successQuest?.map((quest) => (
                <QuestListItem
                  quest={quest.quest}
                  key={quest._id}
                  isAdmin={userDetail?.isAdmin}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    padding: 15,
    gap: 20,
    backgroundColor: "white",
    flex: 1,
  },
  questList: {
    gap: 7,
  },
  questHeader: {
    borderBottomWidth: 2,
    borderColor: "#E1E1E1",
    fontWeight: "bold",
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: "yellow",
    flexDirection: "row",
    alignItems: "center",
  },
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
    gap: 9,
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
  },
  scrollView: {
    backgroundColor: "pink",
    height:150
    // margin:3
  },
});
