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
        {questData.map((item) => (
          <MinimalCard key={item._id} quest={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  GridContainer: {},
});

export default GridCard;
