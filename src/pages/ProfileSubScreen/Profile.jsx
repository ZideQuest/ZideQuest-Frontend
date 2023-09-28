import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import ProfilePic from "../../../assets/images/Jitat.jpg";
import goBackPic from "../../../assets/images/back-button.png";
import * as Progress from "react-native-progress";
import {
  buttonGrey,
  progressBarGreen,
  buttonLightGrey,
} from "../../data/color";
import { Divider } from "@rneui/themed";

export default function Profile({ navigation }) {
  return (
    <View style={styles.profileCard}>
      {/* Exit Button */}
      <Pressable
        onPress={() => TabNavigation.navigate("Recommend")}
        style={styles.exit}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 5 }}
          source={goBackPic}
        />
      </Pressable>

      {/* Profile and Username */}
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 220,
            height: 220,
            borderRadius: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          source={ProfilePic}
        />

        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>
          จิตร์ทัศน์ ฝักเจริญผล
        </Text>
      </View>

      {/* Badges */}
      <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 8,
            marginLeft: 10,
          }}
        >
          Badges
        </Text>
        <View style={styles.badges_container}>
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
          <Image style={styles.badge} source={ProfilePic} />
        </View>
      </View>

      {/* Progress Bar */}

      {/* Header and Quest Button */}
      <View
        style={{
          gap: 5,
          backgroundColor: buttonLightGrey,
          borderRadius: 10,
          padding: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginRight: 116 }}>
            PROGRESS
          </Text>

          {/* Quest Button */}
          <Pressable
            onPress={() => navigation.navigate("Quests")}
            style={styles.exit}
          >
            <Text style={styles.quest_button}>Quests</Text>
          </Pressable>
        </View>
        {/* Main Progress */}
        <Text>1. กิจกรรมหาลัย</Text>
        <Progress.Bar
          progress={0.5}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>2. กิจกรรมเพื่อเสริมสร้างสมรรถนะ</Text>
        <Text>ด้านพัฒนาคุณธรรม จริยธรรม</Text>
        <Progress.Bar
          progress={0.3}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>ด้านพัฒนาทักษะการคิดและการเรียนรู้</Text>
        <Progress.Bar
          progress={0.2}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>
          ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคลและการสื่อสาร
        </Text>
        <Progress.Bar
          progress={0.2}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>ด้านพัฒนาสุขภาพ</Text>
        <Progress.Bar
          progress={0.3}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>3.กิจกรรมเพื่อสังคม</Text>
        <Progress.Bar
          progress={0.3}
          width={300}
          height={10}
          color={progressBarGreen}
        />

        <Divider></Divider>

        {/* Extra Progress */}
        <Text>4. เข้าาร่วมกิจกรรมในฐานะกรรมการองค์กรกิจกรรมนิสิต</Text>
        <Text>ประธานองค์กรกิจกรรมนิสิต</Text>
        <Progress.Bar
          progress={0.5}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>กิจกรรมการบริหารองค์กรกิจกรรมนิสิต</Text>
        <Progress.Bar
          progress={0.5}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>5.ได้รับเลือกให้เป็นนิสิตดีเด่น</Text>
        <Text>ด้านความประพฤติ</Text>
        <Progress.Bar
          progress={0.5}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>ด้านความคิดสร้างสรรค์และนวัตกรรม</Text>
        <Progress.Bar
          progress={0.5}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>ด้านกิจกรรมนอกหลักสูตร</Text>
        <Progress.Bar
          progress={0.5}
          width={300}
          height={10}
          color={progressBarGreen}
        />
        <Text>ด้านกีฬา</Text>
        <Progress.Bar
          progress={0.5}
          width={300}
          height={10}
          color={progressBarGreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  exit: {
    padding: 5,
  },
  progress_container: {
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: buttonGrey,
  },
  badges_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft: 30,
  },
  badge: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 5,
  },
  quest_button: {
    backgroundColor: "#e8e7e6",
    borderRadius: 20,
    padding: 5,
    width: 100,
    textAlign: "center",
  },
});
