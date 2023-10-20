import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import UserTag from "./UserTag";
import * as TabNavigation from "../../data/TabNavigation";

import { fetchParticipants } from "../../data/Quest";
import { textColor } from "../../data/color";

export default function Participants({ questId, ownerChecker, isCompleted }) {
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
    if (isCompleted) {
      return;
    }
    if (ownerChecker()) {
      TabNavigation.navigate("EditParticipants", { questId });
    } else {
      alert("You are not allowed to manage participants.");
    }
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
              <Text
                style={{
                  fontFamily: "Kanit300",
                  fontSize: 15,
                  color: isCompleted ? "grey" : "teal",
                  opacity: ownerChecker() ? 1 : 0.4,
                }}
              >
                จัดการผู้เข้าร่วม
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {participants?.slice(0, 5).map((user) => (
              <View
                key={`participant-${user?.user?._id}`}
                style={{ marginBottom: 5 }}
              >
                <UserTag user={user} />
              </View>
            ))}
            {participants.length > 5 && (
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Kanit300",
                  color: textColor,
                }}
              >
                และคนอื่นๆอีก {participants.length - 5} คน...
              </Text>
            )}
          </ScrollView>
        </View>
      ) : (
        <Text style={{ fontFamily: "Kanit400", fontSize: 17 }}>
          ยังไม่มีผู้เข้าร่วม
        </Text>
      )}
    </View>
  );
}
