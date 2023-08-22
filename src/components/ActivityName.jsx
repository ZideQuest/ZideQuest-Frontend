import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";

BGcolor = 'white';
textcolor = 'white';

export default function ActivityDetail() {
    return (
        <View style={styles.container}>
            <View style={styles.ActNameCon}>
              <Text style={{ color: textcolor, fontSize: 20, fontWeight: 'bold', }}>ชื่อกิจกรรม</Text>
            </View>
            <View style={styles.countCon}>
              <Text style={{ color: textcolor, fontSize: 20, fontWeight: 'bold' }}>จำนวนคนตอนนี้/max</Text>
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
        backgroundColor: BGcolor,
        width: "70%",
        justifyContent: 'center',
      },
      countCon: {
        backgroundColor: BGcolor,
        width: "27%",
        alignItems: 'center',
        justifyContent: 'center',
      },
})