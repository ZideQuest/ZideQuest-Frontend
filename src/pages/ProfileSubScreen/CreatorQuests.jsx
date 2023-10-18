import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import back_icon from "../../../assets/images/leave_icon.png";
import sortDown from "../../../assets/images/sortDown.png";
import AdminQuestListItem from "../../components/Quest/AdminQuestListItem";
import { getCratorQuests } from "../../data/Quest";
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import search_icon from "../../../assets/images/search.png";
import { buttonGrey } from "../../data/color";
import { Dropdown } from "react-native-element-dropdown";

export default function CreatorQuests({ navigation }) {
  const [creatorQuest, setCreatorQuest] = useState([]);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    const fetchCreatorQuestData = async () => {
      try {
        const data = await getCratorQuests();
        setCreatorQuest(data);
      } catch (error) {
        console.error("Error fetching UserQuest", error);
      }
    };
    fetchCreatorQuestData();
  }, []);

  const data = [
    { label: "Oldest Quest - Newest Quest", value: "1" },
    { label: "Newest Quest - Oldest Quest", value: "2" },
  ];
  const [value, setValue] = useState(1);

  return (
    <View style={styles.allContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("CreatorProfile")}
        >
          <Image source={back_icon} style={{ width: "100%", height: "100%" }} />
        </Pressable>
        <Text style={styles.header}>เควสที่ฉันสร้าง</Text>
      </View>

      <View style={styles.searchAndSortContainer}>
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
        {/* {console.log(value)} */}
      </View>
      <Dropdown
        style={styles.dropdown}
        iconStyle={styles.iconStyle}
        placeholderStyle={styles.searchPlaceholder}
        selectedTextStyle={styles.searchPlaceholder}
        containerStyle={styles.containerStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Oldest Quest - Newest Quest"
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <Image source={sortDown} style={styles.iconStyle} />
        )}
      />
      <BottomSheetScrollView style={styles.questListContainer}>
        <View style={styles.questListItemContainer}>
          {value == 1
            ? creatorQuest
                .filter((quest) => !search || quest.questName.includes(search))
                .map((quest) => (
                  <AdminQuestListItem
                    quest={quest}
                    key={`all-quest-${quest._id}`}
                  />
                ))
            : creatorQuest
                .slice()
                .reverse()
                .filter((quest) => !search || quest.questName.includes(search))
                .map((quest) => (
                  <AdminQuestListItem
                    quest={quest}
                    key={`all-quest-${quest._id}`}
                  />
                ))}
        </View>
      </BottomSheetScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    padding: 15,
    gap: 7,
    backgroundColor: "white",
    flex: 1,
  },
  headerContainer: {
    borderBottomColor: "E1E1E1",
  },
  backButton: {
    position: "absolute",
    marginLeft: 15,
    top: 12,
    width: 17,
    height: 17,
    zIndex: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Kanit400",
  },
  questListItemContainer: {
    gap: 5,
  },
  sortContainer: {
    flexDirection: "row",
  },
  searchPlaceholder: {
    fontFamily: "Kanit300",
  },
  filterBoxContainer: {
    borderRadius: 5,
    height: 35,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: buttonGrey,
  },
  sortButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: buttonGrey,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  searchAndSortContainer: {
    flexDirection: "row",
    gap: 3,
  },
  dropdown: {
    borderRadius: 5,
    backgroundColor: buttonGrey,
    paddingHorizontal: 3,
    paddingVertical: 2,
    alignItems: "center",
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  containerStyle: {
    fontFamily: "Kanit300",
  },
});
