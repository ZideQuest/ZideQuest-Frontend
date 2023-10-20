import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

import { primaryColor_light } from "../../data/color";
import Checkmark from "../../../assets/images/svgs/Checkmark";

export default function ItemSelectingModal({
  subject,
  closeOnPress,
  children,
  refresher,
  isActive,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (closeOnPress) {
      setModalVisible(false);
    }
  }, [refresher]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setModalVisible((prev) => !prev)}
        style={[
          styles.subjectContainer,
          {
            backgroundColor: isActive ? primaryColor_light : "#fbfbfb",
            borderColor: isActive ? "transparent" : "#CDCDCD",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            // paddingRight: 10,
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 10,
          }}
        >
          {isActive && <Checkmark width={15} height={15} />}
          <Text style={styles.subjectText} numberOfLines={1}>
            {subject}
          </Text>
        </View>
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
            <Pressable
              // onPress={childPressHandler}
              style={styles.modalContainer}
            >
              {children}
            </Pressable>
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
    borderRadius: 10,
    maxHeight: "50%",
    marginHorizontal: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  subjectContainer: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 6,
    fontSize: 16,
    flex: 1,
  },
  subjectText: {
    fontFamily: "Kanit400",
    // textAlign: "center",
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    // gap: 5,
  },
});
