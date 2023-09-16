import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import icon from "../../../assets/images/KU.jpg";
import ProgressBar from 'react-native-progress/Bar';

import { useAppContext } from "../../data/AppContext";

export default function Profile({ navigation }) {
  const { logout } = useAppContext();

  const logoutHandler = () => {
    alert("Logging out...");
    logout();
    TabNavigation.navigate("Recommend")
  };

  return (
    <ScrollView style={styles.profile}>
      <Pressable onPress={() => TabNavigation.navigate("Recommend")} style={styles.exit}>
        <Text>X</Text>
      </Pressable>

      <Pressable onPress={logoutHandler} style={styles.exit}>
        <Text>Logout</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Quests")}
        style={styles.exit}
      >
        <Text>Quests</Text>
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
        source={icon}
      />
      <Text style={{fontSize:30, fontWeight:"bold",marginTop: 20}}>Jittat Soodlhor</Text>
      <View style={{gap:10}}>
       <ProgressBar progress={0.6} width={200} height={20} />
       <ProgressBar progress={0.1} width={200} height={20} />
       <ProgressBar progress={0.5} width={200} height={20} />
      </View>
      <Text></Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      <Text>Ayo 1</Text>
      </View>
  </ScrollView>
  );
}


const styles = StyleSheet.create({});
