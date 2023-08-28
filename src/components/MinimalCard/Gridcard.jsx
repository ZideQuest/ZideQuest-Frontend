import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import MinimalCard from "./MinimalCard";
import React, { useEffect, useState } from "react";
import testdata from "./testdata";
import { ScrollView } from "react-native-gesture-handler";

const GridCard = () => {
  return (
    <View style={styles.GridContainer}>
      <ScrollView>
        <View>
          {testdata.map((item) => (
            <MinimalCard
              quest_name={item.quest_name}
              quest_image={item.quest_image}
              time={item.time}
              location={item.location}
              user_level={item.user_level}
              user_name={item.user_name}
              user_image={item.user_image}
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
