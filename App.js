import React, { useState } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppProvider } from "./src/data/AppContext";
import HomeScreen from "./src/pages/HomeScreen";
import NavBar from "./src/components/NavBar";
import LoginScreen from "./src/pages/LoginScreen";

import Activity from"./src/pages/ActivityDetail";
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];
const Stack = createNativeStackNavigator();

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );

  const AppContent = ({navigation}) => {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <NavBar navigation={navigation}/>
        <HomeScreen />
      </>
    );
  };


  const PlatformSelector = () => {
    if (Platform.OS == "android") {
      return (
        <SafeAreaProvider style={styles.AndroidSafeArea}>
          
          <NavigationContainer>
            <Stack.Navigator>
              {/* <Stack.Screen
                name="App"
                component={AppContent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name="Activity"
                component={Activity}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          
        </SafeAreaProvider>
      );
    }
    if (Platform.OS == "ios") {
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
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
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
