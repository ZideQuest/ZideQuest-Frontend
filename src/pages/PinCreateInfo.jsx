import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";
import BackButton from "../components/button/BackButton";
import { useAppContext } from "../data/AppContext";
import * as TabNavigation from "../data/TabNavigation";
import { createLocation } from "../data/locations";
import { primaryColor } from "../data/color";
import BigButton from "../components/button/BigButton";
import ImagePreviewModal from "../components/misc/ImagePreviewModal";
import Spinner from "../components/Animations/Spinner";

export default function PinCreateInfo() {
  const { newMarker, setNewMarker } = useAppContext();

  const closeHandler = (pinId) => {
    alert("สร้างสถานที่สำเร็จ");
    TabNavigation.navigate("PinDetail", { pinId });
  };

  const [state, setState] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState(newMarker.name);
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async () => {
    if (!place && !detail) {
      alert("กรุณากรอกชื่อสถานที่และรายละเอียด");
      return;
    }
    if (!place) {
      alert("กรุณากรอกชื่อสถานที่");
      return;
    }
    if (!detail) {
      alert("กรุณากรอกรายละเอียด");
      return;
    }
    setIsLoading(true);

    let bodyFormData = new FormData();

    bodyFormData.append("locationName", place);
    bodyFormData.append("description", detail);
    bodyFormData.append("latitude", newMarker.latitude);
    bodyFormData.append("longitude", newMarker.longitude);
    bodyFormData.append("img", {
      uri: state.image?.assets?.[0]?.uri,
      name: state.image?.assets?.[0]?.fileName,
      type: state.image?.assets?.[0]?.type,
    });
    const response = await createLocation(bodyFormData);
    if (response.status === 200) {
      const { data } = response;
      closeHandler(data._id);
    }
    setIsLoading(false);
  };

  const cameraRequest = async () => {
    const results = await ImagePicker.requestCameraPermissionsAsync();
    if (results.granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
      });
      console.log(result);
      if (!result.canceled) {
        setState({
          image: result,
        });
      }
    }
  };

  const galleryRequest = async () => {
    const results = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (results.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
      });
      // console.log(result.assets);
      if (!result.canceled) {
        setState({
          image: result,
        });
      }
    }
    console.log(results);
  };

  if (isLoading) {
    return (
      <Bottomsheet snapPoints={["60%"]} index={0}>
          <Spinner />
      </Bottomsheet>
    );
  }

  return (
    <Bottomsheet snapPoints={["60%", "90%"]} index={0}>
      <ImagePreviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageUri={state.image?.assets?.[0]?.uri}
      />

      <View style={styles.container}>
        <BackButton onPress={() => setNewMarker(null)} />
        <Text style={styles.txt}>เพิ่มสถานที่ใหม่</Text>
        <View style={styles.input}>
          <View>
            <Text>ชื่อสถานที่*</Text>
            <TextInput
              style={styles.txtin}
              value={place}
              onChangeText={setPlace}
            />
          </View>
          <View>
            <Text>รายละเอียด*</Text>
            <TextInput
              style={styles.txtin}
              value={detail}
              onChangeText={setDetail}
            />
          </View>
        </View>
        <Text>เพิ่มรูปภาพ</Text>
        <View style={styles.icon}>
          <TouchableOpacity onPress={cameraRequest}>
            <Image source={photo_icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={galleryRequest}>
            <Image source={picture_icon} />
          </TouchableOpacity>
        </View>
        {state.image && (
          <TouchableOpacity
            style={styles.img}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Image
              source={{ uri: state?.image.assets?.[0]?.uri }}
              style={{ height: 35, width: 35 }}
            />
            <Text style={styles.txt_img}>
              {state?.image?.assets?.[0]?.fileName}
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 45 }}>
          <BigButton
            bg={primaryColor}
            onPress={submitHandler}
            text="สร้างสถานที่"
          />
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 35,
  },
  icon: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    // position: "absolute",
    // bottom: 20,
    // flex: 1,
    backgroundColor: primaryColor,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
});
