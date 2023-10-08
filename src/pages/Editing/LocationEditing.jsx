import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { useAppContext } from "../../data/AppContext";
import * as ImagePicker from "expo-image-picker";
import * as TabNavigation from "../../data/TabNavigation";

import BottomsheetDynamic from "../../components/Bottomsheet/BottomsheetDynamic";
import BigButton from "../../components/button/BigButton";
import ImagePreviewModal from "../../components/misc/ImagePreviewModal";
import Spinner from "../../components/Animations/Spinner";
import BackButton from "../../components/button/BackButton";
import AddPhoto from "../../components/AddPhoto";
import Alert from "../../components/misc/Alert";

import bin_icon from "../../../assets/images/bin.png";
import {
  getLocationData,
  editLocation,
  deleteLocation,
} from "../../data/locations";
import { primaryColor } from "../../data/color";

export default function PinCreateInfo({ route }) {
  const { newMarker, setNewMarker, mapRefetch, setFocusedPin } =
    useAppContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState(newMarker?.name);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const { location } = await getLocationData(route.params?.pinId);
        setPlace(location.locationName.replace(/\n/g, " "));
        setDetail(location.description);
        setImage(location.picturePath ? { uri: location.picturePath } : null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching locations", error);
        TabNavigation.navigate("PinDetail", { pinId: route.params?.pinId });
      }
    };
    fetchLocationData();
  }, []);

  const closeHandler = (pinId) => {
    alert("แก้ไขข้อมูลสถานที่สำเร็จ");
    TabNavigation.navigate("PinDetail", { pinId });
    mapRefetch();
    setNewMarker(null);
    setFocusedPin(pinId);
  };

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

    // if (image != null) {
    //   bodyFormData.append("img", {
    //     name: image.fileName,
    //     type: image.type,
    //     uri:
    //       Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
    //   });
    // }

    try {
      const { data } = await editLocation(bodyFormData, route.params?.pinId);
      closeHandler(data.location._id);
    } catch (error) {
      alert("error editing location");
      console.error(error);
    }
    setIsLoading(false);
  };

  const locationDeleteHandler = async () => {
    if (
      await Alert(
        "Delete this Location",
        "Are you sure you want to delete this location pin?"
      )
    ) {
      const res = await deleteLocation(route.params?.pinId);
      TabNavigation.navigate("Recommend");
      mapRefetch();
      alert("ลบสถานที่สำเร็จ");
    }
  };

  if (isLoading) {
    return (
      <BottomsheetDynamic snapPoints={["20%"]} index={1}>
        <Spinner />
      </BottomsheetDynamic>
    );
  }

  return (
    <BottomsheetDynamic snapPoints={["20%"]} index={1}>
      {/* <ImagePreviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageUri={image.assets?.[0]?.uri}
      /> */}

      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={styles.textXl}>แก้ไขข้อมูล</Text>
            <TouchableOpacity
              style={styles.binIcon}
              onPress={locationDeleteHandler}
            >
              <Image
                source={bin_icon}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>
          <BackButton
            targetRoute="PinDetail"
            params={{ pinId: route.params?.pinId }}
            resetFocus={false}
          />
        </View>
        <View style={styles.input}>
          <View>
            <Text>ชื่อสถานที่*</Text>
            <BottomSheetTextInput
              style={styles.txtin}
              value={place}
              onChangeText={setPlace}
            />
          </View>
          <View>
            <Text>รายละเอียด*</Text>
            <BottomSheetTextInput
              style={styles.txtin}
              value={detail}
              onChangeText={setDetail}
            />
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.textMd}>เพิ่่มรูปภาพ</Text>
          <AddPhoto image={image} setImage={setImage} />
          {image && (
            <View style={styles.image}>
              <TouchableOpacity
                style={styles.xBtn}
                onPress={() => {
                  setImage(null);
                }}
              >
                <Text style={styles.xtextbtn}>X</Text>
              </TouchableOpacity>
              <Image
                source={{ uri: image.uri }}
                style={{ height: 150, flex: 1 }}
              />
            </View>
          )}
        </View>
        <View style={{ height: 45, marginTop: 10 }}>
          <BigButton
            bg={primaryColor}
            onPress={submitHandler}
            text="ยืนยันการแก้ไข"
          />
        </View>
      </View>
    </BottomsheetDynamic>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  txt: {
    fontSize: 28,
    fontFamily: "Kanit300",
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
  xBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 100,
    padding: 3,
    width: 20,
    height: 20,
  },
  binIcon: {
    width: 25,
    height: 25,
  },
  textXl: {
    fontSize: 25,
    fontFamily: "Kanit400",
  },
});
