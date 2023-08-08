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
import Participant from "./Participant";
import QuestDetail from "./QuestDetail";

import { TransitionPresets } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {

  return (
    <View style={styles.mapContainer}>
      <Map />
      <TestProfile />
      <View style={styles.subMenu}>
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
            <Stack.Screen name="Participant" component={Participant} />
            <Stack.Screen name="QuestDetail" component={QuestDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    position: "relative",
    alignItems: "center",
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
