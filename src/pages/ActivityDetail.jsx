import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, Alert, RefreshControl} from "react-native";
import { useRoute } from '@react-navigation/native';
import yo from "../../assets/images/KU2.jpg";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {getQuestData} from "../data/Quest";
import Tag from "../components/Quest/Tag";
import ActivityName from "../components/Quest/ActivityName";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import BigButton from "../components/button/BigButton";
import {join_leave} from "../data/join-leave";
import { useAppContext } from "../data/AppContext";

import {textColor, BGcolor, primaryColor} from "../data/color"

const joinAlert = (questId) =>
  Alert.alert(
    'ยืนยันการเข้าร่วมกิจกรรม',
    'ต้องการเข้าร่วม กด OK!',
    [
      {
        text: 'OK!',
        onPress: () => {
     
          const isjoin = join_leave(questId);
          // console.log(questId);
          if(isjoin){
            Alert.alert('เข้าร่วมสำเร็จ!'); 
          }else{
            Alert.alert('เข้าร่วมไม่สำเร็จ'); 
          }
        },
      },
      {
        text: 'cancel',
        onPress: () => Alert.alert('ยกเลิกการเข้าร่วม.'),
        
      },
    ],
  );

const leaveAlert = (questId) =>
  Alert.alert(
    'ยืนยันยกเลิกการเข้าร่วม',
    'ต้องการยกเลิกการเข้าร่วมกิจกรรม กด YES',
    [
      {
        text: 'YES',
        onPress: () => {
          const isjoin = join_leave(questId);
          // console.log(questId);
          if(isjoin){
            Alert.alert('ยกเลิกสำเร็จ!'); 
          }else{
            Alert.alert('ยกเลิกไม่สำเร็จ'); 
          }
        },
      },
      {
        text: 'cancel',
        onPress: () => Alert.alert('คุณยังเข้าร่วมกิจกรรมอยู่.'),
        
      },
    ],
  );
  
  

export default function ActivityDetail() {
  const [QuestDetail, setQuestDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { userDetail } = useAppContext();
  const route = useRoute();
  const { questId } = route.params;
  
  useEffect(() => {
    const fetchData = async (questId) => {
      try {
        const response = await getQuestData(questId);
        setQuestDetail(response); // Set the fetched data to the state
        setLoading(false)
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };

    fetchData(questId); // Call fetchData to fetch data when the component mounts
  }, []); // Empty dependency array ensures the effect runs once

  if (isLoading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }
  
  return (

    <Bottomsheet style={styles.container} snapPoints={["20%", "60%", "90%"]} index={1}>
      <BottomSheetScrollView
          // stickyHeaderIndices={[0]}
      >
        <View style={styles.ScrollView}>
          <ActivityName quest={QuestDetail}/>
          <View style={styles.picCon}>
            <Image
              style={styles.pic}
              source={yo}
            />
          </View>
          
          <Tag tags={QuestDetail?.tag}/> 
          <View style={styles.DescripCon}>
            <Text style={{ color: textcolor, fontSize: 16, }}>{QuestDetail.description}</Text>
          </View>
          <View style = {styles.ButtonCon}>
            {!QuestDetail.isJoin ? (
              <BigButton
                text="เข้าร่วมกิจกรรม"
                bg="#E86A33"
                onPress={() => joinAlert(questId)}
              />
            ) : (
              <BigButton
                text="ยกเลิกการเข้าร่วม"
                bg="#8C1C15"
                onPress={() => leaveAlert(questId)}
              />
            )}
          </View>
        </View>
      </BottomSheetScrollView>
    </Bottomsheet>
  );
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
  AcButton: {
  },
  ButtonCon: {
    width: "87%",
  },
  ScrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
