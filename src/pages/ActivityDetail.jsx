import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import yo from "../../assets/images/KU2.jpg";
import { tag } from "../data/dev-data";

import {getQuestData} from "../data/Quest";
import {timeConv} from "../data/time/time";
import ActivityName from "../components/ActivityName"
import Bottomsheet from "../components/Bottomsheet/Bottomsheet"

BGcolor = '#FDFEFE';
textcolor = 'black';

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

    <Bottomsheet style={styles.container} snapPoints={["60%"]}>
      <View style={styles.picCon}>
        <Image
          style={styles.pic}
          source={yo}
        />
      </View>
      <ActivityName quest={QuestDetail}/>
      <View style={styles.DataCon}>
          
        <View style={styles.timePlaceCon}>
          
          <Text style={{ color: "textcolor", fontSize: 16}}>
            {timeConv(QuestDetail.timeStart)}{'\n'}{timeConv(QuestDetail.timeEnd)}{'\n'}สถานที่
          </Text>
          
        </View>
        <View style={styles.creatorCon}>
          <Text style={{ color: "textcolor", fontSize: 20, fontWeight: 'bold', }}>ชื่อหน่วยงาน</Text>
        </View>
        <View style={styles.creatorPicCon}>
          <Text style={{ color: "textcolor", fontSize: 20, fontWeight: 'bold', }}>รูปหน่วยงาน</Text>
        </View>
        <View style={styles.tagCon}>
          {Array.from({ length: tag.length }).map((_, index) => (
            <View style={styles.singleTag}>
              <Text key={index} style={styles.tagText}>
                {tag[index]}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.DescripCon}>
          <Text style={{ color: "textcolor", fontSize: 16, }}>{QuestDetail.description}</Text>
        </View>
      </View>
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
  tagText: {
    color: "BGcolor",
    padding: 5,
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
  tagCon: {
    backgroundColor: "BGcolor",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
  },
  singleTag: {
    backgroundColor: "#FDEBD0",
    alignSelf: "flex-start",
    borderRadius: 40,
  },
  timePlaceCon: {
    flexDirection: "row",
    backgroundColor: 'BGcolor',
    width: "45%",
    justifyContent: "center",
  },
  creatorCon: {
    backgroundColor: "BGcolor",
    width: "29%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  creatorPicCon: {
    backgroundColor: "BGcolor",
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
    aspectRatio: 1 / 1,
  },
  DescripCon: {
    backgroundColor: "BGcolor",
    width: "100%",
  },
  AcButton: {
  },
});
