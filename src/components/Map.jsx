import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text ,Image} from "react-native";

import { useState, useRef, useEffect } from "react";

import { useAppContext } from "../data/AppContext";
import { mapOptions, locations } from "../data/dev-data";
import RB from "./Rbsheet";
import {API} from "../api";
import New_Quest from "../components/createquest";


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
    currentMarkerSelecting,
    setCreatingNewMarker,
    newMarker,
    currentMarkerDetail,
    setNewMarker,
    cancelPinCreating,
    currentPage,
    setCurrentPage,
    selectExistedPin,
    backToRecommend,
  } = useAppContext();

  const [location, setLocation] = useState([]);

 useEffect(() => {
    if (!newMarker) {
      callAPI()
    }
  }, [newMarker]);

 async function callAPI(){
    const response = await API("GET","/location/","")
    if(response.status === 200){
      setLocation(response.data)
      console.log(response.data)
    }
  }

  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

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
    setMapLoaded(true);
  };

  const markerPressHandler = (pinId, data,pin) => {
    selectExistedPin(pinId,pin);
    const { lat, lng, name, placeId } = getDetailFromData(data);
    animateToRegion(lat, lng);
  };

  const animateToRegion = (lat, lng) => {
    if (mapRef.current) {
      const region = {
        latitude: lat,
        longitude: lng,
        // latitudeDelta: 0.0015, // The delta values control the zoom level
        // longitudeDelta: 0.0015,
      };
      mapRef.current.animateToRegion(region, 300); // 1000ms duration for the animation
    }
  };

  useEffect(() => {
    mapRef.current.setMapBoundaries(
      { latitude: 13.857319, longitude: 100.585732 },
      { latitude: 13.840040, longitude: 100.561646 }
    );
  }, []);

  return (
    <View>
      <MapView
        ref={mapRef}
        style={[styles.map]}
        provider={PROVIDER_GOOGLE}
        minZoomLevel={16}
        onRegionChangeComplete={(region) => setRegion(region)}
        {...mapOptions}
        onPress={(data) => mapPressHandler(data)}
        onPoiClick={(data) => mapPressHandler(data)}
      >
        {location.map((pin) => (
          <Marker
            coordinate={pin}
            key={pin._id}
            onPress={(data) => markerPressHandler(pin._id, data,pin)}
          >
            <Image
              source={require("../../assets/images/location.png")}
              style={{ height: 35, width: 35 }}
            />
          </Marker>
        ))}
        {newMarker && <Marker coordinate={newMarker}><Image
              source={require("../../assets/images/location.png")}
              style={{ height: 35, width: 35 }}
            /></Marker>}
      </MapView>

      <RB newMarker={newMarker}/>
      <New_Quest 
       currentMarkerDetail={currentMarkerDetail}
      currentMarkerSelecting={currentMarkerSelecting}/>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  add: {
    height: "100%",
    backgroundColor: "white",
  },
});
