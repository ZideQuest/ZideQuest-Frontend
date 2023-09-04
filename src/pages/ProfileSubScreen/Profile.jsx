import { View, Text, StyleSheet, Pressable } from "react-native";
import * as TabNavigation from "../../data/TabNavigation";

export default function Profile({ navigation }) {
  return (
    <View style={styles.profile}>
      <Pressable
        onPress={() => TabNavigation.navigate("Recommend")}
        style={styles.exit}
      >
        <Text>Exit</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Quests")}
        style={styles.exit}
      >
        <Text>Quests</Text>
      </Pressable>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
