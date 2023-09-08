import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../data/AppContext";
import { BGcolor } from "../data/color";

import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import * as TabNavigation from "../data/TabNavigation";

import MyQuests from "./ProfileSubScreen/MyQuest";
import Profile from "./ProfileSubScreen/Profile";

const Stack = createNativeStackNavigator();

export default function ProfileModal() {
  const { isProfileOpen, setIsProfileOpen } = useAppContext();

  return (
    <Bottomsheet snapPoints={["95%"]} detached={true} hideBar={true}>
      <View style={styles.container}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              headerShown: false,
              gestureEnabled: false,
            })}
          >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Quests" component={MyQuests} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
