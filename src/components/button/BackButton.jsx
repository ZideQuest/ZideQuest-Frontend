import React from "react";
import { StyleSheet, TouchableHighlight, Image } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { useAppContext } from "../../data/AppContext";
import { primaryColor } from "../../data/color";
import close_icon from "../../../assets/images/close_icon.png";

export default function BackButton({
  onPress,
  targetRoute,
  params,
  resetFocus = true,
}) {
  const { mapRefetch, setFocusedPin } = useAppContext();

  const closeHandler = async () => {
    if (targetRoute) {
      TabNavigation.navigate(targetRoute, params);
    } else {
      TabNavigation.navigate("Recommend");
    }

    if (onPress) {
      onPress();
    }

    mapRefetch();
    if (resetFocus) {
      setFocusedPin(null);
    }
  };

  return (
    <TouchableHighlight
      onPress={closeHandler}
      style={styles.button}
      underlayColor={primaryColor}
    >
      <Image source={close_icon} style={styles.x} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 22,
    height: 22,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  x: {
    width: "100%",
    height: "100%",
  },
});
