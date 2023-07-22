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

  return (
    <View style={styles.container}>
      {/* <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      /> */}
      <SafeAreaProvider>
        <SafeAreaView>
          <NavBar />
          <HomeScreen />
        </SafeAreaView>
      </SafeAreaProvider>
      {/* <SafeAreaProvider>
          <NavBar />
          <Home />
      </SafeAreaProvider> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
