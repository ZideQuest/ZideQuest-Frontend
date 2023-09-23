import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import back_icon from "../../../assets/images/leave_icon.png";
import QuestListItem from "../../components/QuestListItem";
import { getCratorQuests } from "../../data/Quest";

export default function MyQuests() {
  const [creatorQuest, setCreatorQuest] = useState({});

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

  return <View style={styles}></View>;
}

const styles = StyleSheet.create({});
