import react from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";

import { useAppContext } from "../data/AppContext";

export default function PinDetailScreen() {
  const { currentMarkerSelecting } = useAppContext();
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Pin: {currentMarkerSelecting}</Text>
      <Text style={styles.textColor}>Detail 1</Text>
      <Text style={styles.textColor}>Detail 2</Text>
      <Text style={styles.textColor}>Detail 3</Text>
      <Text style={styles.textColor}>Detail 4</Text>
      <TouchableOpacity style={styles.btn}>
                    <Text style={{
                        color: "white",
                        fontSize: 30,
                        marginLeft: 2,
                        marginBottom: 2,
                }}>
                    +
                    </Text>
                </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    flex: 1,
  },
  textColor: {
    color: "black",
  },
  btn:{
    backgroundColor:  "#E86A33",
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 100,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  
  }
});
