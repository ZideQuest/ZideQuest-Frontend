import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as TabNavigation from "../data/TabNavigation";
import { useAppContext } from "../data/AppContext";
import { getQuestData, sendQuestComplete } from "../data/Quest";
import BigButton from "../components/button/BigButton";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import ActivityName from "../components/Quest/ActivityName";
import {
  buttonBlue,
  buttonBrightGreen,
  buttonGrey,
  buttonNormalGreen,
} from "../data/color";
import Participants from "../components/Participants/Participants";
import Alert from "../components/misc/Alert";
import Tag from "../components/Quest/Tag";

export default function QuestManagement({ route }) {
  const [questData, setQuestData] = useState(null);
  const { userDetail } = useAppContext();

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
        TabNavigation.navigate("Recommend");
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
    if (questData?.status) {
      return;
    }
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

  return (
    <BottomsheetDynamic snapPoints={["20%"]} index={1} hideBar={true}>
      <View style={styles.container}>
        {questData?.picturePath && (
          <View style={styles.bannerContainer}>
            <Image src={questData?.picturePath} style={styles.bannerImage} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <ActivityName
            quest={questData}
            backButtonRoute={{
              targetRoute: route.params?.fromScreen,
              params: route.params?.fromParams,
              resetFocus: route.params?.resetFocus,
            }}
          />
          <View
            style={{
              alignItems: "flex-start",
            }}
          >
            <Tag tags={questData?.tag} />
          </View>
          <TouchableOpacity onPress={editQuestButtonHandler}>
            <Text
              style={{
                color: questData?.status ? "grey" : "teal",
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
            isCompleted={questData?.status}
          />
          <View style={{ opacity: ownerChecker() ? 1 : 0.4, gap: 7 }}>
            <View style={styles.buttonContainer}>
              <BigButton
                text="ยืนยัน Quest Completed"
                bg={
                  questData
                    ? questData.status
                      ? buttonGrey
                      : buttonBrightGreen
                    : buttonGrey
                }
                color={questData?.status ? "grey" : "white"}
                onPress={questCompleteHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <BigButton
                text="สร้าง Check-in QR Code"
                bg={
                  questData
                    ? questData.status
                      ? buttonGrey
                      : buttonBlue
                    : buttonGrey
                }
                color={questData?.status ? "grey" : "white"}
                onPress={GenQRHandler}
              />
            </View>
          </View>
        </View>
      </View>
    </BottomsheetDynamic>
  );
}

const styles = StyleSheet.create({
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
