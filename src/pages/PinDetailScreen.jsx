import { useState, useEffect } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import QuestListItem from "../components/QuestListItem";
import BackButton from "../components/button/BackButton.jsx";
import * as TabNavigation from "../data/TabNavigation.jsx";
import edit_icon from "../../assets/images/edit.png";

import DetailedQuestListItem from "../components/Quest/DetailedQuestListItem"; //

import { useAppContext } from "../data/AppContext";
import { getLocationData } from "../data/locations";
import { buttonNormalGreen } from "../data/color";

export default function PinDetailScreen({ route }) {
  const { userDetail, onlyPinWithMyQuest, setOnlyPinWithMyQuest } =
    useAppContext();
  const [locationData, setLocationData] = useState({});
  const [quests, setQuests] = useState([]);

  function NoQuestComponent() {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
      >
        <Text style={{ fontFamily: "Kanit400", color: "grey", fontSize: 25 }}>
          ยังไม่มีเควสในบริเวณนี้...
        </Text>
      </View>
    );
  }

  function NoMyQuestComponent() {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
      >
        <Text style={{ fontFamily: "Kanit400", color: "grey", fontSize: 25 }}>
          ไม่มีเควสของคุณในบริเวณนี้...
        </Text>
        <TouchableOpacity onPress={() => setOnlyPinWithMyQuest(false)}>
          <Text style={{ fontFamily: "Kanit300", color: "teal", fontSize: 16 }}>
            ดูเควสทั้งหมด
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  useEffect(() => {
    const fetchLocationData = async () => {
      if (!route.params?.pinId) {
        alert("Location Id not found")
        return TabNavigation.navigate("Recommend")
      }
      try {
        const { location, quests } = await getLocationData(route.params?.pinId);
        setLocationData(location);
        setQuests(quests);
      } catch (error) {
        alert("Error fetching locations");
      }
    };
    fetchLocationData();
  }, []);

  const editLocationHandler = () => {
    TabNavigation.navigate("EditLocation", { pinId: route.params.pinId });
  };

  const QuestsComponent = () => {
    if (quests.length == 0) {
      return <NoQuestComponent />;
    }

    if (!onlyPinWithMyQuest) {
      return quests.map((quest) => (
        <DetailedQuestListItem
          quest={quest}
          key={quest._id}
          isAdmin={userDetail?.isAdmin}
        />
      ));
    }

    const myQuests = userDetail.user?.joinedQuest.map((q) => q._id);

    const filteredQuests = quests
      .filter((q) => myQuests.includes(q._id))
      .map((quest) => (
        <DetailedQuestListItem
          quest={quest}
          key={quest._id}
          isAdmin={userDetail?.isAdmin}
        />
      ));

    if (filteredQuests.length == 0) {
      return <NoMyQuestComponent />;
    }

    return filteredQuests;
  };

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
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={styles.header}>{locationData.locationName}</Text>
                {userDetail.isAdmin && (
                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={editLocationHandler}
                  >
                    <Image
                      source={edit_icon}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <BackButton />
            </View>
            {locationData.description && (
              <Text style={styles.detail}>{locationData.description}</Text>
            )}
          </View>

          {locationData.picturePath && (
            <View style={styles.imageScrollContainer}>
              <Image
                style={styles.bannerImage}
                src={locationData.picturePath}
              />
            </View>
          )}
          {/* <ScrollView style={styles.imageScrollContainer} horizontal>
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
          </ScrollView> */}

          <View style={styles.quests}>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Quests</Text>
              <TouchableOpacity
                onPress={() => {
                  TabNavigation.navigate("CreateQuest", {
                    locationId: locationData._id,
                  });
                }}
                style={{ display: userDetail?.isAdmin ? "flex" : "none" }}
              >
                <Text style={styles.addQuestButton}>เพิ่มเควส</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.questListContainer}>
              <QuestsComponent />
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
    overflow: "scroll",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "white",
  },
  imageScrollContainer: {
    height: 220,
    flexDirection: "row",
  },
  bannerContainer: {
    height: "100%",
    width: 300,
    marginRight: 4,
  },
  bannerImage: {
    height: "100%",
    width: "100%",
  },
  quests: {
    paddingHorizontal: 23,
    paddingTop: 15,
    gap: 5,
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    fontFamily: "Kanit400",
  },
  detail: {
    fontSize: 16,
    fontFamily: "Kanit300",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeaderText: {
    fontSize: 20,
    fontFamily: "Kanit300",
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
  editIcon: {
    width: 25,
    height: 25,
    top: 5,
  },
});
