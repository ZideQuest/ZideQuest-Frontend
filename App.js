import React, { useState } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppProvider } from "./src/data/AppContext";
import HomeScreen from "./src/pages/HomeScreen";
import LoginScreen from "./src/pages/LoginScreen";
import NavBar from "./src/components/NavBar";
import DrawerMenu from "./src/components/DrawerMenu";

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const AppContent = ({ navigation }) => {
    return (
      <View style={{ flex: 1, position: "relative" }}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
          style="auto"
        />

        <GestureHandlerRootView style={{ flex: 1 }}>
          <DrawerMenu navigation={navigation}>
            <NavBar navigation={navigation} />
            <BottomSheetModalProvider>
              <HomeScreen />
            </BottomSheetModalProvider>
          </DrawerMenu>
        </GestureHandlerRootView>
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
