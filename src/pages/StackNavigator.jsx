import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TransitionPresets } from "@react-navigation/stack";

import { useAppContext } from "../data/AppContext";
import RecommendScreen from "./RecommendScreen";
import CreatePinScreen from "./CreatePinScreen";
import PinDetailScreen from "./PinDetailScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { creatingNewMarker, currentPage } = useAppContext();

  const screenSlector = () => {
    // if (currentPage === "addMarker") {
    //   return <Stack.Screen name="CreatePin" component={CreatePinScreen} />;
    // }

    if (currentPage === "markerDetail") {
      return <Stack.Screen name="PinDetail" component={PinDetailScreen} />;
    }

    return <Stack.Screen name="Recommend" component={RecommendScreen} />;
  };

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      })}
    >
      {screenSlector()}
    </Stack.Navigator>
  );
};

export default StackNavigator;
