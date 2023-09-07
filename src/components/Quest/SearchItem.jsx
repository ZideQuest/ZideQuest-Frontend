import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { storeHistory } from "../../data/async_storage";
import { timeConv } from "../../data/time/time";
import { useAppContext } from "../../data/AppContext";

export default function SearchItem({ quest, isAdmin }) {
  const { mapMoveTo, setFocusedPin, userDetail } = useAppContext();

  const queryPressHandler = () => {
    storeHistory(quest.questName);
    mapMoveTo(quest.locationId?.latitude, quest.locationId?.longitude);
    setFocusedPin(quest.locationId?._id);

    if (isAdmin) {
      TabNavigation.navigate("QuestManage", { questId: quest._id });
    } else if (userDetail?.token != null) {
      TabNavigation.navigate("QuestDetail", { questId: quest._id });
    } else {
      alert("กรุณา login");
      return;
    }
  };

  return (
    <Pressable style={styles.container} onPress={queryPressHandler}>
      <View style={styles.imageContainer}>
        <Image src={quest.picturePath} style={styles.image} />
      </View>
      <View style={styles.detail}>
        <View>
          <Text>{quest.questName}</Text>
          <Text>{quest.description}</Text>
        </View>
        <Text>{timeConv(quest.timeStart)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 10,
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
