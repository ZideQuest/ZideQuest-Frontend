import { View, Text, StyleSheet, Pressable } from "react-native";

export default function MyQuests({ navigation }) {
  return (
    <View style={styles.profile}>
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Text>Back</Text>
      </Pressable>
      <Text>Quests 1</Text>
      <Text>Quests 1</Text>
      <Text>Quests 1</Text>
      <Text>Quests 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
