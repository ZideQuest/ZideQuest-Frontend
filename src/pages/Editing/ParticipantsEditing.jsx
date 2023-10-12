import { useState, useEffect } from "react";
import { View,Image, Text, TextInput, StyleSheet, Button, Pressable } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import UserTag from "../../components/Participants/UserTag";
import Bottomsheet from "../../components/Bottomsheet/Bottomsheet";
import BackButton from "../../components/button/BackButton";

import goBackPic from "../../../assets/images/back-button.png";

import Checkbox from "expo-checkbox";
import Alert from "../../components/misc/Alert";
import * as TabNavigation from "../../data/TabNavigation"
import { fetchParticipants, checkUser, removeUser, unCheckUser } from "../../data/Quest";

export default function ParticipantsEditing({ route }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [all,setAll]=useState(false)

  const getParticipants = async () => {
    setLoading(true);
    setParticipants([])
    const data = await fetchParticipants(route.params?.questId);
    setParticipants(data);
    setLoading(false);
  };

  const handleCheckedAll = async (e) =>{
    if ( all&&await Alert(
        "ยืนยันยกเลิกการเลือกทั้งหมด"
)
    ) {
      try {
        setIsChecked(e)
        setAll(false)
    const userList = []
    participants.map((user) =>{
      const userId = user?.user?._id
      userList.push(userId)
    })

    if(e === true){
      const response = await checkUser(route.params?.questId, userList)
      console.log(response)
     
    }else{
      const response = await unCheckUser(route.params?.questId, userList)
      console.log(response)
     
    }
    await getParticipants()
      } catch (error) {
        alert("ยกเลิกการเลือกทั้งหมด");
      }
    }

    if ( !all&&await Alert(
        "ยืนยันการเลือกทั้งหมด"
)
    ) {
      try {
        setIsChecked(e)
        setAll(true)
    const userList = []
    participants.map((user) =>{
      const userId = user?.user?._id
      userList.push(userId)
    })

    if(e === true){
      const response = await checkUser(route.params?.questId, userList)
      console.log(response)
     
    }else{
      const response = await unCheckUser(route.params?.questId, userList)
      console.log(response)
     
    }
    await getParticipants()
      } catch (error) {
        alert("ยกเลิกการเลือกทั้งหมด");
      }
    }

    // setIsChecked(e)
    // const userList = []
    // participants.map((user) =>{
    //   const userId = user?.user?._id
    //   userList.push(userId)
    // })

    // if(e === true){
    //   const response = await checkUser(route.params?.questId, userList)
    //   console.log(response)
     
    // }else{
    //   const response = await unCheckUser(route.params?.questId, userList)
    //   console.log(response)
     
    // }
    // await getParticipants()
  }

  const handleChecked = async (checked, userId) =>{
    if(checked){
      const reponse = await checkUser(route.params?.questId, [userId])
      console.log(reponse)
    }else{
      const reponse = await unCheckUser(route.params?.questId, [userId])
      console.log(reponse)   
    }
    await getParticipants()
  }

  const handleDelete = async (userId) =>{
    await Alert(
      "Confirm Delete user",
      "Are you sure you want to remove this user?"
    )
    const reponse = await removeUser(route.params?.questId, [userId])
    console.log(reponse)
    await getParticipants()
  }

  const handleSearch = async (keyword) =>{
    const data = await fetchParticipants(route.params?.questId);
    let search = data
    if(keyword){
      search = await data?.filter((user) => user.user.firstName.toLowerCase().includes(keyword.toLowerCase()) || user.user.lastName.toLowerCase().includes(keyword.toLowerCase()))
    } 
    console.log(search)
    setParticipants(search)
  }


  useEffect(() => {
    getParticipants();
  }, []);

  return (
     <Bottomsheet snapPoints={["90%"]} detached={true} hideBar={true} index={0}>
      <View style={{marginTop:10,marginRight:5, alignItems:'flex-start'}}>
        {/* <BackButton /> */}
        {/* <Button title="Close" onPress={()=>{
          TabNavigation.navigate("QuestManage", { questId: route.params?.questId });
        }}> Close</Button> */}

        <Pressable
          onPress={()=>{
            TabNavigation.navigate("QuestManage", { questId: route.params?.questId });
          }}
          style={styles.exit}
        >
          <Image
            style={{ width: 30, height: 30, borderRadius: 5 }}
            source={goBackPic}
          />
        </Pressable>

      </View>
      <View style={{marginTop:10,marginRight:5, alignItems:'flex-end',}}>
        <View style={{flexDirection:'row'}}>
          <Text>เลือกทั้งหมด</Text> 
          <Checkbox value={isChecked} onValueChange={handleCheckedAll} style={{marginLeft:5, marginRight:5}} />
        </View>
      </View>
      <View style={{marginTop:10, marginBottom:10, paddingHorizontal:15, flexDirection:'row'}}>
        <TextInput 
          style={styles.input} 
          placeholder="ค้นหา"
          onChangeText={(value)=>handleSearch(value)}
        />
      </View>
      <View style={{marginLeft: 10}}>
      <Text>ผู้เข้าร่วม</Text>
      </View>
      <BottomSheetScrollView>
        <View style={styles.participantsContainer}>
          {participants && participants.length > 0 && participants?.map((user) => (
            <UserTag
              user={user}
              key={`participant-${user?.user?._id}`}
              onChecked={handleChecked}
              onDelete={handleDelete}
              deleteable
              checkable
            />
          ))}
          
        </View>
      </BottomSheetScrollView>
      {/* <Button title="Quest complete" onPress={() =>{} } /> */}
     </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  participantsContainer: {
    gap: 10,
    padding: 10,
  },
  exit: {
    padding: 5,
  },
  input:{
    width:'100%',
    height:40,
    borderWidth:1,
    padding:10
  }
});
