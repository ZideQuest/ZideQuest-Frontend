import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import * as TabNavigation from "../../data/TabNavigation";
import { useAppContext } from "../../data/AppContext";
import { primaryColor } from "../../data/color";

export default function BackButton() {
  const { bottomModalRef } = useAppContext();

  const closeHandler = () => {
    TabNavigation.navigate("Recommend");
    bottomModalRef.current?.snapToIndex(1);
  };

  return (
    <TouchableHighlight
      onPress={closeHandler}
      style={{ width: 20, height: 20, borderRadius: 20 }}
      underlayColor={primaryColor}
    >
      <Text style={styles.xText}>X</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: { 
    width: 30, 
    height: 30, 
    borderRadius: 30,
  },
  xText: {
    textAlign: "center",
    width: "100%",
  }
});
