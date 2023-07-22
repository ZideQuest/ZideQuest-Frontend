import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";

import RecommendScreen from "./RecommendScreen";
import CreatePinScreen from "./CreatePinScreen";
import Map from "../components/Map";

import { useState } from "react";

export default function HomeScreen() {
  const [newMarker, setNewMarker] = useState(null);

  return (
    <View>
      <View style={styles.mapContainer}>
        <Map setNewMarker={setNewMarker} newMarker={newMarker} />
      </View>
      <View style={styles.subMenu}>
        <Text>Test</Text>
        <RecommendScreen />
        <CreatePinScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  mapContainer: {
    height: "70%",
  },
  subMenu: {
    flex: 1,
  },
});
