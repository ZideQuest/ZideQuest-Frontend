import React from "react";
import { StyleSheet, TouchableHighlight, Image } from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { useAppContext } from "../../data/AppContext";
import { primaryColor } from "../../data/color";
import close_icon from "../../../assets/images/close_icon.png";

export default function BackButton({onPress}) {
  const { bottomModalRef, mapRefetch, setFocusedPin } = useAppContext();

  const closeHandler = async () => {
    TabNavigation.navigate("Recommend");
    
    if (onPress) {
      onPress()
    }
    
    mapRefetch();
    setFocusedPin(null);
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
    width: 20,
    height: 20,
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
