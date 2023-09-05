import { Image, StyleSheet, Text, View } from "react-native";
import MinimalCard from "./MinimalCard";
import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
import { getRecQuestData } from "../../data/quest_rec.js";
import { useAppContext } from "../../data/AppContext";

const GridCard = () => {
  const [questData, setQuestData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { userDetail } = useAppContext();

  const fetchData = async () => {
    try {
      const data = await getRecQuestData();
      // console.log(data);
      setQuestData(data);
    } catch (error) {
      console.error("Error fetching recommended quests:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView
      overScrollMode="never"
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.GridContainer}>
        <View>
          {questData.map((item) => (
            <MinimalCard
              key={item._id}
              _id={item._id}
              quest_name={item.questName}
              quest_image={item.picturePath}
              time={item.timeStart}
              timeEnd={item.timeEnd}
              location={item.locationId.locationName}
              creator_picture={item.creatorId.picturePath}
              countParticipant={item.countParticipant}
              maxParticipant={item.maxParticipant}
              isAdmin={userDetail?.isAdmin}
              token={userDetail?.token}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  GridContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GridCard;
