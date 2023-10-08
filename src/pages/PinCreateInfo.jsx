import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";
import BackButton from "../components/button/BackButton";
import { useAppContext } from "../data/AppContext";
import * as TabNavigation from "../data/TabNavigation";
import { createLocation } from "../data/locations";
import { primaryColor, textColor } from "../data/color";
import BigButton from "../components/button/BigButton";
import ImagePreviewModal from "../components/misc/ImagePreviewModal";
import Spinner from "../components/Animations/Spinner";
import AddPhoto from "../components/AddPhoto";
import close_icon from "../../assets/images/close_icon.png";

export default function PinCreateInfo() {
  const { newMarker, setNewMarker, mapRefetch, setFocusedPin } =
    useAppContext();

  const closeHandler = (pinId) => {
    alert("สร้างสถานที่สำเร็จ");
    TabNavigation.navigate("PinDetail", { pinId });
    mapRefetch();
    setNewMarker(null);
    setFocusedPin(pinId);
  };

  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState(newMarker?.name);
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitHandler = async () => {
    setIsSubmitted(true);

    if (!place || !detail) {
      alert("กรุณากรอกรายละเอียดให้ครบถ้วน");
      return;
    }
    setIsLoading(true);

    let bodyFormData = new FormData();

    bodyFormData.append("locationName", place.replace(/\n/g, " "));
    bodyFormData.append("description", detail);
    bodyFormData.append("latitude", newMarker.latitude);
    bodyFormData.append("longitude", newMarker.longitude);

    if (image != null) {
      bodyFormData.append("img", {
        name: image.fileName,
        type: image.type,
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
      });
    }

    try {
      const response = await createLocation(bodyFormData);
      const { data } = response;
      closeHandler(data._id);
    } catch (error) {
      alert(error);
      console.error(error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <BottomsheetDynamic snapPoints={[]} index={0}>
        <Spinner />
      </BottomsheetDynamic>
    );
  }

  return (
    <BottomsheetDynamic snapPoints={["20%"]} index={1}>
      <ImagePreviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageUri={image?.uri}
      />

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.txt}>เพิ่มสถานที่ใหม่</Text>
          <BackButton onPress={() => setNewMarker(null)} />
        </View>
        <View style={styles.input}>
          <View style={styles.inputField}>
            <Text
              style={[
                styles.inputDeail,
                { color: isSubmitted && !place ? "red" : textColor },
              ]}
            >
              ชื่อสถานที่*
            </Text>
            <BottomSheetTextInput
              style={[
                styles.txtin,
                { borderColor: isSubmitted && !place ? "red" : "#CDCDCD" },
              ]}
              value={place}
              onChangeText={setPlace}
            />
          </View>
          <View style={styles.inputField}>
            <Text
              style={[
                styles.inputDeail,
                { color: isSubmitted && !detail ? "red" : textColor },
              ]}
            >
              รายละเอียด*
            </Text>
            <BottomSheetTextInput
              style={[
                styles.txtin,
                { borderColor: isSubmitted && !detail ? "red" : "#CDCDCD" },
              ]}
              value={detail}
              onChangeText={setDetail}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.inputDeail}>เพิ่มรูปภาพ</Text>
          <AddPhoto image={image} setImage={setImage} />
          {image && (
            <View style={styles.image}>
              <TouchableOpacity
                onPress={() => {
                  setImage(null);
                }}
                style={styles.xBtn}
              >
                <Image source={close_icon} style={styles.x} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={{ uri: image.uri }}
                  style={{ height: 150, flex: 1 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: 45 }}>
          <BigButton
            bg={primaryColor}
            onPress={submitHandler}
            text="สร้างสถานที่"
          />
        </View>
      </View>
    </BottomsheetDynamic>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 7,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    fontSize: 30,
    fontFamily: "Kanit400",
  },
  input: {
    gap: 10,
    marginBottom: 10,
  },
  txtin: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FBFBFB",
    borderColor: "#CDCDCD",
    padding: 5,
    fontFamily: "Kanit300",
  },
  img: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 35,
  },

  xBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  x: {
    width: "100%",
    height: "100%",
  },
  image: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: "relative",
  },
  inputDeail: {
    fontFamily: "Kanit300",
  },
  inputField: {
    gap: 3,
  },
  box: {
    marginBottom: 8,
  },
});
