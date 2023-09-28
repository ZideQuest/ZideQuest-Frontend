import { View, Text, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import ProfilePic from "../../../assets/images/Jitat.jpg";
import goBackPic from "../../../assets/images/back-button.png";
import * as Progress from 'react-native-progress';
import { buttonGrey, progressBarGreen } from "../../data/color";
import { Divider, useTheme } from '@rneui/themed';

export default function Profile({ navigation }) {
  return (
    <View style={styles.profileCard}>


      {/* Exit Button */}
      <Pressable
        onPress={() => TabNavigation.navigate("Recommend")}
        style={styles.exit}
      >
        <Image style={{width: 30, height: 30, borderRadius:5}} source={goBackPic} />
      </Pressable>


      {/* Profile and Username */}
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
      <View style={{justifyContent:"flex-start",alignItems:"flex-start"}}>
        <Text style={{fontSize:20, fontWeight:"bold",marginBottom:5,marginLeft:30}}>
          Badges
        </Text>
        <View style={styles.badges_container}>
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
        </View>
      </View>

      <Divider></Divider>

      {/* Progress Bar */}
      <View style={{width:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
        <View styles={styles.progress_container}>

            <Text style={{fontSize:20, fontWeight:"bold",marginTop:20,marginBottom: 20}}>
              My Quests
            </Text>
         
          <View style={{gap:10}}>

          {/* Main Progress */}
          <Text>1. กิจกรรมมหาลัย</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>
          <Text>2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Text>
          <Text>2.1 ด้านพัฒนาคุณธรรม จริยธรรม</Text>
          <Progress.Bar progress={0.3} width={330} height={10} color={progressBarGreen}/>
          <Text>2.2 ด้านพัฒนาทักษะการคิดและการเรียนรู้</Text>
          <Progress.Bar progress={0.2} width={330} height={10} color={progressBarGreen}/>
          <Text>2.3 ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>
          <Text>2.4 ด้านพัฒนาสุขภาพ</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>
          <Text>3. กิจกรรมเพื่อสังคม</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>

          {/* Extra Progress */}
          <Text>4. เข้าาร่วมกิจกรรมในฐานะกรรมการองค์กรกิจกรรมนิสิต</Text>
          <Text>4.1 กิจกรรมเพื่อสังคม</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>
          <Text>5.ได้รับเลือกให้เป็นนิสิตดีเด่น</Text>
          <Text>5.1 ด้านความประพฤติ</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>
          <Text>5.2 ด้านความคิดสร้างสรรค์และนวัตกรรม</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>
          <Text>5.3 ด้านกิจกรรมนอกหลักสูตร</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>
          <Text>5.4 ด้านกีฬา</Text>
          <Progress.Bar progress={0.5} width={330} height={10} color={progressBarGreen}/>


          


          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard:{
    margin:10,
    padding:5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  exit:{
    padding:5,
  },
  progress_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    boarderRadius: 5,
    backgroundColor: buttonGrey,
  },
  badges_container: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space evenly between images
    marginBottom:10,
    marginLeft:30,
  },
  badge: {
    width: 50, // Set your desired width
    height: 50, // Set your desired height
    resizeMode: 'cover', // You can adjust the resizeMode as needed
    borderRadius: 50, // Set your desired border radius
    marginRight: 10,
  },
  quest_button: {
    backgroundColor: buttonGrey,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 100,
    textAlign: "center",
    alignItems: "center",
  },
});