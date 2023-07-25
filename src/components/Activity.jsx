import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";

import yo from "../../assets/images/search.png";
import {tag} from "../data/dev-data";

BGcolor = '#f5da80';

export default function Activity(){
    return (
        <View style={styles.container}>
          <Image
              style={styles.pic}
              source={yo}
          />
          <View style={styles.DataCon}>
            <View style={styles.ActNameCon}>
              <Text style={{color: "white", fontSize: 20, fontWeight: 'bold',}}>สอนน้องร้องเพลงอุฟุฟวยฟ่วยฟวยฟวยฟวยฟวยฟวยฟวยฟวยฟวยฟวย</Text>
            </View>
            <View style={styles.countCon}>
              <Text style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>xx/xx</Text>
            </View>
            <View style={styles.timePlaceCon}>
              <Text style={{color: "white", fontSize: 20, fontWeight: 'bold',}}>todayyyy 77:77</Text>
            </View>
            <View style={styles.creatorCon}>
              <Text style={{color: "white", fontSize: 20, fontWeight: 'bold',}}>องกรวย</Text>
            </View>
            <View style={styles.creatorPicCon}>
              <Text style={{color: "white", fontSize: 20, fontWeight: 'bold',}}>องกรวย องกรวย องกรวย</Text>
            </View>
            {Array.from({length: tag.length}).map((_, index) => (
              <View style={styles.tagCon}>
                <Text key={index} style={styles.tagText}>
                  {tag[index]}
                </Text>
              </View>
            ))}
          </View>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: BGcolor,
      borderRadius: 25,
      width: "100%",
      padding: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: 10,
      columnGap: 10,
    },
    tagText: {
      color: "black",
      padding: 5,
    },
    pic: {
      width: '100%',
      resizeMode: 'contain',
      backgroundColor: 'black',
      borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    },
    DataCon: {
      backgroundColor: '#aaff00',
      borderRadius: 25,
      width: "100%",
      padding: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: 10,
      columnGap: 10,
    },

    tagCon: {
      backgroundColor: "white",
      alignSelf: 'flex-start',   
      borderRadius: 40,   
      
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
    timePlaceCon: {
      backgroundColor: 'black',
      width: "45%",      
      justifyContent: 'center', 
    },
    creatorCon: {
      backgroundColor: 'black',
      width: "29%",      
      justifyContent: 'center', 
      alignItems: 'flex-end',
    },
    creatorPicCon: {
      backgroundColor: 'black',
      width: "20%",      
      justifyContent: 'center', 
      alignItems: 'flex-end',
    },    
  });
