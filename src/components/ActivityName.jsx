import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";

BGcolor = '#f5da80';

export default function ActivityDetail() {
    return (
        <View style={styles.container}>
            <View style={styles.ActNameCon}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold', }}>ชื่อกิจกรรม</Text>
            </View>
            <View style={styles.countCon}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>จำนวนคนตอนนี้/max</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: BGcolor,
        width: "100%",
        padding: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
        columnGap: 10,
      },
      ActNameCon: {
        backgroundColor: 'black',
        width: "70%",
        justifyContent: 'center',
      },
      countCon: {
        backgroundColor: 'black',
        width: "27%",
        alignItems: 'center',
        justifyContent: 'center',
      },
})