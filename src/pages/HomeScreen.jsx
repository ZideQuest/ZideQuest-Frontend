import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";

import RecommendScreen from "./RecommendScreen";
import CreatePinScreen from "./CreatePinScreen";
import Map from "../components/Map";

import { useState } from "react";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [newMarker, setNewMarker] = useState(null);

  return (
    <GestureHandlerRootView>
      <View>
        <View style={styles.mapContainer}>
          <Map setNewMarker={setNewMarker} newMarker={newMarker} />
        </View>
        <Bottomsheet />
        {/* <RecommendScreen /> */}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  mapContainer: {
    height: "100%",
  },
  subMenu: {
    flex: 1,
  },
});
