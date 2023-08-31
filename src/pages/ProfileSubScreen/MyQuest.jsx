import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable ,Image} from "react-native";
import back_icon from "../../../assets/images/leave_icon.png";
import QuestListItem from "../../components/QuestListItem";
import { buttonGrey } from "../../data/color";
import {userQuest} from "../../data/userQuest.js"
import { useAppContext } from "../../data/AppContext";

export default function MyQuests({ navigation }) {
  const [UserQuest, setUserQuest] = useState({});
  const { userDetail } = useAppContext();

  useEffect(() => {
    const fetchUserQuestData = async () => {
      try {
        const data = await userQuest();
        setUserQuest(data);
      } catch (error) {
        console.error("Error fetching UserQuest", error);
      }
    };
    fetchUserQuestData();
  }, []);

  return (
    <View style={styles.allContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate("Profile")}>
          <Image source = {back_icon} style={{ width: "100%", height:"100%"}}/>
        </Pressable>
        <Text style={styles.header}>เควสของฉัน</Text>
      </View>
      
      <View style={styles.questList}>
        <Text style={styles.questHeader}>เควสที่กำลังเข้าร่วม</Text>
        <View style={styles.questListContainer}>
          {/* {UserQuest.currentQuest?.map((quest) => (
            <QuestListItem quest={quest} key={quest._id} isAdmin={userDetail?.isAdmin} />
            
          ))} */}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
        </View>
      </View>
      
      <View style={styles.questList}>
        <Text style={styles.questHeader}>เควสที่เข้าร่วมสำเร็จ</Text>
        <View style={styles.questListContainer}>
          {/* {UserQuest.successQuest?.map((quest) => (
            <QuestListItem quest={quest} key={quest._id} isAdmin={userDetail?.isAdmin} />
          ))} */}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
          {UserQuest.currentQuest && <QuestListItem quest={UserQuest.currentQuest[0]} isAdmin={userDetail?.isAdmin} />}
        </View>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  allContainer:{
    padding:15,
    gap:20,
    backgroundColor:"white",
    flex:1,
  },
  questList:{
    gap:7,
  },
  questHeader:{
    borderBottomWidth:2,
    borderColor:"#E1E1E1",
  },
  header: {
    textAlign:"center",
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },
  headerContainer:{
    backgroundColor:"yellow",
    flexDirection:"row",
    alignItems:"center",
  }, 
  background:{
    backgroundColor:"blue",
    borderBottomWidth:2,
  },
  backButton:{
    position:"absolute",
    marginLeft:15,
    top:13,
    width: 17,
    height: 17,
    zIndex:20
  },
  questListContainer:{
    gap:7,
  }
});
