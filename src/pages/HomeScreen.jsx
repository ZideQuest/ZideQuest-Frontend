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
import CreateQuest from "./CreateQuest";
import QuestEditing from "./Editing/QuestEditing";
import LocationEditing from "./Editing/LocationEditing";
import ParticipantsEditing from "./Editing/ParticipantsEditing";
import UserQuestComplete from "./UserQuestComplete";
import GenQRScreen from "./GenQRScreen";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <View style={styles.mapContainer}>
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
          <Stack.Screen name="CreateQuest" component={CreateQuest} />
          <Stack.Screen name="PinCreateInfo" component={PinCreateInfo} />
          <Stack.Screen name="QuestManage" component={QuestManagement} />
          <Stack.Screen name="Profile" component={ProfileModal} />
          <Stack.Screen name="EditQuest" component={QuestEditing} />
          <Stack.Screen name="EditLocation" component={LocationEditing} />
          <Stack.Screen
            name="EditParticipants"
            component={ParticipantsEditing}
          />
          <Stack.Screen
            name="UserQuestComplete"
            component={UserQuestComplete}
          />
          <Stack.Screen name="GenQRScreen" component={GenQRScreen} />
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
