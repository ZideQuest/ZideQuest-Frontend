import React, { useEffect, useRef } from "react";
import {View, Text, StyleSheet, TextInput} from "react-native"
import NavBar from "../components/NavBar";
import Map from "../components/Map";
import RBSheets from "../components/Rbsheet";

export default function CreatePinScreen() {
  let ref=useRef()
  useEffect(() => {
  }, [ref.current])
  console.log(ref.current)
  return (
    <View style={styles.container}>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // borderTopEndRadius: 30,
    // borderTopLeftRadius: 30,
    // padding: 30,
    flex: 1,
  },
  txt:{
    display: "flex",
    textAlign: "center",
    fontSize: 30,
  },
  textColor: {
    color: "black"
  }
});