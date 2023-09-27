import { View, Text, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import ProfilePic from "../../../assets/images/Jitat.jpg";
import goBackPic from "../../../assets/images/back-button.png";
import ProgressBar from 'react-native-progress/Bar';
import { BGcolor } from "../../data/color";

export default function Profile({ navigation }) {
  return (
    <View>
      {/* Exit Button */} 
      <Pressable
        onPress={() => TabNavigation.navigate("Recommend")}
        style={styles.exit}
      >
        <Image style={{width: 30, height: 30, borderRadius:5}} source={goBackPic} />
      </Pressable>
      
      {/* Profile Picture + Name */} 
      <View style={{width:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
        <Image style={{
            width: 200, 
            height: 200,
            borderRadius: 200,
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"
          }}
          source={ProfilePic}
        />
        <Text style={{fontSize:30, fontWeight:"bold",marginTop: 20}}>จิตร์ทัศน์ ฝักเจริญผล</Text>
        <Pressable
          onPress={() => navigation.navigate("Quests")}
          style={styles.exit}
        >
          <Text style={styles.quest_button}>Quests</Text>
        </Pressable>
      </View>


      {/* Badges */}
      <View style={{justifyContent:"flex-start",alignItems:"flex-start",backgroundColor:BGcolor,padding:10}}>
        <Text style={{fontSize:20, fontWeight:"bold",marginLeft:30,marginTop: 10,marginBottom:5}}>
          Badges
        </Text>
        <View style={styles.badges_container}>
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
        </View>
      </View>

      {/* Progress Bar */}
      <View style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
        <ScrollView styles={styles.progress_container}>
  
          <View style={{justifyContent:"flex-start"}}>
            <Text style={{fontSize:20, fontWeight:"bold",marginTop: 20}}>
              My Quests
            </Text>
            <Text style={{fontSize:15, marginTop: 2, marginBottom:20}}>
              I am a student at Kasetsart University. I am currently studying Computer Engineering.
            </Text>
          </View>
          <View style={{paddingLeft:10,backgroundColor:BGcolor}}>
            <Text style={styles.progress_header}>
              1. กิจกรรมมหาลัย
            </Text>
            <ProgressBar progress={0.6} width={200} height={20} />
            <Text style={styles.progress_header}>
              2.1 ด้านพัฒนาคุณธรรม จริยธรรม
            </Text>
            <ProgressBar progress={0.1} width={200} height={20} />
            <Text style={styles.progress_header}>
              2.2 ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร (1/2)
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              2.3 ด้านพัฒนาสุขภาพ
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              3. กิจกรรมเพื่อสังคม
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              4.1 ประธานองค์กรกิจกรรมนิสิต
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              4.2 กรรมการบริหารองค์กรกิจกรรมนิสิต
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              5.1 นิสิตดีเด่นด้านความประพฤฤติ
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              5.2 นิสิตดีเด่นด้านความคิดสร้างสรรค์และนวัตกรรม
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              5.3 นิสิตดีเด่นด้านกิจกรรมนอกหลักสูตร
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
            <Text style={styles.progress_header}>
              5.4 นิสิตดีเด่นด้านกีฬา
            </Text>
            <ProgressBar progress={0.5} width={200} height={20} />
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exit: {
    margin: 10,
  },
  progress_header: {
    fontSize:15, marginTop: 2, justifyContent:"flex-start"
  },
  progress_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    boarderRadius: 5,
    backgroundColor: BGcolor,
  },
  badges_container: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginLeft:30,

  },
  badge: {
    width: 50,
    height: 50,
    resizeMode: 'cover', 
    borderRadius: 50, 
    marginRight: 10,
  },
  quest_button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 100,
    textAlign: "center",
    alignItems: "center",
  },
});