import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../data/TabNavigation";

// import { useAppContext } from "../data/AppContext";

import Map from "../components/Map";
import RecommendScreen from "./RecommendScreen";
import CreatePinScreen from "./CreatePinScreen";
import PinDetailScreen from "./PinDetailScreen";
import TestProfile from "./TestProfile";

import { TransitionPresets } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

import { useState } from "react";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ActivityDetail from "./ActivityDetail";

export default function HomeScreen() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <Map />
        <TestProfile />
        <Bottomsheet style={styles.subMenu}>
          <NavigationContainer ref={navigationRef} independent={true}>
            <Stack.Navigator
              screenOptions={({ route, navigation }) => ({
                headerShown: false,
                gestureEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              })}
            >
              <Stack.Screen name="Recommend" component={RecommendScreen} />
              <Stack.Screen name="CreatePin" component={CreatePinScreen} options={{gestureEnabled: false}}/>
              <Stack.Screen name="PinDetail" component={PinDetailScreen} />
              <Stack.Screen name="QuestDetail" component={ActivityDetail} />
              <Stack.Screen name="CreateQuest" component={RecommendScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Bottomsheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
  },
  subMenu: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    height: "30%",
    width: "100%",
    maxWidth: 700,
    overflow: "hidden",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  }
});
