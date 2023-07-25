import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/pages/HomeScreen";

import NavBar from "./src/components/NavBar";
import Map from "./src/components/Map";

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

const Stack = createNativeStackNavigator();

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );

  if (Platform.OS == "android") {
    return (
      <SafeAreaProvider style={styles.AndroidSafeArea}>
        <NavBar />
        <HomeScreen />
      </SafeAreaProvider>
    );
  }
  if (Platform.OS == "ios") {
    return (
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView>
          <NavBar />
          <HomeScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
