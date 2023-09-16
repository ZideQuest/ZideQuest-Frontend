import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, Text, Button } from "react-native";

export default function Spinner() {
  return (
    <View style={{width:"100%", justifyContent:"center", alignItems:"center", height: 200}}>
      <LottieView
        autoPlay
        style={{
          width: "100%",
          height: 200,
        }}
        source={require("./spinner.json")}
      />
    </View>
  );
}
