import react, { useState, useEffect } from "react";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

import QuestListItem from "../components/QuestListItem";
import BackButton from "../components/button/BackButton.jsx";
import * as TabNavigation from "../data/TabNavigation.jsx";

import { useAppContext } from "../data/AppContext";
import { getLocationData } from "../data/locations";
import { buttonNormalGreen } from "../data/color";

export default function PinDetailScreen({ route, navigation }) {
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
        console.error("Error fetching locations", error);
      }
    };
    fetchLocationData();
  }, []);

  return (
    <View>
      <Bottomsheet snapPoints={["20%", "60%", "90%"]} index={1}>
        <BottomSheetScrollView
          stickyHeaderIndices={[0]}
          style={{ backgroundColor: "white" }}
        >
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.header}>{locationData.locationName}</Text>
              <BackButton />
            </View>
            <Text style={styles.detail}>
              Choose two branches to see what’s changed or to start a new pull
              request.
            </Text>
          </View>

          <ScrollView style={styles.imageScrollContainer} horizontal>
            <View style={styles.bannerContainer}>
              <Image
                style={styles.bannerImage}
                src={locationData.picturePath}
              />
            </View>
            <View style={styles.bannerContainer}>
              <Image
                style={styles.bannerImage}
                src={locationData.picturePath}
              />
            </View>
          </ScrollView>
          <View style={styles.quests}>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Quests</Text>
              <Pressable
                onPress={() => {
                  TabNavigation.navigate("CreateQuest", {
                    locationId: locationData._id,
                  });
                }}
                style={{ display: userDetail?.isAdmin ? "flex" : "none" }}
              >
                <Text style={styles.addQuestButton}>เพิ่มเควส</Text>
              </Pressable>
            </View>
            <View style={styles.questListContainer}>
              {quests.map((quest) => (
                <QuestListItem
                  quest={quest}
                  key={quest._id}
                  isAdmin={userDetail?.isAdmin}
                  token={userDetail?.token}
                />
              ))}
            </View>
          </View>
        </BottomSheetScrollView>
      </Bottomsheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // flex: 1,
    overflow: "scroll",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    // marginBottom: 15,
    backgroundColor: "white",
  },
  imageScrollContainer: {
    height: 220,
    flexDirection: "row",
    // overflow: "scroll",
  },
  bannerContainer: {
    height: "100%",
    width: 300,
    marginRight: 4,
  },
  bannerImage: {
    height: "100%",
    width: "100%",
    // resizeMode: "stretch"
  },
  quests: {
    paddingHorizontal: 23,
    paddingTop: 15,
    gap: 5,
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    fontWeight: 700,
  },
  detail: {
    fontSize: 15,
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
    backgroundColor: buttonNormalGreen,
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
