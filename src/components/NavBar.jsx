import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function NavBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo} >ZideQuest</Text>
      <Button
        style={styles.loginButton}
        title="Login"
        onPress={() => alert("logging in...")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  logo: {
    color: "#E86A33",
    fontWeight: "bold",
    fontSize: "30rem"
  },
  loginButton: {
    color: "white"
  },
});
