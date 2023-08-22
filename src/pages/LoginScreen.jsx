import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  Image,
} from "react-native";

import { useAppContext } from "../data/AppContext";
import loginBanner from "../../assets/images/login_logo.png";

const image = {
  uri: "https://alllogin.ku.ac.th/resources/3iyb6/login/kubase/img/bg1.jpg",
};

export default function LoginScreen({ navigation }) {
  const { login, isLoading } = useAppContext();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const loginHandler = async () => {
    const status = await login(username, password);

    if (status.status !== 401) {
      navigation.navigate("App");
    } else {
      alert(status.message);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ImageBackground source={image} style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>Back</Text>
      </Pressable>
      <View style={styles.infoContainer}>
        <View style={styles.bannerContainer}>
          <Image source={loginBanner} style={styles.bannerImage} />
        </View>
        <Text style={styles.bannerText}>ALL-Login</Text>
        <TextInput
          label={"username"}
          style={styles.textfield}
          value={username}
          placeholder="username"
          placeholderTextColor="grey"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          label={"password"}
          style={styles.textfield}
          value={password}
          placeholder="password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable onPress={loginHandler} style={styles.signinButton}>
          <Text style={styles.signinText}>Sign In</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.smallButton}>Forgot Password</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.smallButton}>
            Personal information verification
          </Text>
        </Pressable>
      </View>
      <Text style={styles.credit}>
        @2023 สำนักบริการคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์ | Office of Computer
        Services,
        <Text style={{ color: "lime", textDecorationLine: "underline" }}>
          {" "}
          Kasetsart University
        </Text>
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 30,
  },
  infoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 15,
    width: "70%",
    maxWidth: 700,
  },
  bannerContainer: {
    height: 70,
    width: "100%",
  },
  bannerImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  bannerText: {
    color: "rgb(45,106,103)",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 30,
    transform: [{ scaleY: 1.5 }],
  },
  textfield: {
    borderColor: "white",
    borderBottomWidth: 2,
    paddingVertical: 8,
    marginTop: 15,
  },
  signinButton: {
    marginVertical: 10,
    backgroundColor: "rgb(45,106,103)",
    alignSelf: "flex-start",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: "4",
  },
  signinText: {
    color: "white",
    fontSize: 10,
    fontWeight: 600,
  },
  smallButton: {
    fontSize: 11,
    textDecorationLine: "underline",
    color: "rgb(80, 80, 80)",
  },
  credit: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    margin: 10,
  },
});
