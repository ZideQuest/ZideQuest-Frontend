import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import UserTag from "../../components/Participants/UserTag";
import Bottomsheet from "../../components/Bottomsheet/Bottomsheet";
import BackButton from "../../components/button/BackButton";

import { fetchParticipants } from "../../data/Quest";

export default function ParticipantsEditing({ route }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getParticipants = async () => {
      setLoading(true);
      const data = await fetchParticipants(route.params?.questId);
      setParticipants(data);
      setLoading(false);
    };

    getParticipants();
  }, []);

  return (
    <Bottomsheet snapPoints={["95%"]} detached={true} hideBar={true} index={0}>
      <BackButton
        targetRoute="QuestManage"
        params={{ questId: route.params?.questId }}
        resetFocus={false}
      />
      <Text>ผู้เข้าร่วม</Text>
      <BottomSheetScrollView>
        <View style={styles.participantsContainer}>
          {participants?.map((user) => (
            <UserTag
              user={user}
              key={`participant-${user?.user?._id}`}
              checkable
            />
          ))}
        </View>
      </BottomSheetScrollView>
    </Bottomsheet>
  );
}

const styles = StyleSheet.create({
  participantsContainer: {
    gap: 10,
    padding: 10,
  },
});
