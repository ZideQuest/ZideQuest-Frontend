import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, Text, Button } from "react-native";

export default function Spinner() {
  const animation = useRef(null);

  return (
    <View style={{}}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        source={require('./spinner.json')}
      />
      <Text>Loading</Text>
      <Button
          title="Restart Animation"
          onPress={() => {
            animation.current?.reset();
            animation.current?.play();
          }}
        />
    </View>
  );
}
