import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { useAppContext } from "../data/AppContext";

export default function LoginScreen({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();

  const loginHandler = () => {
    setIsLoggedIn(true);
    navigation.navigate("App");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    flex: 1,
  },
  textColor: {
    color: "black",
  },
});
