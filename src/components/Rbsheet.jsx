import React, { Component } from "react";
import { View, TouchableOpacity ,StyleSheet ,Image,Text,TextInput} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import cancelPinCreating from "../pages/HomeScreen";
import * as ImagePicker from 'expo-image-picker';

import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";
import { API } from "../api";

 

export default class RB extends Component {


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newMarker !== this.props.newMarker) {
      if (this.props.newMarker) {
        this.RBSheet.open();
       }
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
            },
            draggableIcon: {
             width: 100,
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
                <TouchableOpacity onPress={async()=>{
                  const results = await ImagePicker.requestCameraPermissionsAsync();
                  if (results.granted) {
                    
                    let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                    base64: true,

                  });
                  console.log(result);
                  if(!result.cancelled){
                    this.setState({ image: result,token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTMxMjg3Y2YyNDQzYmY0NmJmMzAwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkzMDU4MzM1LCJleHAiOjE2OTMwNjE5MzV9.cFkk39NtyXqpNSzy-ZegzQzVbMhEJTBjb9wjiohwLe5CmfTKxTyswWfjVy2zLy3m6cBAThYYPI-PPUzXJz6TctiJS7dqL7EovLM6CAC6nFpGety0su8GAjGZN5h5cQGmxKsV9CtIGD0e-b8FjV5QEX00xa79ud237BVKdAOGToJ7AHl9Dm9jyxD82prt3CPEK6R05h8ffsp0fgne8fbxnniNoy3LwfrstfPegUsgGX3SoRBPNZMVXl-4uNYKXGdQtVIXvlDEmt289m66_DIjur6p5tYGTm0TYKFG1iJiUQldOb0l2icEInCjrdfPZx9TQiAjMO-yeCxOWcpAwJ8fPw" })
                    
                  }
                }
                }}>
                  
                <Image source={photo_icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={async()=>{
                  const results = await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (results.granted) {
                    
                    let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                    base64: true,

                  });
                  console.log(result);
                  if(!result.cancelled){
                    this.setState({ image: result,token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTMxMjg3Y2YyNDQzYmY0NmJmMzAwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkzMDU4MzM1LCJleHAiOjE2OTMwNjE5MzV9.cFkk39NtyXqpNSzy-ZegzQzVbMhEJTBjb9wjiohwLe5CmfTKxTyswWfjVy2zLy3m6cBAThYYPI-PPUzXJz6TctiJS7dqL7EovLM6CAC6nFpGety0su8GAjGZN5h5cQGmxKsV9CtIGD0e-b8FjV5QEX00xa79ud237BVKdAOGToJ7AHl9Dm9jyxD82prt3CPEK6R05h8ffsp0fgne8fbxnniNoy3LwfrstfPegUsgGX3SoRBPNZMVXl-4uNYKXGdQtVIXvlDEmt289m66_DIjur6p5tYGTm0TYKFG1iJiUQldOb0l2icEInCjrdfPZx9TQiAjMO-yeCxOWcpAwJ8fPw" })
                    
                  }
                }
                  // console.log(results)
                }}>
                <Image source={picture_icon}/>
                </TouchableOpacity>
            </View>
                <TouchableOpacity style={styles.btn} onPress={async() => {
                  this.RBSheet.close() 
                  // const response = await API("POST","/location/","")
                }}>
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