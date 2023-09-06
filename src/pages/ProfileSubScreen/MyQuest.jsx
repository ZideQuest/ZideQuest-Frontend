import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import back_icon from "../../../assets/images/leave_icon.png";
import QuestListItem from "../../components/QuestListItem";
import { userQuest } from "../../data/userQuest.js";
import { useAppContext } from "../../data/AppContext";

export default function MyQuests({ navigation }) {
  const [UserQuest, setUserQuest] = useState({});
  const { userDetail } = useAppContext();

  useEffect(() => {
    const fetchUserQuestData = async () => {
      try {
        const data = await userQuest();
        setUserQuest(data);
      } catch (error) {
        console.error("Error fetching UserQuest", error);
      }
    };
    fetchUserQuestData();
  }, []);

  // const currentExample = [
  //   {
  //     "_id": "64eb53b1eb2e7496d7acacd7",
  //     "questName": "play a game",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb4ddbeb2e7496d7acacb1",
  //     "timeStart": "2023-07-24T00:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "อร่อยจัง",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [],
  //     "countParticipant": 0,
  //     "maxParticipant": 30,
  //     "autoComplete": true,
  //     "participant": [],
  //     "createdAt": "2023-08-27T13:46:25.734Z",
  //     "updatedAt": "2023-09-02T13:08:36.564Z",
  //     "__v": 0
  //   },
  //   {
  //     "activityHour": {
  //       "category": "3",
  //       "hour": 3
  //     },
  //     "_id": "64eb5462eb2e7496d7acacdd",
  //     "questName": "กินข้าวว",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb4ddbeb2e7496d7acacb1",
  //     "timeStart": "2023-07-24T00:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "อร่อยจัง",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [],
  //     "countParticipant": 1,
  //     "maxParticipant": 30,
  //     "autoComplete": true,
  //     "participant": [
  //       {
  //         "userId": "64eb4eceeb2e7496d7acacc8",
  //         "status": false,
  //         "_id": "64f0c0941265cf8e974f1aca"
  //       }
  //     ],
  //     "createdAt": "2023-08-27T13:49:22.948Z",
  //     "updatedAt": "2023-08-31T16:32:20.398Z",
  //     "__v": 0
  //   },
  //   {
  //     "activityHour": {
  //       "category": "3",
  //       "hour": 3
  //     },
  //     "_id": "64eb60bcc3d40195c0b5690e",
  //     "questName": "quest6",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb569ceb2e7496d7acace4",
  //     "timeStart": "2023-07-24T03:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "สนุกๆขำ",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [],
  //     "countParticipant": 1,
  //     "maxParticipant": 50,
  //     "autoComplete": false,
  //     "participant": [],
  //     "createdAt": "2023-08-27T14:42:04.300Z",
  //     "updatedAt": "2023-08-31T09:44:50.320Z",
  //     "__v": 0
  //   },
  //   {
  //     "activityHour": {
  //       "category": "3",
  //       "hour": 3
  //     },
  //     "_id": "64eb68dbd59ce3b53fa99bf6",
  //     "questName": "กระโดต่อย",
  //     "creatorId": "64f30018e9a1185aa8d0dfd4",
  //     "locationId": "64eb68c8d59ce3b53fa99bf2",
  //     "timeStart": "2023-07-24T00:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "อร่อยจัง",
  //     "status": false,
  //     "picturePath": "https://res.cloudinary.com/dumzvayjy/image/upload/v1693149403/xem7pzoohxnlkvrgfywc.jpg",
  //     "tagId": [
  //       "64eb655bef69bb10f6f24397",
  //       "64eb6555ef69bb10f6f24395"
  //     ],
  //     "countParticipant": 0,
  //     "maxParticipant": 30,
  //     "autoComplete": true,
  //     "participant": [
  //       {
  //         "userId": "64eb4eceeb2e7496d7acacc8",
  //         "status": false,
  //         "_id": "64f2f9b15be1f094c52a07dc"
  //       },
  //       {
  //         "userId": "64ecd0d0719a910e237991c8",
  //         "status": false,
  //         "_id": "64f31a418552242bba399b17"
  //       }
  //     ],
  //     "createdAt": "2023-08-27T15:16:43.790Z",
  //     "updatedAt": "2023-09-02T11:19:29.200Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "64ec0be4d59ce3b53fa99cf3",
  //     "questName": "Yayster",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb68c8d59ce3b53fa99bf2",
  //     "timeStart": "2023-07-24T03:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "เย้",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [],
  //     "countParticipant": 0,
  //     "maxParticipant": 10,
  //     "autoComplete": false,
  //     "participant": [],
  //     "createdAt": "2023-08-28T02:52:20.447Z",
  //     "updatedAt": "2023-08-28T02:52:20.447Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "64ec0c75d59ce3b53fa99d07",
  //     "questName": "Yayster2",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb569ceb2e7496d7acace4",
  //     "timeStart": "2023-07-24T03:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "เย้",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [],
  //     "countParticipant": 1,
  //     "maxParticipant": 10,
  //     "autoComplete": false,
  //     "participant": [
  //       {
  //         "userId": "64f4805c1e2ff934ab5abe6b",
  //         "status": false,
  //         "_id": "64f482b93753131f23e099be"
  //       }
  //     ],
  //     "createdAt": "2023-08-28T02:54:45.149Z",
  //     "updatedAt": "2023-09-03T12:57:29.216Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "64ec0d56d59ce3b53fa99d20",
  //     "questName": "Yayster with picture",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb569ceb2e7496d7acace4",
  //     "timeStart": "2023-07-24T03:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "เย้",
  //     "status": false,
  //     "picturePath": "https://res.cloudinary.com/dumzvayjy/image/upload/v1693191509/k8wwc8lkijdnqnwcp7mq.jpg",
  //     "tagId": [],
  //     "countParticipant": 0,
  //     "maxParticipant": 10,
  //     "autoComplete": false,
  //     "participant": [],
  //     "createdAt": "2023-08-28T02:58:30.215Z",
  //     "updatedAt": "2023-08-28T02:58:30.215Z",
  //     "__v": 0
  //   },
  //   {
  //     "activityHour": {
  //       "category": "3"
  //     },
  //     "_id": "64ec2749d59ce3b53fa9a066",
  //     "questName": "test change",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64ec25e4d59ce3b53fa9a048",
  //     "timeStart": "2023-07-24T03:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "เย้",
  //     "status": false,
  //     "picturePath": "https://res.cloudinary.com/dumzvayjy/image/upload/v1693198151/knzvvgcrhspmoo9tg16m.jpg",
  //     "tagId": [
  //       "64ec3c7ad59ce3b53fa9a0d7",
  //       "64ec3fddd59ce3b53fa9a137",
  //       "64ec3d12d59ce3b53fa9a0e9"
  //     ],
  //     "countParticipant": 0,
  //     "maxParticipant": 10,
  //     "autoComplete": false,
  //     "participant": [],
  //     "createdAt": "2023-08-28T04:49:13.701Z",
  //     "updatedAt": "2023-09-03T14:20:41.060Z",
  //     "__v": 0
  //   },
  //   {
  //     "activityHour": {
  //       "category": "3",
  //       "hour": 3
  //     },
  //     "_id": "64ec2766d59ce3b53fa9a069",
  //     "questName": "Yayster with picture 2",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64ec25e4d59ce3b53fa9a048",
  //     "timeStart": "2023-07-24T03:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "เย้",
  //     "status": false,
  //     "picturePath": "https://res.cloudinary.com/dumzvayjy/image/upload/v1693198181/iwwemi6tqbixjlchj1kt.jpg",
  //     "tagId": [],
  //     "countParticipant": 0,
  //     "maxParticipant": 10,
  //     "autoComplete": false,
  //     "participant": [],
  //     "createdAt": "2023-08-28T04:49:42.771Z",
  //     "updatedAt": "2023-09-03T12:57:18.772Z",
  //     "__v": 0
  //   },
  //   {
  //     "activityHour": {
  //       "category": "3",
  //       "hour": 3
  //     },
  //     "_id": "64f0c88a1265cf8e974f1b4d",
  //     "questName": "กระโดต่อย",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb569ceb2e7496d7acace4",
  //     "timeStart": "2023-07-24T00:19:54.519Z",
  //     "timeEnd": "2023-07-24T03:22:54.519Z",
  //     "description": "อร่อยจัง",
  //     "status": false,
  //     "picturePath": "https://res.cloudinary.com/dumzvayjy/image/upload/v1693501577/u8t9bulprgevvijuvigu.jpg",
  //     "tagId": [
  //       "64eb655bef69bb10f6f24397",
  //       "64eb6555ef69bb10f6f24395"
  //     ],
  //     "countParticipant": 0,
  //     "maxParticipant": 30,
  //     "autoComplete": true,
  //     "participant": [],
  //     "createdAt": "2023-08-31T17:06:18.335Z",
  //     "updatedAt": "2023-08-31T17:06:18.335Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "64f18bc61265cf8e974f1bd6",
  //     "questName": "Running",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64ec25e4d59ce3b53fa9a048",
  //     "timeStart": "2023-09-01T00:00:00.000Z",
  //     "timeEnd": "2023-09-01T00:00:00.000Z",
  //     "description": "Nothing",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [
  //       "64ec3d09d59ce3b53fa9a0e5"
  //     ],
  //     "countParticipant": 0,
  //     "maxParticipant": 30,
  //     "autoComplete": true,
  //     "participant": [],
  //     "createdAt": "2023-09-01T06:59:18.555Z",
  //     "updatedAt": "2023-09-01T06:59:18.555Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "64f18def1265cf8e974f1be2",
  //     "questName": "Hello",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb569ceb2e7496d7acace4",
  //     "timeStart": "2023-09-01T00:00:00.000Z",
  //     "timeEnd": "2023-09-01T00:00:00.000Z",
  //     "description": "Nothing",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [
  //       "64ec3d09d59ce3b53fa9a0e5"
  //     ],
  //     "countParticipant": 0,
  //     "maxParticipant": 30,
  //     "autoComplete": true,
  //     "participant": [],
  //     "createdAt": "2023-09-01T07:08:31.930Z",
  //     "updatedAt": "2023-09-01T07:08:31.930Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "64f18df21265cf8e974f1be5",
  //     "questName": "Hello",
  //     "creatorId": "64eb4eceeb2e7496d7acacc8",
  //     "locationId": "64eb569ceb2e7496d7acace4",
  //     "timeStart": "2023-09-01T00:00:00.000Z",
  //     "timeEnd": "2023-09-01T00:00:00.000Z",
  //     "description": "Nothing",
  //     "status": false,
  //     "picturePath": "",
  //     "tagId": [
  //       "64ec3d09d59ce3b53fa9a0e5"
  //     ],
  //     "countParticipant": 0,
  //     "maxParticipant": 30,
  //     "autoComplete": true,
  //     "participant": [],
  //     "createdAt": "2023-09-01T07:08:34.523Z",
  //     "updatedAt": "2023-09-01T07:08:34.523Z",
  //     "__v": 0
  //   }
  // ]

  return (
    <View style={styles.allContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={back_icon} style={{ width: "100%", height: "100%" }} />
        </Pressable>
        <Text style={styles.header}>เควสของฉัน</Text>
      </View>

      <View style={styles.questList}>
        <Text style={styles.questHeader}>เควสที่กำลังเข้าร่วม</Text>
        {UserQuest.currentQuest?.length > 4 && (
          <View style={styles.questListContainer}>
            {UserQuest.currentQuest?.map((quest) => (
              <QuestListItem
                quest={quest.quest}
                key={quest._id}
                isAdmin={userDetail?.isAdmin}
              />
            ))}
            <View style={styles.seeAllContainer}>
              <Pressable style={styles.seeAllButton} onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.seeAllText}>see all</Text>         
              </Pressable>
            </View>
          </View>
        )}
      </View>

      <View style={styles.questList}>
        <Text style={styles.questHeader}>เควสที่เข้าร่วมสำเร็จ</Text>
        <View style={styles.questListContainer}>
          {/* {UserQuest.successQuest?.map((quest) => (
            <QuestListItem quest={quest} key={quest._id} isAdmin={userDetail?.isAdmin} />
          ))} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    padding: 15,
    gap: 20,
    backgroundColor: "white",
    flex: 1,
  },
  questList: {
    gap: 7,
  },
  questHeader: {
    borderBottomWidth: 2,
    borderColor: "#E1E1E1",
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "yellow",
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    backgroundColor: "blue",
    borderBottomWidth: 2,
  },
  backButton: {
    position: "absolute",
    marginLeft: 15,
    top: 13,
    width: 17,
    height: 17,
    zIndex: 20,
  },
  questListContainer: {
    gap: 9,
  },
  seeAllButton:{
    borderRadius: 10,
    backgroundColor: "#D4D4D4",
    width:55,
    height:22,
  },
  seeAllContainer:{
    alignItems: "center",
  },
  seeAllText:{
    textAlign:"center"
  },
});
