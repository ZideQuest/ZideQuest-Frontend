import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default function Map() {
  return (
    <View>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
