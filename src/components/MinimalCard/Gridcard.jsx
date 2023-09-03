import { Image, StyleSheet, Text, View } from "react-native";
import MinimalCard from "./MinimalCard";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { getRecQuestData } from "../../data/quest_rec.js";

const GridCard = () => {
  const [questData, setQuestData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRecQuestData();
        // console.log(data);
        setQuestData(data);
      } catch (error) {
        console.error("Error fetching recommended quests:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.GridContainer}>
      <ScrollView overScrollMode="never">
        <View>
          {questData.map((item) => (
            <MinimalCard
              key={item._id}
              quest_name={item.questName}
              quest_image={item.picturePath}
              time={item.timeStart}
              timeEnd={item.timeEnd}
              location={item.locationId}
              creator_id={item.creatorId}
              countParticipant={item.countParticipant}
              maxParticipant={item.maxParticipant}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  GridContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GridCard;
