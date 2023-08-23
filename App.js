import React, { useState } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppProvider } from "./src/data/AppContext";
import HomeScreen from "./src/pages/HomeScreen";
import LoginScreen from "./src/pages/LoginScreen";
import NavBar from "./src/components/NavBar";

import Activity from"./src/pages/ActivityDetail";
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );

  const AppContent = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    return (
      <View style={{ paddingTop: insets.top, height: "100%" }}>
        {/* <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
          // style="auto"
        /> */}
        <NavBar navigation={navigation} />
        <HomeScreen />
      </View>
    );
  };

  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="App"
              component={AppContent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}