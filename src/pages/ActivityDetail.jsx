import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { getQuestData } from "../data/Quest";
import Tag from "../components/Quest/Tag";
import ActivityName from "../components/Quest/ActivityName";
import Spinner from "../components/Animations/Spinner";
import BottomsheetDynamic from "../components/Bottomsheet/BottomsheetDynamic";
import BigButton from "../components/button/BigButton";
import { join_leave } from "../data/join-leave";

import { textColor, BGcolor, primaryColor, buttonGrey } from "../data/color";

export default function ActivityDetail() {
  const [QuestDetail, setQuestDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const route = useRoute();
  const { questId } = route.params;
  const [isJoined, setIsJoined] = useState(false);

  const joinAlert = (questId) =>
    Alert.alert("ยืนยันการเข้าร่วมกิจกรรม", "ต้องการเข้าร่วม กด OK!", [
      {
        text: "OK!",
        onPress: async () => {
          setLoading(true);
          try {
            const newData = await join_leave(questId);
            setIsJoined(true);
            setQuestDetail({
              ...QuestDetail,
              countParticipant: newData.countParticipant,
            });
            Alert.alert("เข้าร่วมสำเร็จ!");
          } catch (error) {
            Alert.alert("เข้าร่วมไม่สำเร็จ");
          }
          setLoading(false);
        },
      },
      {
        text: "cancel",
      },
    ]);

  const leaveAlert = (questId) =>
    Alert.alert(
      "ยืนยันยกเลิกการเข้าร่วม",
      "ต้องการยกเลิกการเข้าร่วมกิจกรรม กด YES",
      [
        {
          text: "OK!",
          onPress: async () => {
            setLoading(true);
            try {
              const newData = await join_leave(questId);
              console.log(newData);
              setIsJoined(false);
              setQuestDetail({
                ...QuestDetail,
                countParticipant: newData.countParticipant,
              });
              Alert.alert("ยกเลิกสำเร็จ!");
            } catch (error) {
              console.error(error);
              Alert.alert("ยกเลิกไม่สำเร็จ");
            }
            setLoading(false);
          },
        },
        {
          text: "cancel",
        },
      ]
    );

  useEffect(() => {
    const fetchData = async (questId) => {
      try {
        const response = await getQuestData(questId);
        setQuestDetail(response);
        setLoading(false);
        setIsJoined(response.isJoin);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(questId);
  }, []);

  return (
    <BottomsheetDynamic style={styles.container} snapPoints={["20%"]} index={1}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </View>
      ) : (
        <BottomSheetScrollView>
          <View style={styles.ScrollView}>
            <View style={{ width: "100%", paddingHorizontal: 15 }}>
              <ActivityName quest={QuestDetail} />
            </View>
            {QuestDetail.picturePath && (
              <View style={styles.picCon}>
                <Image style={styles.pic} src={QuestDetail.picturePath} />
              </View>
            )}
            <View
              style={{
                alignItems: "flex-start",
                paddingHorizontal: 15,
                paddingVertical: 7,
              }}
            >
              <Tag tags={QuestDetail?.tag} />
            </View>
            <View style={styles.DescripCon}>
              <Text
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontFamily: "Kanit300",
                }}
              >
                {QuestDetail.description}
              </Text>
            </View>
            {isJoined &&
              (QuestDetail.isCheckedIn ? (
                <Text style={[styles.checkinStatus, { color: "green" }]}>
                  เช็คอินแล้ว
                </Text>
              ) : (
                <Text style={[styles.checkinStatus, { color: "red" }]}>
                  ยังไม่ได้เช็คอิน
                </Text>
              ))}

            <View style={styles.ButtonCon}>
              {isJoined ? (
                <BigButton
                  text="ยกเลิกการเข้าร่วม"
                  bg={QuestDetail.status ? buttonGrey : "#8C1C15"}
                  onPress={() => leaveAlert(questId)}
                />
              ) : (
                <BigButton
                  text="เข้าร่วมกิจกรรม"
                  bg={QuestDetail.status ? buttonGrey : primaryColor}
                  color={QuestDetail.status ? "grey" : "white"}
                  onPress={() => joinAlert(questId)}
                />
              )}
            </View>
          </View>
        </BottomSheetScrollView>
      )}
    </BottomsheetDynamic>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BGcolor,
    width: "100%",
    flexDirection: "row",
    flex: 1,
  },
  picCon: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  pic: {
    width: "100%",
    height: "100%",
  },
  DescripCon: {
    paddingHorizontal: 15,
    backgroundColor: BGcolor,
    width: "100%",
  },
  ButtonCon: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  checkinStatus: {
    fontFamily: "Kanit300",
    fontSize: 16,
    marginHorizontal: 15,
  },
});
