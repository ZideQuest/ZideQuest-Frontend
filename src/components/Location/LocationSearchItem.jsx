import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { storeHistory } from "../../data/async_storage";
import { useAppContext } from "../../data/AppContext";
import pin_icon from "../../../assets/images/pin_icon.png";

export default function LocationSearchItem({ locations }) {
  const { mapMoveTo, setFocusedPin, getNavigator, bottomModalRef } = useAppContext();

  const queryPressHandler = (location) => {
    storeHistory(location.locationName);
    mapMoveTo(location.latitude, location.longitude);
    setFocusedPin(location._id);
    TabNavigation.navigate("PinDetail", { pinId: location._id });
  };

  const navigatorHandler = (location) => {
    getNavigator(true, location)
    bottomModalRef.current?.snapToIndex(0)
  }

  if (locations?.length > 0) {
    return (
      <View style={styles.searchResultCategory}>
        <Text style={styles.categoryText}>สถานที่</Text>
        {locations.map((location) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => queryPressHandler(location)}
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
              <TouchableOpacity onPress={() => navigatorHandler(location)}>
                <Text>Get direction</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
