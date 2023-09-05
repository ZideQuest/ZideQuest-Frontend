import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function Spinner() {
  return (
    <View style={{width: "100%", height: 200, padding: 20}}>
      <LottieView style={{width: "100%", height: "100%"}} source={require('../../../assets/animations/spinner.json')} autoPlay loop />
    </View>
  );
}