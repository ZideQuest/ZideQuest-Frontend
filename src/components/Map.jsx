import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

import { useState, useRef, useEffect } from "react";

import { mapOptions, locations } from "../data/dev-data";

export default function Map({ newMarker, setNewMarker }) {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapPressHandler = (coordinate) => {
    const lat = coordinate.nativeEvent.coordinate.latitude;
    const lng = coordinate.nativeEvent.coordinate.longitude;
    const name = coordinate.nativeEvent.name;
    const placeId = coordinate.nativeEvent.placeId;

    animateToRegion(lat, lng);
    setNewMarker({
      latitude: lat,
      longitude: lng,
    });
  };

  const animateToRegion = (lat, lng) => {
    if (mapRef.current) {
      const region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0015, // The delta values control the zoom level
        longitudeDelta: 0.0015,
      };
      mapRef.current.animateToRegion(region, 300); // 1000ms duration for the animation
    }
  };

  useEffect(() => {
    mapRef.current.setMapBoundaries(
      { latitude: 13.853247, longitude: 100.579117 },
      { latitude: 13.845048, longitude: 100.569315 }
    );
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      minZoomLevel={15}
      onRegionChangeComplete={(region) => setRegion(region)}
      {...mapOptions}
      onPress={(data) => mapPressHandler(data)}
      onPoiClick={(data) => mapPressHandler(data)}>
      {locations.map((pin) => (
        <Marker coordinate={pin} key={pin.id} />
      ))}
      {newMarker && <Marker coordinate={newMarker} />}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});
