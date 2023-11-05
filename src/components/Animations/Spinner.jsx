import LottieView from "lottie-react-native";
import { View, Text } from "react-native";
import spinner from "./spinner.json";

export default function Spinner() {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
      }}
    >
      <LottieView
        autoPlay
        style={{
          width: "100%",
          height: 200,
        }}
        source={spinner}
      />
      <Text>Loading...</Text>
    </View>
  );
}
