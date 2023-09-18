import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import UserTag from "./UserTag";
import * as TabNavigation from "../../data/TabNavigation"

import { fetchParticipants } from "../../data/Quest";

export default function Participants({ questId }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getParticipants = async () => {
      setLoading(true);
      const data = await fetchParticipants(questId);
      setParticipants(data);
      setLoading(false);
    };

    getParticipants();
  }, []);

  const editParticipantHandler = () => {
    TabNavigation.navigate("EditParticipants", { questId });
  };

  return (
    <View style={{ width: "100%" }}>
      {participants?.length ? (
        <View style={{ gap: 7 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Kanit400", fontSize: 17 }}>
              ผู้เข้าร่วม
            </Text>
            <TouchableOpacity onPress={editParticipantHandler}>
              <Text style={{ fontFamily: "Kanit300", fontSize: 16 }}>
                จัดการผู้เข้าร่วม
              </Text>
            </TouchableOpacity>
          </View>
          {participants?.map((user) => (
            <UserTag user={user} key={`participant-${user?.user?._id}`} />
          ))}
        </View>
      ) : (
        <Text style={{ fontFamily: "Kanit400", fontSize: 17 }}>
          ยังไม่มีผู้เข้าร่วม
        </Text>
      )}
    </View>
  );
}
