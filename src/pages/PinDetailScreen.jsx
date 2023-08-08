import react from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { useAppContext } from "../data/AppContext";

export default function PinDetailScreen({route ,navigation}) {

  const {userDetail} = useAppContext();

  const questPressHandler = (questId) => {
    if (userDetail.isAdmin) {
      return navigation.navigate("Participant", {questId})
    } 
    navigation.navigate("QuestDetail", {questId})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Pin: {route.params?.pinId}</Text>
      <Pressable onPress={() => questPressHandler(1)}>
        <Text>Quest 1</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    flex: 1,
  },
  textColor: {
    color: "black",
  },
});
