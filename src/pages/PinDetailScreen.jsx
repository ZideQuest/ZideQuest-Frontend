import react from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { useAppContext } from "../data/AppContext";

import person_icon from "../../assets/images/participant.png";

const QUESTS = [
  {
    id: "asdasd",
    name: "first",
    status: "live",
    currentParticipant: 40,
    maxParticipant: 50,
  },
  {
    id: "aassad",
    name: "second",
    status: "live",
    currentParticipant: 50,
    maxParticipant: 50,
  },
  {
    id: "ghjhgj",
    name: "third",
    status: "not available",
    currentParticipant: 30,
    maxParticipant: 50,
  },
  {
    id: "ertret",
    name: "fourth",
    status: "not available",
    currentParticipant: 50,
    maxParticipant: 50,
  },
];

export default function PinDetailScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pin: {route.params?.pinId}</Text>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Quests</Text>
        <Text style={styles.addQuestButton}>เพิ่มเควส</Text>
      </View>
      <View style={styles.questListContainer}>
        {QUESTS.map((quest) => (
          <View
            key={quest.id}
            style={[
              styles.questItem,
              { opacity: quest.status == "live" ? 100 : 50 },
            ]}
          >
            <Text style={styles.questFont}>{quest.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={styles.questFont}>
                {quest.currentParticipant}/{quest.maxParticipant}
              </Text>
              <View style={styles.pic}>
                <Image source={person_icon} />
              </View>
              <View
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: quest.status == "live" ? "green" : "red",
                  borderRadius: "50%",
                }}
              ></View>
            </View>
          </View>
        ))}
      </View>
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
  header: {
    fontSize: 23,
    fontWeight: 600,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeaderText: {
    fontSize: 20,
  },
  addQuestButton: {
    backgroundColor: "#619B58",
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    color: "white",
    fontSize: 15,
  },
  questItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  pic: {
    width: 20,
    height: 20,
    // backgroundColor: "red"
    resizeMode: "contain",
  },
  questListContainer: {
    marginTop: 6,
    gap: 6,
    overflow: "scroll",
  },
  questFont: {
    fontSize: 16,
  },
});
