import react, { useState, useEffect } from "react";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import QuestListItem from "../components/QuestListItem"
import { useAppContext } from "../data/AppContext";
import * as TabNavigation from "../data/TabNavigation";
import { getLocationData } from "../data/locations";



const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

export default function PinDetailScreen({ route }) {
  const { userDetail } = useAppContext();
  const [locationData, setLocationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const { location, quests } = await getLocationData(route.params?.pinId);
        setLocationData(location);
        setQuests(quests);
      } catch (error) {
        console.log("Error fetching locations", error);
      }
    };
    fetchLocationData();
  }, []);

  const handleImageLoading = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <ShimmerPlaceHolder
          style={{ position: "absolute", width: "100%", height: "100%", zIndex:10}}
          visible={!loading}
        />
        <Image
          style={styles.bannerImage}
          source={{ uri: locationData.locationPicturePath }}
          onLoad={handleImageLoading}
        />
      </View>
      <View style={styles.quests}>
        <Text style={styles.header}>{locationData.locationName}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Quests</Text>
          <Pressable
            onPress={() => TabNavigation.navigate("CreateQuest")}
            style={{ display: userDetail.isAdmin ? "flex" : "none" }}
          >
            <Text style={styles.addQuestButton}>เพิ่มเควส</Text>
          </Pressable>
        </View>
        <View style={styles.questListContainer}>
          {quests.map((quest) => (
            <QuestListItem quest={quest}/>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  bannerContainer: {
    height: 220,
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    height: "100%",
    width: "100%",
  },
  quests: {
    paddingHorizontal: 23,
    paddingTop: 15,
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
    paddingVertical: 5,
    paddingHorizontal: 7,
    color: "white",
    fontSize: 15,
  },
  questListContainer: {
    marginTop: 6,
    gap: 6,
    overflow: "scroll",
    paddingLeft: 10,
  },
});
