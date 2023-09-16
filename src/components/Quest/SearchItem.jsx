import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { storeHistory } from "../../data/async_storage";
import { timeConv } from "../../data/time/time";
import { useAppContext } from "../../data/AppContext";
import { textColor } from "../../data/color";
import warning_icon from "../../../assets/images/warning_icon.png";

export default function SearchItem({ quests, isAdmin }) {
  const { mapMoveTo, setFocusedPin, userDetail } = useAppContext();

  const queryPressHandler = (quest) => {
    storeHistory(quest.questName);

    if (isAdmin) {
      TabNavigation.navigate("QuestManage", { questId: quest._id });
      mapMoveTo(quest.locationId?.latitude, quest.locationId?.longitude);
      setFocusedPin(quest.locationId?._id);
    } else if (userDetail?.token != null) {
      TabNavigation.navigate("QuestDetail", { questId: quest._id });
      mapMoveTo(quest.locationId?.latitude, quest.locationId?.longitude);
      setFocusedPin(quest.locationId?._id);
    } else {
      alert("กรุณา login");
      return;
    }
  };

  if (quests?.length > 0) {
    return (
      <View style={styles.searchResultCategory}>
        <Text style={styles.categoryText}>เควส</Text>
        {quests.map((quest) => (
          <Pressable
            style={styles.container}
            onPress={() => queryPressHandler(quest)}
            key={`search-${quest._id}`}
          >
            <View style={styles.imageContainer}>
              <Image
                source={
                  quest.picturePath ? { uri: quest.picturePath } : warning_icon
                }
                style={styles.image}
              />
            </View>
            <View style={styles.detail}>
              <View>
                <Text>{quest.questName}</Text>
                <Text>{quest.description}</Text>
              </View>
              <Text>{timeConv(quest.timeStart)}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    );
  }

  return;
}

const styles = StyleSheet.create({
  searchResultCategory: {
    marginBottom: 10,
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  categoryText: {
    fontFamily: "Kanit400",
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  imageContainer: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detail: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
