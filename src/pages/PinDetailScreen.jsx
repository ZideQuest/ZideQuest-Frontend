import { useState, useEffect } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import BackButton from "../components/button/BackButton.jsx";
import * as TabNavigation from "../data/TabNavigation.jsx";
import edit_icon from "../../assets/images/edit.png";

import DetailedQuestListItem from "../components/Quest/DetailedQuestListItem"; //

import { useAppContext } from "../data/AppContext";
import { getLocationData } from "../data/locations";
import { BGcolor, buttonNormalGreen } from "../data/color";

export default function PinDetailScreen({ route }) {
  const { userDetail, onlyPinWithMyQuest, setOnlyPinWithMyQuest } =
    useAppContext();
  const [locationData, setLocationData] = useState({});
  const [quests, setQuests] = useState([]);

  const NoQuestComponent = () => {
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
  };

  const NoMyQuestComponent = () => {
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
  };
  useEffect(() => {
    const fetchLocationData = async () => {
      if (!route.params?.pinId) {
        alert("Location Id not found");
        return TabNavigation.navigate("Recommend");
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
    if (ownerChecker()) {
      TabNavigation.navigate("EditLocation", { pinId: route.params.pinId });
    } else {
      alert("You are not allowed to edit this location");
    }
  };

  const ownerChecker = () => {
    if (
      userDetail.isAdmin === "admin" ||
      userDetail.user._id === locationData.creatorId
    ) {
      return true;
    } else {
      return false;
    }
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

    const filteredQuests = quests
      .filter((q) => q.isJoin)
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
    <Bottomsheet snapPoints={["20%", "60%", "83%"]} index={1}>
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
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.header}>
                {locationData.locationName?.replace(/\n/g, " ")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  gap: 10,
                }}
              >
                {userDetail.isAdmin && (
                  <TouchableOpacity
                    style={[
                      styles.editIcon,
                      { opacity: ownerChecker() ? 1 : 0.3 },
                    ]}
                    onPress={editLocationHandler}
                  >
                    <Image
                      source={edit_icon}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TouchableOpacity>
                )}
                <BackButton />
              </View>
            </View>
          </View>
          {locationData.description && (
            <Text style={styles.detail}>{locationData.description}</Text>
          )}
        </View>

        {locationData.picturePath && (
          <View style={styles.imageScrollContainer}>
            <Image style={styles.bannerImage} src={locationData.picturePath} />
          </View>
        )}

        <View style={styles.quests}>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>{quests.length} Quests</Text>
            <TouchableOpacity
              onPress={() => {
                TabNavigation.navigate("CreateQuest", {
                  locationId: locationData._id,
                });
              }}
              style={{ display: userDetail?.isAdmin ? "flex" : "none" }}
            >
              <Text style={styles.addQuestButton}>เพิ่มเควส +</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.questListContainer}>
            <QuestsComponent />
          </View>
        </View>
      </BottomSheetScrollView>
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    overflow: "scroll",
  },
  headerContainer: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingBottom: 4,
  },
  imageScrollContainer: {
    height: 220,
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 8,
    backgroundColor: "#EBEBE4",
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  bannerImage: {
    height: "100%",
    width: "100%",
  },
  bannerContainer: {
    height: "100%",
    width: 300,
    marginRight: 4,
  },
  quests: {
    paddingHorizontal: 17,
    gap: 5,
    paddingBottom: 40,
    marginTop: 7,
  },
  header: {
    fontSize: 25,
    fontFamily: "Kanit400",
    flex: 1,
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
    fontSize: 16,
    fontFamily: "Kanit300",
    // color: textColor,
  },
  addQuestButton: {
    backgroundColor: buttonNormalGreen,
    borderRadius: 5,
    overflow: "hidden",
    paddingVertical: 1,
    paddingHorizontal: 7,
    color: "white",
    fontFamily: "Kanit300",
  },
  questListContainer: {
    gap: 6,
    overflow: "scroll",
  },
  editIcon: {
    width: 25,
    height: 25,
    top: -5
  },
});
