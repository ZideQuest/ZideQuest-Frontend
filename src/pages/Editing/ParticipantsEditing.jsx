import { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import Swipeout from "react-native-swipeout";

import UserTag from "../../components/Participants/UserTag";
import Bottomsheet from "../../components/Bottomsheet/Bottomsheet";

import goBackPic from "../../../assets/images/back-button.png";

import Checkbox from "expo-checkbox";
import Alert from "../../components/misc/Alert";
import * as TabNavigation from "../../data/TabNavigation";
import {
  fetchParticipants,
  checkUser,
  removeUser,
  unCheckUser,
} from "../../data/Quest";
import { primaryColor } from "../../data/color";

export default function ParticipantsEditing({ route }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(true);

  const getParticipants = async () => {
    setLoading(true);
    setParticipants([]);
    const data = await fetchParticipants(route.params?.questId);
    setParticipants(data);
    data.map((p) => {
      if (!p.status) {
        setIsAllChecked(false);
      }
    });
    setLoading(false);
  };

  const userTagItem = useCallback((data) => {
    const user = data.item;
    return (
      <Swipeout
        right={[
          {
            text: "Delete",
            backgroundColor: "red",
            underlayColor: "rgba(0, 0, 0, 1, 0.6)",
            onPress: () => {
              handleDelete(user.user._id);
            },
          },
        ]}
        key={`participant-${user?.user?._id}`}
        autoClose="true"
        backgroundColor="transparent"
      >
        <UserTag user={user} onChecked={handleChecked} checkable />
      </Swipeout>
    );
  });

  const handleCheckedAll = async (val) => {
    if (
      val &&
      (await Alert(
        "ยืนยันการเลือกทั้งหมด",
        "คุณแน่ใจหรือไม่ที่จะเช็คชื่อให้ทุกคน"
      ))
    ) {
      try {
        const userList = [];
        participants.map((user) => {
          const userId = user?.user?._id;
          userList.push(userId);
        });

        await checkUser(route.params?.questId, userList);
        setParticipants((prev) => prev.map((p) => ({ ...p, status: true })));
        setIsAllChecked(true);
      } catch (error) {
        await getParticipants();
        alert(`error occured ${error}`);
      }
    } else if (
      await Alert(
        "ยืนยันยกเลิกการเลือกทั้งหมด",
        "คุณแน่ใจหรือไม่ที่จะยกเลิกเช็คชื่อให้ทุกคน"
      )
    ) {
      try {
        const userList = [];
        participants.map((user) => {
          const userId = user?.user?._id;
          userList.push(userId);
        });

        await unCheckUser(route.params?.questId, userList);
        setParticipants((prev) => prev.map((p) => ({ ...p, status: false })));
        setIsAllChecked(false);
      } catch (error) {
        await getParticipants();
        alert(`error occured ${error}`);
      }
    }
  };

  const handleChecked = async (checked, userId) => {
    if (checked) {
      setParticipants((prev) =>
        prev.map((p) => {
          if (p.user._id == userId) {
            return { ...p, status: true };
          } else {
            return { ...p };
          }
        })
      );
      try {
        await checkUser(route.params?.questId, [userId]);
      } catch (error) {
        await getParticipants();
      }
    } else {
      setParticipants((prev) =>
        prev.map((p) => {
          if (p.user._id == userId) {
            return { ...p, status: false };
          } else {
            return { ...p };
          }
        })
      );
      try {
        await unCheckUser(route.params?.questId, [userId]);
      } catch (error) {
        await getParticipants();
      }
    }
  };

  useEffect(() => {
    let allChecked = true;
    participants.map((p) => {
      if (!p.status) {
        allChecked = false;
      }
    });
    setIsAllChecked(allChecked);
  }, [participants]);

  const handleDelete = async (userId) => {
    if (
      await Alert(
        "Confirm Delete user",
        "Are you sure you want to remove this user?"
      )
    ) {
      setParticipants((prev) => prev.filter((p) => p.user._id != userId));
      try {
        await removeUser(route.params?.questId, [userId]);
      } catch (error) {
        await getParticipants();
      }
    }
  };

  const handleSearch = async (keyword) => {
    const data = await fetchParticipants(route.params?.questId);
    let search = data;
    if (keyword) {
      search = await data?.filter(
        (user) =>
          user.user.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.user.lastName.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setParticipants(search);
  };

  useEffect(() => {
    getParticipants();
  }, []);

  const handleRefresh = useCallback(() => {
    getParticipants();
  }, []);

  return (
    <Bottomsheet snapPoints={["100%"]} detached={true} hideBar={true} index={0}>
      <View
        style={{
          alignItems: "center",
          position: "relative",
          marginTop: 15,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            TabNavigation.navigate("QuestManage", {
              questId: route.params?.questId,
            });
          }}
          style={styles.exit}
        >
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 5 }}
            source={goBackPic}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Kanit400", fontSize: 20 }}>
          แก้ไขรายชื่อ
        </Text>
      </View>
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="ค้นหา..."
          onChangeText={(value) => handleSearch(value)}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Kanit400", fontSize: 16 }}>
          ผู้เข้าร่วม
        </Text>
        <View style={{ flexDirection: "row", marginRight: 5 }}>
          <Text style={{ fontFamily: "Kanit300" }}>เลือกทั้งหมด</Text>
          <Checkbox
            color={primaryColor}
            value={isAllChecked}
            onValueChange={handleCheckedAll}
            style={{ marginLeft: 5, marginRight: 5 }}
          />
        </View>
      </View>
      <BottomSheetFlatList
        data={participants}
        keyExtractor={(i) => i.user._id}
        renderItem={userTagItem}
        contentContainerStyle={styles.participantsContainer}
        refreshing={false}
        onRefresh={handleRefresh}
      />
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  participantsContainer: {
    gap: 5,
    paddingHorizontal: 10,
    marginTop: 3,
  },
  exit: {
    // padding: 5,
    position: "absolute",
    left: 0,
    width: 30,
    height: 30,
    padding: 4,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontFamily: "Kanit300",
  },
});
