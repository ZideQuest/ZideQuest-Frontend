import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAppContext } from "../data/AppContext";

const Stack = createNativeStackNavigator();

function Profile({ navigation }) {
  const { setIsProfileOpen, logout } = useAppContext();

  const logoutHandler = () => {
    alert("Logging out...");
    logout();
  };

  return (
    <View style={styles.profile}>
      <Pressable onPress={() => setIsProfileOpen(false)} style={styles.exit}>
        <Text>Exit</Text>
      </Pressable>
      <Pressable onPress={logoutHandler} style={styles.exit}>
        <Text>Logout</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Quests")}
        style={styles.exit}
      >
        <Text>Quests</Text>
      </Pressable>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
    </View>
  );
}

function Quests({ navigation }) {
  const { isProfileOpen, setIsProfileOpen } = useAppContext();

  return (
    <View style={styles.profile}>
      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={styles.exit}
      >
        <Text>Back</Text>
      </Pressable>
      <Text>Quests 1</Text>
      <Text>Quests 1</Text>
      <Text>Quests 1</Text>
      <Text>Quests 1</Text>
    </View>
  );
}

export default function TestProfile() {
  const { isProfileOpen, setIsProfileOpen } = useAppContext();

  return (
    <View style={[styles.screen, { display: isProfileOpen ? "flex" : "none" }]}>
      <View style={styles.container}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              headerShown: false,
              gestureEnabled: true,
            })}
          >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Quests" component={Quests} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  container: {
    position: "absolute",
    width: "95%",
    height: "80%",
    maxWidth: 700,
    overflow: "hidden",
    borderRadius: 30,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  profile: {
    height: "100%",
    backgroundColor: "cyan",
    padding: 30,
  },
  exit: {
    padding: 10,
    backgroundColor: "white",
    width: 60,
  },
});
