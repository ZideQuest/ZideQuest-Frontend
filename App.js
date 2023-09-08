import React, { useState, useCallback } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppProvider } from "./src/data/AppContext";
import HomeScreen from "./src/pages/HomeScreen";
import LoginScreen from "./src/pages/LoginScreen";
import DrawerMenu from "./src/components/DrawerMenu";
import CheckinScreen from "./src/pages/CheckinScreen";

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import {
  useFonts,
  Kanit_100Thin as Kanit100,
  Kanit_100Thin_Italic as Kanit100I,
  Kanit_200ExtraLight as Kanit200,
  Kanit_200ExtraLight_Italic as Kanit200I,
  Kanit_300Light as Kanit300,
  Kanit_300Light_Italic as Kanit300I,
  Kanit_400Regular as Kanit400,
  Kanit_400Regular_Italic as Kanit400I,
  Kanit_500Medium as Kanit500,
  Kanit_500Medium_Italic as Kanit500I,
  Kanit_600SemiBold as Kanit600,
  Kanit_600SemiBold_Italic as Kanit600I,
  Kanit_700Bold as Kanit700,
  Kanit_700Bold_Italic as Kanit700I,
  Kanit_800ExtraBold as Kanit800,
  Kanit_800ExtraBold_Italic as Kanit800I,
  Kanit_900Black as Kanit900,
  Kanit_900Black_Italic as Kanit900I,
} from "@expo-google-fonts/kanit";

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

  let [fontsLoaded] = useFonts({
    Kanit100,
    Kanit100I,
    Kanit200,
    Kanit200I,
    Kanit300,
    Kanit300I,
    Kanit400,
    Kanit400I,
    Kanit500,
    Kanit500I,
    Kanit600,
    Kanit600I,
    Kanit700,
    Kanit700I,
    Kanit800,
    Kanit800I,
    Kanit900,
    Kanit900I,
  });

  if (!fontsLoaded) {
    return <></>;
  }

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
            <Stack.Screen
              name="Checkin"
              component={CheckinScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}
