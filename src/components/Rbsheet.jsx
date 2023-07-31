import React, { Component } from "react";
import { View, TouchableOpacity ,StyleSheet ,Image,Text,TextInput} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";
 
export default class RB extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newMarker !== this.props.newMarker) {
        console.log("prevProps", prevProps);
        console.log(this.props);
        this.RBSheet.open();
    }
  }


//  componentDidMount() {
//     this.RBSheet.open();
//  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              padding: 30,
            }
          }}
        >
            <Text style={styles.txt}>เพิ่มสถานที่ใหม่</Text>
            <View style={styles.input}>
            <View>
            <Text>ชื่อสถานที่</Text>
            <TextInput style={styles.txtin} multiline/>
            </View>
            <View>
            <Text>รายละเอียด</Text>
            <TextInput style={styles.txtin} multiline/>
            </View>
            </View>
            <Text>เพิ่มรูปภาพ</Text>
            <View style={styles.icon}>
                <TouchableOpacity>
                <Image source={photo_icon}/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source={picture_icon}/>
                </TouchableOpacity>
            </View>
                <TouchableOpacity style={styles.btn} onPress={() => alert("สร้างสถานที่")}>
                    <Text style={{
                        color: "white",
                }}>
                    สร้างสถานที่
                    </Text>
                </TouchableOpacity>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt:{
    display: "flex",
    textAlign: "center",
    fontSize: 30,
  },
    input:{
        marginTop: 40,
        gap: 10,    
        marginBottom: 20,
    },
    txtin:{
        borderWidth: 1,
        minHeight: 27.25,
        borderRadius: 5,
        backgroundColor: "#FBFBFB",
        borderColor: "#CDCDCD",
        padding: 5,
    },
    icon:{
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
    btn:{   
        position:"absolute",
        bottom: 20,
        flex: 1,
        backgroundColor: "#E86A33",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        height: 40,
        borderRadius: 10,
    }
});