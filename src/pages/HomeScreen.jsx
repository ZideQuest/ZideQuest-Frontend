import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../data/TabNavigation";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

// import { useAppContext } from "../data/AppContext";

import Map from "../components/Map";
import RecommendScreen from "./RecommendScreen";
import CreatePinScreen from "./CreatePinScreen";
import PinDetailScreen from "./PinDetailScreen";
import TestProfile from "./TestProfile";
import PinCreateInfo from "./PinCreateInfo";
import QuestManagement from "./QuestManagement";

import { TransitionPresets } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ActivityDetail from "./ActivityDetail";

const modalGen = (component) => {
  return <Bottomsheet>{component}</Bottomsheet>;
};

export default function HomeScreen() {
  return (
    <View style={styles.mapContainer}>
      <TestProfile />
      <Map />
      <NavigationContainer ref={navigationRef} independent={true}>
        <Stack.Navigator
          initialRouteName="Recommend"
          backBehavior="none"
          // screenOptions={({ route, navigation }) => ({
          //   headerShown: false,
          //   gestureEnabled: false,
          //   ...TransitionPresets.ModalPresentationIOS,
          // })}
        >
          <Stack.Screen name="Recommend" component={RecommendScreen} />
          <Stack.Screen name="CreatePin" component={CreatePinScreen} />
          <Stack.Screen name="PinDetail" component={PinDetailScreen} />
          <Stack.Screen name="QuestDetail" component={ActivityDetail} />
          <Stack.Screen name="CreateQuest" component={RecommendScreen} />
          <Stack.Screen name="PinCreateInfo" component={PinCreateInfo} />
          <Stack.Screen name="QuestManage" component={QuestManagement} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
  },
  subMenu: {
    // width: "100%",
    // maxWidth: 700,
  },
});
