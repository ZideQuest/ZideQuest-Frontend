import React from "react";
import {View, Text, StyleSheet, Image} from "react-native"

import yo from "../../assets/images/search.png";

const Activity = () =>{
    return (
        <View style={styles.container}>
          {/* <Text style={{color:"white"}}>Ayo</Text> */}
            <Image
                style={styles.Apic}
                source={yo}
                
                />
            
            {/* <Text style={styles.textColor}>gggggg</Text> */}
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      borderRadius: 30,
      // padding: 150,
      width: "100%"
    },
    textColor: {
      color: "#FFFFFF"
    },
    Apic: {
        zIndex: 0,
        width: '100%',
        resizeMode: 'contain',

    }
  });

  export default Activity;