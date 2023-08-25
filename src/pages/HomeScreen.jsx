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
import PinCreateInfo from "./PinCreateInfo";

import { TransitionPresets } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ActivityDetail from "./ActivityDetail";

export default function HomeScreen() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <TestProfile />
        <Map />
        <Bottomsheet style={styles.subMenu}>
          <NavigationContainer ref={navigationRef} independent={true}>
            <Stack.Navigator
              screenOptions={({ route, navigation }) => ({
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.ModalPresentationIOS,
              })}
            >
              <Stack.Screen name="Recommend" component={RecommendScreen} />
              <Stack.Screen name="CreatePin" component={CreatePinScreen} options={{gestureEnabled: false}}/>
              <Stack.Screen name="PinDetail" component={PinDetailScreen} />
              <Stack.Screen name="QuestDetail" component={ActivityDetail} />
              <Stack.Screen name="CreateQuest" component={RecommendScreen} />
              <Stack.Screen name="PinCreateInfo" component={PinCreateInfo} />
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
    // width: "100%",
    // maxWidth: 700,
  }
});
