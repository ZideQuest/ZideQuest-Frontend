import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../data/AppContext";
import icon from "../../assets/images/KU.jpg";
import ProgressBar from 'react-native-progress/Bar';

const Stack = createNativeStackNavigator();


function Profile({ navigation }) {
  const { setIsProfileOpen, logout } = useAppContext();

  const logoutHandler = () => {
    alert("Logging out...");
    logout();
  };

  return (
    <ScrollView style={styles.profile}>
      <Pressable onPress={() => setIsProfileOpen(false)} style={styles.exit}>
        <Text>X</Text>
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

      <View style={{width:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
      <Image style={{
          width: 200, 
          height: 200,
          borderRadius: 200,
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center"
        }}
        source={icon}
      />
      <Text style={{fontSize:30, fontWeight:"bold",marginTop: 20}}>Jittat Soodlhor</Text>
      <View style={{gap:10}}>
       <ProgressBar progress={0.6} width={200} height={20} />
       <ProgressBar progress={0.1} width={200} height={20} />
       <ProgressBar progress={0.5} width={200} height={20} />
      </View>
      <Text></Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      </View>
  </ScrollView>
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
    backgroundColor: "rgba(52, 52, 52, 0)",
    padding: 30,
  },
  exit: {
    // padding: 10,
    margin: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 60,
  },
});
