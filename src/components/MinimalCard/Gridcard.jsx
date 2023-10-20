import { StyleSheet, Text, View } from "react-native";
import MinimalCard from "./MinimalCard";
import React, { useEffect, useState } from "react";
import { getRecQuestData } from "../../data/quest_rec.js";
import { primaryColor, textColor } from "../../data/color";
import { Divider } from "@rneui/themed";

const GridCard = () => {
  const [questData, setQuestData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getRecQuestData();
      setQuestData(data);
    } catch (error) {
      console.error("Error fetching recommended quests:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.GridContainer}>
      <Divider style={{ paddingVertical: 3, backgroundColor: "white" }} />
      <Text style={styles.header}>เควสแนะนำ ✨</Text>
      {questData.map((item) => (
        <MinimalCard key={item._id} quest={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  GridContainer: {
    backgroundColor: "#F2F2F2",
  },
  header: {
    backgroundColor: "white",
    fontFamily: "Kanit400",
    color: primaryColor,
    paddingLeft: 10,
    fontSize: 27,
    paddingTop: 5,
  },
});

export default GridCard;
