import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Button } from "react-native";

import { useState, useRef, useEffect } from "react";

import { useAppContext } from "../data/AppContext";
import { mapOptions } from "../data/dev-data";
import { mapCustomStyle } from "../data/map-style";
import { fetchLocations } from "../data/locations";

import * as TabNavigation from "../data/TabNavigation";

function getDetailFromData(coordinate) {
  const lat = coordinate.nativeEvent.coordinate.latitude;
  const lng = coordinate.nativeEvent.coordinate.longitude;
  const name = coordinate.nativeEvent.name;
  const placeId = coordinate.nativeEvent.placeId;

  return { lat, lng, name, placeId };
}

export default function Map() {
  const {
    newMarker,
    setNewMarker,
    creatingNewMarker,
    setCreatingNewMarker,
    bottomModalRef,
    setBottomModalRe,
  } = useAppContext();
  const [refresh, setRefresh] = useState(false);
  const [locations, setLocations] = useState([]);

  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapPressHandler = (coordinate) => {

    
    if (TabNavigation.currentScreen() != "CreatePin") {
      bottomModalRef.current?.collapse()
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
    data.stopPropagation();

    bottomModalRef.current?.snapToIndex(1)

    TabNavigation.navigate("PinDetail", { pinId });
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

      // if (mapRef.current.onMapReady) {
      // }
      mapRef.current.animateToRegion(region, 300); // 1000ms duration for the animation
    }
  };

  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const cancelCreatePin = () => {
    setNewMarker(null);
    setCreatingNewMarker(false);
    TabNavigation.navigate("Recommend");
  };

  useEffect(() => {
    mapRef.current.setMapBoundaries(
      { latitude: 13.856247, longitude: 100.565117 },
      { latitude: 13.842, longitude: 100.578 }
    );
  }, []);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.log("Error fetching locations", error);
      }
    };
    fetchMap();
  }, []);

  return (
    <View style={styles.map}>
      {creatingNewMarker && (
        <View style={styles.mapCondition}>
          <Text style={styles.mapConditionText}>เลือกสถานที่เพื่อปักหมุด</Text>
          <Button title="ปิด" onPress={() => cancelCreatePin()} />
        </View>
      )}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        minZoomLevel={15}
        onRegionChangeComplete={(region) => setRegion(region)}
        {...mapOptions}
        onPress={(data) => mapPressHandler(data)}
        onPoiClick={(data) => mapPressHandler(data)}
        height="100%"
        customMapStyle={mapCustomStyle}
      >
        {locations.map((pin) => (
          <Marker
            coordinate={pin}
            key={pin._id}
            onPress={(data) => markerPressHandler(pin._id, data)}
          />
        ))}
        {newMarker && <Marker coordinate={newMarker} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    position: "relative",
    width: "100%",
  },
  mapCondition: {
    position: "absolute",
    width: "100%",
    zIndex: 3,
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
