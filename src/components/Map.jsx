import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useState, useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { useAppContext } from "../data/AppContext";
import { mapCustomStyle } from "../data/map-style";
import { fetchLocations } from "../data/locations";
import * as TabNavigation from "../data/TabNavigation";
import NavBar from "./NavBar";
import { primaryColor } from "../data/color";

const KEY = "AIzaSyCHMNIRhJ8_BGSHHNRZHDOL39NKOCITqwA";

const initialRegion = {
  latitude: 13.848236064906674,
  longitude: 100.57200964540243,
  latitudeDelta: 0.015,
  longitudeDelta: 0.013,
};

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
    bottomModalRef,
    setMapMoveTo,
    setMapRefetch,
    setMapSearchedLocation,
    focusedPin,
    setFocusedPin,
    setSnapBack,
    setGetNavigator,
  } = useAppContext();
  const [locations, setLocations] = useState([]);

  const mapRef = useRef(null);
  const [region, setRegion] = useState(initialRegion);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);

  const mapPressHandler = async (coordinate) => {
    if (TabNavigation.currentScreen() != "CreatePin") {
      bottomModalRef.current?.collapse();
      return;
    }

    const { lat, lng, name, placeId } = getDetailFromData(coordinate);

    await setNewMarker({
      latitude: lat,
      longitude: lng,
      name,
      placeId,
    });
    animateToRegion(lat, lng);
  };

  const markerPressHandler = (pinId, data) => {
    data.stopPropagation();
    const { lat, lng, name, placeId } = getDetailFromData(data);

    if (TabNavigation.currentScreen() == "CreatePin") {
      setNewMarker({
        latitude: lat,
        longitude: lng,
        name,
        placeId,
      });
    }

    TabNavigation.navigate("PinDetail", { pinId });
    animateToRegion(lat, lng);
    setFocusedPin(pinId);
  };

  const animateToRegion = (
    latitude,
    longitude,
    latitudeDelta = 0.0025,
    longitudeDelta = 0.0025
  ) => {
    if (mapRef.current) {
      const region = {
        latitude: latitude - 0.001,
        longitude,
        latitudeDelta,
        longitudeDelta,
      };

      mapRef.current.animateToRegion(region, 450);
    }
  };

  const mapRefetch = async () => {
    try {
      const data = await fetchLocations();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  const mapSearchedLocation = (locations) => {
    setLocations(locations);
  };

  const markerOpacityHandler = (pinId) => {
    if (!focusedPin || pinId == focusedPin) {
      return { opacity: 1 };
    } else {
      return { opacity: 0.5 };
    }
  };

  const getNavigator = (status, location = null) => {
    //
    const userLocation = { latitude: 13.856247, longitude: 100.565117 };
    //

    if (status) {
      const destination = {
        latitude: location?.latitude,
        longitude: location?.longitude,
      };

      const centerX = (userLocation.latitude + destination.latitude) / 2;
      const centerY = (userLocation.longitude + destination.longitude) / 2;
      const deltaX =
        Math.abs(userLocation.latitude - destination.latitude) + 0.005;
      const deltaY =
        Math.abs(userLocation.longitude - destination.longitude) + 0.005;

      animateToRegion(centerX, centerY, deltaX, deltaY);

      setUserLocation(userLocation);
      setDestination(destination);
      setShowNavigator(true);
    } else {
      setUserLocation(null);
      setDestination(null);
      setShowNavigator(false);
    }
  };

  useEffect(() => {
    mapRef.current.setMapBoundaries(
      { latitude: 13.856247, longitude: 100.565117 },
      { latitude: 13.842, longitude: 100.578 }
    );
  }, []);

  useEffect(() => {
    setMapMoveTo(() => animateToRegion);
    setMapSearchedLocation(() => mapSearchedLocation);
    setMapRefetch(() => mapRefetch);
    setGetNavigator(() => getNavigator);
    setSnapBack(
      () => () =>
        animateToRegion(
          initialRegion.latitude,
          initialRegion.longitude,
          initialRegion.latitudeDelta,
          initialRegion.longitudeDelta
        )
    );
  }, []);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    };
    fetchMap();
  }, []);

  return (
    <View style={styles.map}>
      <NavBar />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        minZoomLevel={15}
        height="100%"
        width="100%"
        // onRegionChangeComplete={(region) => setRegion(region)}
        region={region}
        showsUserLocation
        onPress={(data) => mapPressHandler(data)}
        onPoiClick={(data) => mapPressHandler(data)}
        customMapStyle={mapCustomStyle}
        onTouchStart={() => bottomModalRef.current?.collapse()}
        loadingEnabled
        mapPadding={{ bottom: "60%" }}
      >
        {locations.map((pin) => (
          <Marker
            coordinate={pin}
            key={pin._id}
            onPress={(data) => markerPressHandler(pin._id, data)}
            style={markerOpacityHandler(pin._id)}
          />
        ))}
        {newMarker && <Marker coordinate={newMarker} />}
        {showNavigator && (
          <MapViewDirections
            origin={userLocation}
            destination={destination}
            apikey={KEY}
            strokeWidth={7}
            strokeColor={primaryColor}
            mode="WALKING"
          />
        )}
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
});
