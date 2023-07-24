import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useAppContext } from "../data/AppContext";
import StackNavigator from "./StackNavigator";
import Map from "../components/Map";

import { useState } from "react";

export default function HomeScreen() {
  const { creatingNewMarker, setCreatingNewMarker, setNewMarker } =
    useAppContext();

  const cancelCreateMarker = () => {
    setNewMarker(null);
    setCreatingNewMarker(false);
  };

  return (
    <NavigationContainer style={{ position: "relative" }}>
      <View style={styles.mapContainer}>
        <Map />
        {creatingNewMarker && (
          <View style={styles.mapCondition}>
            <Text style={styles.mapConditionText}>
              เลือกสถานที่เพื่อปักหมุด
            </Text>
            <Button title="ปิด" onPress={() => cancelCreateMarker()} />
          </View>
        )}
      </View>
      <View style={styles.subMenu}>
        <StackNavigator />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  mapContainer: {
    height: "100%",
    position: "relative",
  },
  subMenu: {
    // flex: 1,
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
    height: "30%",
    width: "100%"
  },
  mapCondition: {
    position: "absolute",
    width: "100%",
    top: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  mapConditionText: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});
