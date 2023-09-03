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
    // console.log('------------------');
    // console.log(lat);
    // console.log(lng);
    // console.log(name);
    // console.log(placeId);
    // console.log('------------------');
    return { lat, lng, name, placeId };
}

export default function Map() {
    const { newMarker, setNewMarker, bottomModalRef } = useAppContext();
    const [refresh, setRefresh] = useState(false);
    const [locations, setLocations] = useState([]);

    const mapRef = useRef(null);
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

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

        setNewMarker({
            latitude: lat,
            longitude: lng,
            name,
            placeId,
        });

        TabNavigation.navigate("PinDetail", { pinId });
        // bottomModalRef.current?.snapToIndex(1);
        animateToRegion(lat, lng);
    };

    const animateToRegion = (lat, lng) => {
        if (mapRef.current) {
            const region = {
                latitude: lat - 0.001,
                longitude: lng,
                latitudeDelta: 0.0025, // The delta values control the zoom level
                longitudeDelta: 0.0025,
            };

            // if (mapRef.current.onMapReady) {
            // }
            mapRef.current.animateToRegion(region, 300); // 1000ms duration for the animation
        }
    };

    const cancelCreatePin = () => {
        setNewMarker(null);
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
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                minZoomLevel={15}
                height="100%"
                onRegionChangeComplete={(region) => setRegion(region)}
                {...mapOptions}
                onPress={(data) => mapPressHandler(data)}
                onPoiClick={(data) => mapPressHandler(data)}
                customMapStyle={mapCustomStyle}
                onTouchStart={() => bottomModalRef?.current?.collapse()}
            >
                {locations.map((pin) => {
                    // console.log(pin)
                    return (
                        <Marker
                            coordinate={pin}
                            key={pin._id}
                            onPress={(data) => markerPressHandler(pin._id, data)}
                        />
                    );
                })}
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
});
