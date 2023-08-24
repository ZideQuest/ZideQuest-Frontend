import React, { Component } from "react";
import { View, TouchableOpacity ,StyleSheet ,Image,Text,TextInput} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";

 
onPress = () => {
    if (!this.state.open) {
      this.RBSheet.open();
    } else {
      this.RBSheet.close();
    }
    this.setState({ open: !this.state.open });
  };

export default class RB extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newMarker !== this.props.newMarker) {
        this.RBSheet.open();
    }

  }
  

  render() {
    // const [open, setOpen] = useState(false);
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
                <TouchableOpacity style={styles.btn} onPress={() => {this.RBSheet.close() }}>
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
    marginTop: 20,
  },
    input:{
        marginTop: 30,
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