import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
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
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={styles.organize}>{userDetail.user.organizeName}</Text>
        </View>

        <View style={styles.active}>
          <Text style={styles.activeText}>Active Quests</Text>
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
    paddingTop: 5,
    position: "relative",
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  displayProfile: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: "hidden",
    borderWidth: 2,
  },
  questContainer: {
    gap: 7,
    paddingHorizontal: 10,
  },
  activeText: {
    paddingVertical: 3,
    fontFamily: "Kanit500",
    fontSize: 23,
  },
  active: {
    paddingHorizontal: 13,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    margin: 20,
    right: 0,
    zIndex: 10,
  },
  organize: {
    fontFamily: "Kanit300",
    fontSize: 40,
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
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  searchPlaceholder: {
    fontFamily: "Kanit300",
  },
});
