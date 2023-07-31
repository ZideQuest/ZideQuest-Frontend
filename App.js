import React, { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppProvider } from "./src/data/AppContext";
import HomeScreen from "./src/pages/HomeScreen";
import NavBar from "./src/components/NavBar";
import CreatePinScreen from "./src/pages/CreatePinScreen";

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );

  const PlatformSelector = () => {
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
        <SafeAreaProvider style={{ backgroundColor: "red" }}>
          <SafeAreaView style={styles.container}>
            {/* <CreatePinScreen /> */}
            <NavBar />
            <HomeScreen style={{ flex: 1 }} />
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }
  };

  return (
    <AppProvider>
      <PlatformSelector />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
