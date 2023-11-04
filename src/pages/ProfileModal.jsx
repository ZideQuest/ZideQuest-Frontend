import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../data/AppContext";

import Bottomsheet from "../components/Bottomsheet/Bottomsheet";

import MyQuests from "./ProfileSubScreen/MyQuest";
import Profile from "./ProfileSubScreen/Profile";
import CreatorProfile from "./ProfileSubScreen/CreatorProfile";
import CreatorQuests from "./ProfileSubScreen/CreatorQuests";

const Stack = createNativeStackNavigator();

export default function ProfileModal() {
  const { userDetail } = useAppContext();

  return (
    <Bottomsheet snapPoints={["100%"]} detached={true} hideBar={true}>
      <View style={styles.container}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              headerShown: false,
              gestureEnabled: false,
            })}
            initialRouteName={userDetail.isAdmin ? "CreatorProfile" : "Profile"}
          >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="CreatorProfile" component={CreatorProfile} />
            <Stack.Screen name="Quests" component={MyQuests} />
            <Stack.Screen name="CreatorQuests" component={CreatorQuests} />
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
