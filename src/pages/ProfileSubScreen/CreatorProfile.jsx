import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import BackButton from "../../components/button/BackButton";
import AdminQuestListItem from "../../components/Quest/AdminQuestListItem";

import { useAppContext } from "../../data/AppContext";
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { getActiveQuests } from "../../data/Quest";

import Spinner from "../../components/Animations/Spinner";
import search_icon from "../../../assets/images/search.png";
import { buttonGrey } from "../../data/color";

export default function Profile({ navigation }) {
  const { userDetail } = useAppContext();
  const [quests, setQuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    const fetchQuest = async () => {
      setIsLoading(true);
      try {
        const quests = await getActiveQuests();
        setQuests(quests);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchQuest();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <BottomSheetScrollView stickyHeaderIndices={[1]}>
        <View style={styles.profileContainer}>
          <View style={styles.displayProfile}>
            <Image
              source={{ uri: userDetail.user.picturePath }}
              style={{ width: "100%", height: "100%", borderRadius: 65 }}
            />
          </View>
          <View>
            <Text style={styles.organize}>{userDetail.user.organizeName}</Text>
            <Text style={styles.role}>{userDetail.user.role}</Text>
          </View>
        </View>

        <View style={styles.active}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.activeText}>Active Quests</Text>
            <TouchableOpacity
              style={styles.allQuests}
              onPress={() => navigation.navigate("CreatorQuests")}
            >
              <Text style={styles.allQuestText}>All Quests</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </View>
        ) : (
          <View style={styles.questContainer}>
            <View style={styles.filterBoxContainer}>
              <View style={styles.searchIcon}>
                <Image
                  source={search_icon}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <BottomSheetTextInput
                style={styles.filterTextBox}
                placeholder="Search Quests..."
                placeholderStyle={styles.searchPlaceholder}
                value={search}
                onChangeText={(e) => setSearch(e)}
                clearButtonMode="always"
              />
            </View>
            {quests
              .filter((q) => !search || q.questName.includes(search))
              .map((q) => (
                <AdminQuestListItem quest={q} key={`active-quest-${q._id}`} />
              ))}
          </View>
        )}
      </BottomSheetScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 45,
    position: "relative",
  },
  profileContainer: {
    paddingBottom: 7,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 20,
  },
  displayProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "lightgray",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  questContainer: {
    gap: 8,
    paddingHorizontal: 10,
  },
  activeText: {
    paddingVertical: 3,
    fontFamily: "Kanit400",
    fontSize: 22,
  },
  active: {
    paddingHorizontal: 13,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    margin: 20,
    left: 0,
    zIndex: 10,
  },
  organize: {
    fontFamily: "Kanit400",
    fontSize: 28,
  },
  role: {
    fontFamily: "Kanit300",
    fontSize: 22,
  },
  filterBoxContainer: {
    // borderWidth: 1,
    borderRadius: 5,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: buttonGrey,
  },
  filterTextBox: {
    flex: 1,
    height: "100%",
    fontFamily: "Kanit300",
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  searchPlaceholder: {
    fontFamily: "Kanit300",
  },
  allQuests: {
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: buttonGrey,
    // borderRadius: 5,
    // borderWidth: 0.5,
    // paddingHorizontal: 3,
  },
  allQuestText: {
    fontFamily: "Kanit300",
    color: "teal",
  },
});
