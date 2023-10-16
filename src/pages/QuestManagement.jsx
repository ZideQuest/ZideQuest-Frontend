import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import {
  getQuestData,
  sendQuestComplete,
  creatorCancelQuest,
} from "../data/Quest";
import BigButton from "../components/button/BigButton";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import ActivityName from "../components/Quest/ActivityName";
import {
  buttonBlue,
  buttonBrightGreen,
  buttonDarkRed,
  buttonGrey,
} from "../data/color";
import Participants from "../components/Participants/Participants";
import Alert from "../components/misc/Alert";

export default function QuestManagement({ route }) {
  const [questData, setQuestData] = useState(null);
  const { userDetail } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const data = await getQuestData(route.params?.questId);
        setQuestData(data);
      } catch (error) {
        console.error("Error fetching quest", error);
      }
    };
    fetchQuestData();
  }, []);

  const questCompleteHandler = async () => {
    if (!ownerChecker()) {
      return alert("You are not allowed to end this quest.");
    }

    if (questData.status) {
      return;
    } else if (
      await Alert(
        "Confirm Quest completed",
        "Are you sure you want to end this quest?"
      )
    ) {
      try {
        const data = await sendQuestComplete(route.params.questId);
        alert("ยืนยันสำเร็จ");
        setQuestData((prev) => ({ ...prev, status: true }));
      } catch (error) {
        alert("ยืนยันไม่สำเร็จ");
      }
    }
  };

  const GenQRHandler = async () => {
    if (!ownerChecker()) {
      return alert("You are not allowed to view check-in QR code.");
    }
    if (questData.status) {
      return;
    } else if (
      await Alert(
        "สร้าง QR code",
        "ต้องการแสดง QR Code สำหรับ Check-in หรือไม่"
      )
    ) {
      TabNavigation.navigate("GenQRScreen", { questId: route.params?.questId });
    }
  };

  const editQuestButtonHandler = async () => {
    if (ownerChecker()) {
      TabNavigation.navigate("EditQuest", { questId: route.params.questId });
    } else {
      alert("You are not allowed to edit this quests.");
    }
  };

  const ownerChecker = () => {
    if (
      userDetail.isAdmin === "admin" ||
      questData?.creatorId === userDetail.user._id
    ) {
      return true;
    } else {
      return false;
    }
  };

  const cancelQuestHandler = () => {
    if (!ownerChecker()) {
      return alert("You are not allowed to cancel this quest.");
    }
    if (questData.status) {
      return;
    } else if (!questData.status) {
      setModalVisible(true);
    }
  };

  const sendInputData = () => {
    // Do something with the inputValue
    console.log("Input Value:", inputValue);
    creatorCancelQuest(route.params.questId, inputValue);

    // Close the modal
    setModalVisible(false);
  };

  return (
    <BottomsheetDynamic snapPoints={["20%"]} index={1} hideBar={true}>
      <View style={styles.container}>
        {questData?.picturePath && (
          <View style={styles.bannerContainer}>
            <Image src={questData?.picturePath} style={styles.bannerImage} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <ActivityName quest={questData} />
          <TouchableOpacity onPress={editQuestButtonHandler}>
            <Text
              style={{
                color: "teal",
                fontFamily: "Kanit300",
                opacity: ownerChecker() ? 1 : 0.3,
              }}
            >
              แก้ไขข้อมูลเควส
            </Text>
          </TouchableOpacity>
          <Participants
            questId={route.params.questId}
            ownerChecker={ownerChecker}
          />
          <View style={{ opacity: ownerChecker() ? 1 : 0.4, gap: 7 }}>
            <View style={styles.buttonContainer}>
              <BigButton
                text="ยืนยัน Quest Completed"
                bg={questData?.status ? buttonGrey : buttonBrightGreen}
                color={questData?.status ? "grey" : "white"}
                onPress={questCompleteHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <BigButton
                text="สร้าง Check-in QR Code"
                bg={questData?.status ? buttonGrey : buttonBlue}
                color={questData?.status ? "grey" : "white"}
                onPress={GenQRHandler}
              />
            </View>

            <View style={styles.buttonContainer}>
              <BigButton
                text="ยกเลิก Quest"
                bg={questData?.status ? buttonGrey : buttonDarkRed}
                color={questData?.status ? "grey" : "white"}
                onPress={cancelQuestHandler}
              />
            </View>
            <Modal
              animationType="slide"
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalContainer}>
                <View>
                  <Text style={{ fontFamily: "Kanit500" }}>
                    ทำไมถึงจะยกเลิกล่ะ?
                  </Text>

                  {/* Input Component */}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter something"
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                  />

                  {/* Button Component */}
                  <BigButton
                    text="Remove Quest"
                    bg={buttonDarkRed} // Change the color as needed
                    color="white"
                    onPress={sendInputData}
                  />

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Text></Text>
          </View>
        </View>
      </View>
    </BottomsheetDynamic>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
  },
  bannerContainer: {
    width: "100%",
    height: 240,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  cancelButton: {
    backgroundColor: buttonGrey, // Change the color as needed
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "grey",
    fontFamily: "Kanit400", // Change the font family as needed
  },
});
