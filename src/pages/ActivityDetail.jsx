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
import { activityCategories } from "../data/activityCategory";

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

  const leaveAlert = (questId) => {
    Alert.alert(
      "ยืนยันยกเลิกการเข้าร่วม",
      "ต้องการยกเลิกการเข้าร่วมกิจกรรม กด YES",
      [
        {
          text: "YES",
          onPress: async () => {
            setLoading(true);
            try {
              const newData = await join_leave(questId);
              setIsJoined(false);
              setQuestDetail({
                ...QuestDetail,
                countParticipant: newData.countParticipant,
              });
              Alert.alert("ยกเลิกสำเร็จ!");
            } catch (error) {
              console.error(error);
              if (error.response.status === 430) {
                Alert.alert("เควสที่เข้าร่วมไปแล้วไม่สามารถออกได้");
              } else Alert.alert("ยกเลิกไม่สำเร็จ");
            }
            setLoading(false);
          },
        },
        {
          text: "NO",
        },
      ]
    );
  };

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
  // console.log(QuestDetail)
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
        <View>
          <View style={{ width: "100%", paddingHorizontal: 15 }}>
            <ActivityName
              quest={QuestDetail}
              showGain={false}
              backButtonRoute={{
                targetRoute: route.params?.fromScreen,
                params: route.params?.fromParams,
                resetFocus: route.params?.resetFocus,
              }}
            />
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
            }}
          >
            <Tag tags={QuestDetail?.tag} />
          </View>

          <View style={styles.DescripCon}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: "Kanit400" }}>จะได้รับ</Text>
              <View style={{ marginLeft: 7 }}>
                {QuestDetail?.activityHour.category && (
                  <Text style={{ fontFamily: "Kanit400" }}>
                    {"\u25B8"}{" "}
                    {activityCategories[QuestDetail.activityHour?.category]}{" "}
                    {QuestDetail.activityHour?.hour} ชั่วโมง
                  </Text>
                )}
                <Text style={{ fontFamily: "Kanit400" }}>
                  {"\u25B8"} {QuestDetail?.xpGiven} EXP
                </Text>
              </View>
            </View>
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
            (QuestDetail.isCheckIn ? (
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
                color={QuestDetail.status ? "grey" : "white"}
                onPress={
                  QuestDetail.status
                    ? () => alert("ไม่ทันแร้ว")
                    : () => leaveAlert(questId)
                }
              />
            ) : (
              <BigButton
                text="เข้าร่วมกิจกรรม"
                bg={QuestDetail.status ? buttonGrey : primaryColor}
                color={QuestDetail.status ? "grey" : "white"}
                onPress={
                  QuestDetail.status
                    ? () => alert("เข้าร่วมไม่ได้แร้ว")
                    : () => joinAlert(questId)
                }
              />
            )}
          </View>
        </View>
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
    // width: "100%",
    height: 220,
    marginVertical: 4,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  pic: {
    width: "100%",
    height: "100%",
  },
  DescripCon: {
    paddingHorizontal: 15,
    backgroundColor: BGcolor,
    width: "100%",
    marginTop: 2,
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
