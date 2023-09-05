import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Modal
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";
import BackButton from "../components/button/BackButton";
import { useAppContext } from "../data/AppContext";
import * as TabNavigation from "../data/TabNavigation";
import {requestAPI} from "../API/api";

export default function PinCreateInfo () {
  const token ="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWI0ZWNlZWIyZTc0OTZkN2FjYWNjOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5Mzc1MzMxMywiZXhwIjoxNjk0MzU4MTEzfQ.fPcUcXbzpyECXMRSQLHFcVYwZddyvEdjA9kylGdOt9ncnGGB4ahgH_yuVLSmK8YOdltrQDj4EWhNlrq9QutPCCYutUvVASxfJFXEQVOoRuojywbmepEJ2fU_EpYpPzlWxMgoAX2O8XGluRqIt-u7jcCCHAtjAn1UFw-fOJ_EK9oOZQ4732y_AMC1gZCqlEddlrcOShOuGtEV6JviuvWL5NM_RsaA_xgNRsRZhtCa1WIFqigSeQKBmfKoDNM7pGQK4nexTCKbOcvhr9uyQATUs5xfgd7bA9qLCM4YkTJOQOMtHR6QhZ9Man4IMZLnKgMvYCwTW1AgjZNxUMHB980QHw";
  const { newMarker, setNewMarker, bottomModalRef } = useAppContext();

  const closeHandler = () => {
    TabNavigation.navigate("Recommend");
    bottomModalRef.current?.snapToIndex(1);
  };

  const [state, setState] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState("");
  const [detail, setDetail] = useState("");

    return (
      <Bottomsheet
        style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
        snapPoints={["60%", "90%"]}
        index={0}
      >
      
        <Modal transparent={true} visible={modalVisible} >
          
          <View style={{flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: "#000000aa"}}>
             <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={{position:"absolute" , top: 15 , left: 15}}>
                  <Text style={{color: "white" ,fontSize: 20}}>X</Text>
                </TouchableOpacity>
             <View style={{height: "50%" , width: "70%" }}>
               <Image resizeMode="contain" source={{uri: state?.image.assets?.[0]?.uri}} style={{height: "100%" , width: "100%" }} />
             </View>
          </View>
        </Modal>
        <View style={styles.container}>
        <BackButton />
        <Text style={styles.txt}>เพิ่มสถานที่ใหม่</Text>
        <View style={styles.input}>
          <View>
            <Text>ชื่อสถานที่*</Text>
            <TextInput style={styles.txtin} defaultValue={place} onChangeText={setPlace} multiline />
          </View>
          <View>
            <Text>รายละเอียด*</Text>
            <TextInput style={styles.txtin} defaultValue={detail} onChangeText={setDetail}  multiline />
          </View>
        </View>
        <Text>เพิ่มรูปภาพ</Text>
        <View style={styles.icon}>
          <TouchableOpacity
            onPress={async () => {
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
                if (!result.cancelled) {
                  setState({
                    image: result,
                  });
                }
              }
            }}
          >
            <Image source={photo_icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const results =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (results.granted) {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
                  base64: true,
                });
                // console.log(result.assets);
                if (!result.cancelled) {
                  setState({
                    image: result,
                  });
                }
              }
              console.log(results)
            }}
          >
            <Image source={picture_icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.img} onPress={()=>{setModalVisible(true)}}>
          <Image source={{uri: state?.image.assets?.[0]?.uri}} style={{height: 35 , width: 35}} />
          <Text style={styles.txt_img}>{state?.image?.assets?.[0]?.fileName}</Text>
        </TouchableOpacity>
        {/* {console.log(state?.image?.assets?.[0])} */}
        <TouchableOpacity
          // disabled={!place || !detail}
          style={styles.btn}
          onPress={async() => {
            if(!place && !detail){
              alert("กรุณากรอกชื่อสถานที่และรายละเอียด")
              return
            }
            if(!place){
              alert("กรุณากรอกชื่อสถานที่")
              return
            }
            if(!detail){
              alert("กรุณากรอกรายละเอียด")
              return
            }
            var bodyFormData = new FormData();

            bodyFormData.append('locationName', place);
            bodyFormData.append('latitude', newMarker.latitude);
            bodyFormData.append('longitude', newMarker.longitude);
            // bodyFormData.append('description', detail);
            bodyFormData.append('img', state?.image?.assets?.[0]?.uri?.replace("file://",""));
            const response= await requestAPI({method: "POST", url: "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api/location/", headers: {
              "Content-Type":'multipart/form-data',
              Authorization: `Bearer ${token}`
            }, data: bodyFormData})
            console.log(state?.image?.assets?.[0]?.uri)
            if(response.status === 200){
              closeHandler()
            }
            
           }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            สร้างสถานที่
          </Text>
        </TouchableOpacity>
      </View>
      </Bottomsheet>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  txt: {
    display: "flex",
    textAlign: "center",
    fontSize: 30,
    marginTop: 20,
  },
  input: {
    marginTop: 30,
    gap: 10,
    marginBottom: 20,
  },
  txtin: {
    borderWidth: 1,
    minHeight: 27.25,
    borderRadius: 5,
    backgroundColor: "#FBFBFB",
    borderColor: "#CDCDCD",
    padding: 5,
  },
  img: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 35,
  },
  icon: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    position: "absolute",
    bottom: 20,
    flex: 1,
    backgroundColor: "#E86A33",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
});
