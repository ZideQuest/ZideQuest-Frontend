import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";
import * as ImagePicker from "expo-image-picker";

function AddPhoto({ image, setImage }) {
  const onPressImage = async () => {
    try {
      const results = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (results.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0,
          base64: true,
        });

        if (!result.canceled) {
          setImage(result.assets[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPressCamera = async () => {
    const results = await ImagePicker.requestCameraPermissionsAsync();
    if (results.granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    }
  };

  return (
    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={onPressCamera}>
        <Image source={photo_icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressImage}>
        <Image source={picture_icon} />
      </TouchableOpacity>
    </View>
  );
}

export default AddPhoto;
