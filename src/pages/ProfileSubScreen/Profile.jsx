import { View, Text, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import ProfilePic from "../../../assets/images/Jitat.jpg";
import goBackPic from "../../../assets/images/back-button.png";
import ProgressBar from 'react-native-progress/Bar';

export default function Profile({ navigation }) {
  return (
    <ScrollView style={styles.profile}>
      <Pressable
        onPress={() => TabNavigation.navigate("Recommend")}
        style={styles.exit}
      >
        <Image style={{width: 30, height: 30, borderRadius:5}} source={goBackPic} />
      </Pressable>

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

      <View style={{justifyContent:"flex-start",alignItems:"flex-start"}}>
        <Text style={{fontSize:20, fontWeight:"bold",marginLeft:30,marginTop: 20,marginBottom:5}}>
          Badges
        </Text>
        <View style={styles.badges_container}>
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
        </View>
      </View>

      <View style={{width:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
        <ScrollView styles={styles.progress_container}>
          <View style={{justifyContent:"flex-start"}}>
            <Text style={{fontSize:20, fontWeight:"bold",marginTop: 20}}>
              My Quests
            </Text>
            <Text style={{fontSize:15, marginTop: 2, marginBottom:20}}>
              I am a student at Kasetsart University. I am currently studying Computer Engineering.
            </Text>
          </View>
          <View style={{gap:10}}>
          <ProgressBar progress={0.6} width={200} height={20} />
          <ProgressBar progress={0.1} width={200} height={20} />
          <ProgressBar progress={0.5} width={200} height={20} />
          </View>
          <Text></Text>
          <Text>Ayo 2</Text>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  progress_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    boarderRadius: 5,
    backgroundColor: "lightgrey",
  },
  badges_container: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space evenly between images
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
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 100,
    textAlign: "center",
    alignItems: "center",
  },
});