import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import UserTag from "./UserTag";

import { fetchParticipants } from "../../data/Quest";

export default function Participants({ questId }) {
  const [participants, setParticipants] = useState();
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

  return (
    <View style={{ width: "100%" }}>
      {participants?.length ? (
        <View style={{ gap: 7, paddingHorizontal: 10 }}>
          <Text style={{fontWeight: 500, fontSize: 17}}>ผู้เข้าร่วม</Text>
          {participants?.map((user) => (
            <UserTag user={user} />
          ))}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
