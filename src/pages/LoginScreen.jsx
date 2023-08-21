import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";

import { useAppContext } from "../data/AppContext";

export default function LoginScreen({ navigation }) {
  const { login, isLoading } = useAppContext();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const loginHandler = () => {
    login(username, password);
    navigation.navigate("App");
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        label={"username"}
        style={styles.textfield}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        label={"password"}
        style={styles.textfield}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
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
  textfield: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
