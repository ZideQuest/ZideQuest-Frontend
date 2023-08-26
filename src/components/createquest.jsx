import React, { Component } from "react";
import { View, TouchableOpacity ,StyleSheet ,Image,Text,TextInput} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

 

export default class New_Quest extends Component {

componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentMarkerSelecting !== this.props.currentMarkerSelecting) {
      if (this.props.currentMarkerSelecting) {
        this.RBSheet.open();
       }
    }}

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
             paddingBottom: 20,
             paddingLeft: 20,
              paddingRight: 20,
            },
            draggableIcon: {
             width: 100,
          }
          }}
        >
             <View style={styles.container}>
      <Text style={styles.textColor}>Pin: {this.props.currentMarkerSelecting}</Text>
      <Text style={styles.textColor}>Detail {this.props.currentMarkerDetail?.locationName}</Text>
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
        </RBSheet>
      </View>
    );
  }
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
