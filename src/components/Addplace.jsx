import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";


import { useState } from "react";


export default function Addplace({ mapLoaded, setMapLoaded }){
    return(
        
        <View style={[styles.add]}>
            <Text>
                {console.log(mapLoaded)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  add: {
    // display: mapLoaded? "flex":"none",
    // height: "100px",
  },
});