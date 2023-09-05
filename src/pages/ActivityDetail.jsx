import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  RefreshControl,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import yo from "../../assets/images/KU2.jpg";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { getQuestData } from "../data/Quest";
import Tag from "../components/Quest/Tag";
import ActivityName from "../components/Quest/ActivityName";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import BigButton from "../components/button/BigButton";
import { join_leave } from "../data/join-leave";

import { textColor, BGcolor, primaryColor } from "../data/color";

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
          const detail = await join_leave(questId);
          console.log(detail);
          if (detail != null) {
            setQuestDetail(detail);
            setIsJoined(true);
            Alert.alert("เข้าร่วมสำเร็จ!");
          } else {
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
          text: "YES",
          onPress: async () => {
            setLoading(true);
            const detail = await join_leave(questId);
            console.log(detail);
            if (detail != null) {
              setQuestDetail(detail);
              setIsJoined(false);
              Alert.alert("ยกเลิกสำเร็จ!");
            } else {
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

  if (isLoading) {
    return (
      <Bottomsheet
        style={styles.container}
        snapPoints={["20%", "60%", "90%"]}
        index={1}
      ></Bottomsheet>
    );
  } else {
    return (
      <Bottomsheet
        style={styles.container}
        snapPoints={["20%", "60%", "90%"]}
        index={1}
        // hideBar={true}
      >
        <BottomSheetScrollView
        // stickyHeaderIndices={[0]}
        >
          <View style={styles.ScrollView}>
            <ActivityName quest={QuestDetail} />
            <View style={styles.picCon}>
              <Image style={styles.pic} src={QuestDetail.picturePath} />
            </View>

            <Tag tags={QuestDetail?.tag} />
            <View style={styles.DescripCon}>
              <Text style={{ color: textColor, fontSize: 16 }}>
                {QuestDetail.description}
              </Text>
            </View>
            <View style={styles.ButtonCon}>
              {isJoined ? (
                <BigButton
                  text="ยกเลิกการเข้าร่วม"
                  bg="#8C1C15"
                  onPress={() => leaveAlert(questId)}
                />
              ) : (
                <BigButton
                  text="เข้าร่วมกิจกรรม"
                  bg="#E86A33"
                  onPress={() => joinAlert(questId)}
                />
              )}
            </View>
          </View>
        </BottomSheetScrollView>
      </Bottomsheet>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFEFE",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    flex: 1,
    overflow: "scroll",
  },

  picCon: {
    width: "100%",
    height: 200,
  },
  pic: {
    width: "100%",
    height: "100%",
    // resizeMode: "contain",
  },
  DataCon: {
    backgroundColor: BGcolor,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    justifyContent: "center",
  },
  DescripCon: {
    padding: 15,
    backgroundColor: BGcolor,
    width: "100%",
  },
  AcButton: {},
  ButtonCon: {
    width: "87%",
  },
  ScrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
