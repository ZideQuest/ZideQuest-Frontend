import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../data/TabNavigation";

import Map from "../components/Map";
import RecommendScreen from "./RecommendScreen";
import CreatePinScreen from "./CreatePinScreen";
import PinDetailScreen from "./PinDetailScreen";
import ProfileModal from "./ProfileModal";
import PinCreateInfo from "./PinCreateInfo";
import QuestManagement from "./QuestManagement";
import ActivityDetail from "./ActivityDetail";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <View style={styles.mapContainer}>
      {/* <Map /> */}
      <NavigationContainer ref={navigationRef} independent={true}>
        <Stack.Navigator
          initialRouteName="Recommend"
          backBehavior="none"
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            gestureEnabled: false,
          })}
        >
          <Stack.Screen name="Recommend" component={RecommendScreen} />
          <Stack.Screen name="CreatePin" component={CreatePinScreen} />
          <Stack.Screen name="PinDetail" component={PinDetailScreen} />
          <Stack.Screen name="QuestDetail" component={ActivityDetail} />
          <Stack.Screen name="CreateQuest" component={RecommendScreen} />
          <Stack.Screen name="PinCreateInfo" component={PinCreateInfo} />
          <Stack.Screen name="QuestManage" component={QuestManagement} />
          <Stack.Screen name="Profile" component={ProfileModal} />
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
