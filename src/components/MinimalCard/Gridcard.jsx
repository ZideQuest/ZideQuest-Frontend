import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import MinimalCard from "./MinimalCard";
import React, { useEffect, useState } from "react";
import testdata from "./testdata";
import { ScrollView } from "react-native-gesture-handler";
import { getRecQuestData } from "../../data/quest_rec";

const GridCard = () => {
  //   const [questData, setQuestData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const data = await getRecQuestData();
  //         console.log(data);
  //         setQuestData(data);
  //       } catch (error) {
  //         console.error("Error fetching recommended quests:", error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  return (
    <View style={styles.GridContainer}>
      <ScrollView overScrollMode="never">
        <View>
          {testdata.map((item) => (
            <MinimalCard
              quest_name={item.quest_name}
              quest_image={item.quest_image}
              time={item.time}
              timeEnd={item.timeEnd}
              location={item.location}
              user_name={item.user_name}
              user_image={item.user_image}
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
