import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { storeHistory } from "../../data/async_storage";
import { useAppContext } from "../../data/AppContext";
import pin_icon from "../../../assets/images/pin_icon.png";

export default function LocationSearchItem({ locations }) {
  const { mapMoveTo, setFocusedPin } = useAppContext();

  const queryPressHandler = (location) => {
    storeHistory(location.locationName);
    mapMoveTo(location.latitude, location.longitude);
    setFocusedPin(location._id);
    TabNavigation.navigate("PinDetail", { pinId: location._id });
  };

  if (locations?.length > 0) {
    return (
      <View style={styles.searchResultCategory}>
        <Text style={styles.categoryText}>สถานที่</Text>
        {locations.map((location) => (
          <Pressable
            style={styles.container}
            onPress={() => queryPressHandler(location)}
            key={`search-${location._id}`}
          >
            <View style={styles.imageContainer}>
              <Image
                source={
                  location.picturePath
                    ? { uri: location.picturePath }
                    : pin_icon
                }
                style={styles.image}
              />
            </View>
            <View style={styles.detail}>
              <View>
                <Text>{location.locationName}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    );
  }
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
    height: "100%",
    borderBottomWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
