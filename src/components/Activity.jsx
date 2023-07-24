import React from "react";
import {View, Text, StyleSheet, Image} from "react-native"

import yo from "../../assets/images/search.png";
import {tag} from "../data/dev-data"

export default function Activity(){
    return (
        <View style={styles.container}>
          <Image
              style={styles.pic}
              source={yo}
          />
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
      backgroundColor: "black",
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
      
    }
  });
