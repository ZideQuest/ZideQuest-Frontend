import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { useAppContext } from "../../data/AppContext";
import { textColor } from "../../data/color";
import QuestListItem from "../QuestListItem";

export default function UpComingQuest({ onPress }) {
  const { soonQuest } = useAppContext();

  return (
    <View style={{ marginTop: 20, gap: 6 }}>
      <Text style={{ color: textColor, fontFamily: "Kanit400", fontSize: 16 }}>
        เควสที่กำลังจะมาถึง
      </Text>

      {soonQuest?.length ? (
        soonQuest
          ?.slice(0, 5)
          .map((q) => (
            <QuestListItem
              quest={q}
              key={`profile-${q._id}`}
              onPress={onPress}
              panMap={true}
            />
          ))
      ) : (
        <Text
          style={{ color: textColor, fontFamily: "Kanit300", fontSize: 16, textAlign: "center" }}
        >
          คุณยังไม่มีเควสที่กำลังจะมาถึง...
        </Text>
      )}
    </View>
  );
}
