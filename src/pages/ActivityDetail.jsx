import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import yo from "../../assets/images/KU2.jpg";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {getQuestData} from "../data/Quest";
import Tag from "../components/Quest/Tag";
import ActivityName from "../components/Quest/ActivityName";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import BigButton from "../components/button/BigButton";

BGcolor = '#FDFEFE';
textcolor = 'black';

const showAlert = () =>
  Alert.alert(
    'ยืนยันการเข้าร่วมกิจกรรม',
    'ต้องการเข้าร่วม กด OK!',
    [
      {
        text: 'OK!',
        onPress: () => Alert.alert('ส่งคำขอเข้าร่วม...'),
        
      },
      {
        text: 'cancle',
        onPress: () => Alert.alert('ยกเลิกการเข้าร่วม.'),
        
      },
    ],
  );

export default function ActivityDetail() {
  const [QuestDetail, setQuestDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);

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

    <Bottomsheet style={styles.container} snapPoints={["31%", "65%", "90%"]} index={1}>
      <BottomSheetScrollView
          // stickyHeaderIndices={[0]}
          style={{ backgroundColor: "white" }}
      >
        <View style={styles.picCon}>
          <Image
            style={styles.pic}
            source={yo}
          />
        </View>
        <ActivityName quest={QuestDetail}/>   
        <Tag tags={QuestDetail?.tag}/> 
        <View style={styles.DescripCon}>
          <Text style={{ color: "textcolor", fontSize: 16, }}>{QuestDetail.description}</Text>
        </View>
        <BigButton text="เข้าร่วมกิจกรรม" bg="#E86A33" onPress={() => showAlert()}/>
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
    backgroundColor: "BGcolor",
    width: "100%",
  },
  AcButton: {
  },
});
