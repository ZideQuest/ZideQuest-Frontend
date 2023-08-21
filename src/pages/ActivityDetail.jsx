import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";

import yo from "../../assets/images/KU2.jpg";
import { tag } from "../data/dev-data";
import ActivityName from "../components/ActivityName.jsx";
BGcolor = '#FDFEFE';
textcolor = 'black';

export default function ActivityDetail() {
  return (
    <View style={styles.container}>
      <View style={styles.picCon}>
        <Image
          style={styles.pic}
          source={yo}
        />
       
      </View>
      <View style={styles.DataCon}>
        <ActivityName />
        <View style={styles.timePlaceCon}>
          <Text style={{ color: "textcolor", fontSize: 20, fontWeight: 'bold', }}>date</Text>
        </View>
        <View style={styles.creatorCon}>
          <Text style={{ color: "textcolor", fontSize: 20, fontWeight: 'bold', }}>ชื่อหน่วยงาน</Text>
        </View>
        <View style={styles.creatorPicCon}>
          <Text style={{ color: "textcolor", fontSize: 20, fontWeight: 'bold', }}>รูปหน่วยงาน</Text>
        </View>
        <View style={styles.tagCon}>
          {Array.from({ length: tag.length }).map((_, index) => (
            <View style={styles.singleTag}>
              <Text key={index} style={styles.tagText}>
                {tag[index]}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.DescripCon}>
          <Text style={{ color: "textcolor", fontSize: 20, fontWeight: 'bold', }}>Description</Text>
        </View>
        <Button
          onPress={() => Alert.alert('Cannot press this one')}
          title="เข้าร่วมกิจกรรม"
          color="#ff9900"
          accessibilityLabel="Learn more about this purple button"
          style={styles.AcButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFEFE',
    // borderRadius: 25,
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
    flex: 1,
  },
  tagText: {
    color: "BGcolor",
    padding: 5,
  },
  picCon: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,   
    color: "black",
  },
  pic: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1 }],
    overflow: "hidden",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,    
  },
  DataCon: {
    backgroundColor: BGcolor,
    borderRadius: 25,
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
    justifyContent: 'center',
  },
  tagCon: {
    backgroundColor: 'BGcolor',
    width: "100%", 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
  },
  singleTag: {
    backgroundColor: "#FDEBD0",
    alignSelf: 'flex-start',
    borderRadius: 40,
  },
  timePlaceCon: {
    backgroundColor: 'BGcolor',
    width: "45%",
    justifyContent: 'center',
  },
  creatorCon: {
    backgroundColor: 'BGcolor',
    width: "29%",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  creatorPicCon: {
    backgroundColor: 'BGcolor',
    width: "20%",
    justifyContent: 'center',
    alignItems: 'flex-end',
    aspectRatio: 1/1,
  },
  DescripCon: {
    backgroundColor: 'BGcolor',
    width: "100%",
  },
  AcButton: {
  },

});