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
          <View style={styles.ActNameCon}>
            <Text style={{color: "white", fontSize: 20, fontWeight: 'bold', ellipsizeMode: 'tail',
            numberOfLines: 1, }}>สอนน้องร้องเพลงบุเรงนองร้องฮุ้วอะจุ้วอะจุ้วงุ้วงุ้ว</Text>
          </View>
          <View style={styles.countCon}>
            <Text style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>xx/xx</Text>
          </View>
          {Array.from({length: tag.length}).map((_, index) => (
            <View style={styles.tagCon}>
              <Text key={index} style={styles.tagText}>
                {tag[index]}
              </Text>
            </View>
          ))}
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: BGcolor,
      borderRadius: 25,
      width: "100%",
      padding: 10,
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
      width: "25%",   
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
