import React from "react";
import {
  Modal,
  View,
  Pressable,
  Image,
} from "react-native";

export default function ImagePreviewModal({
  modalVisible,
  setModalVisible,
  imageUri,
}) {
  return (
    <Modal transparent={true} visible={modalVisible}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000aa",
        }}
        onPress={() => setModalVisible(false)}
      >
        <Image
          resizeMode="contain"
          source={{ uri: imageUri }}
          style={{ height: "100%", width: "100%" }}
        />
      </Pressable>
    </Modal>
  );
}
