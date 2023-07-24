import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

import { useState, useRef, useEffect } from "react";

import { useAppContext } from "../data/AppContext";
import { mapOptions, locations } from "../data/dev-data";

function getDetailFromData(coordinate) {
  const lat = coordinate.nativeEvent.coordinate.latitude;
  const lng = coordinate.nativeEvent.coordinate.longitude;
  const name = coordinate.nativeEvent.name;
  const placeId = coordinate.nativeEvent.placeId;

  return { lat, lng, name, placeId };
}

export default function Map() {
  const {
    creatingNewMarker,
    setCreatingNewMarker,
    newMarker,
    setNewMarker,
    cancelPinCreating,
    currentPage,
    setCurrentPage,
    selectExistedPin,
    backToRecommend,
  } = useAppContext();

  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapPressHandler = (coordinate) => {
    // if (currentPage === "markerDetail") {
    //   backToRecommend();
    //   return;
    // }

    if (currentPage !== "addMarker" || !creatingNewMarker) {
      return;
    }

    const { lat, lng, name, placeId } = getDetailFromData(coordinate);

    animateToRegion(lat, lng);
    setNewMarker({
      latitude: lat,
      longitude: lng,
    });
  };

  const markerPressHandler = (pinId, data) => {
    selectExistedPin(pinId);
    const { lat, lng, name, placeId } = getDetailFromData(data);
    animateToRegion(lat, lng);
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
      { latitude: 13.856247, longitude: 100.565117 },
      { latitude: 13.842, longitude: 100.578 }
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
      onPoiClick={(data) => mapPressHandler(data)}
    >
      {locations.map((pin) => (
        <Marker
          coordinate={pin}
          key={pin.id}
          onPress={(data) => markerPressHandler(pin.id, data)}
        />
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
