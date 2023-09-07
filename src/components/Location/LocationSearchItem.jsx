import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { storeHistory } from "../../data/async_storage";
import { useAppContext } from "../../data/AppContext";

export default function LocationSearchItem({ location }) {
  const { mapMoveTo, setFocusedPin } = useAppContext();

  const queryPressHandler = () => {
    storeHistory(location.locationName);
    mapMoveTo(location.latitude, location.longitude)
    setFocusedPin(location._id)
    TabNavigation.navigate("PinDetail", { pinId: location._id });
  };

  return (
    <Pressable style={styles.container} onPress={queryPressHandler}>
      <View style={styles.imageContainer}>
        <Image src={location.picturePath} style={styles.image} />
      </View>
      <View style={styles.detail}>
        <View>
          <Text>{location.locationName}</Text>
        </View>
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
    height: "100%",
    borderBottomWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
