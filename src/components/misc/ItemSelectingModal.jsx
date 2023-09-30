import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

export default function ItemSelectingModal({ subject, children }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        onPress={() => setModalVisible((prev) => !prev)}
        style={styles.subjectContainer}
      >
        <Text style={styles.subjectText}>{subject}</Text>
      </TouchableOpacity>
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.entireScreen}
            activeOpacity={1}
            onPressOut={() => {
              setModalVisible(false);
            }}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>{children}</View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  entireScreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(10,10,10,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    maxHeight: "50%",
    marginHorizontal: 15,
  },
  subjectContainer: {
    borderColor: "#CDCDCD",
    borderWidth: 1,
    padding: 4,
    backgroundColor: "#fbfbfb",
    borderRadius: 10,
    fontSize: 16,
  },
  subjectText: {
    fontFamily: "Kanit400",
  },
});
