import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";

export default function ImagePreviewModal({
  modalVisible,
  setModalVisible,
  imageUri,
}) {
  const closeModalHandler = () => {
    setModalVisible(false);
  };

  return (
    <Modal transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000aa",
        }}
      >
        <TouchableOpacity
          onPress={closeModalHandler}
          style={{
            position: "absolute",
            top: 50,
            left: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>X</Text>
        </TouchableOpacity>
        <View style={{ height: "50%", width: "70%" }}>
          <Image
            resizeMode="contain"
            source={{ uri: imageUri }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      </View>
    </Modal>
  );
}
