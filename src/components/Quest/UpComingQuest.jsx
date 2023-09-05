import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { useAppContext } from "../../data/AppContext";
import { textColor } from "../../data/color";
import QuestListItem from "../QuestListItem";

export default function UpComingQuest({ onPress }) {
  const { soonQuest } = useAppContext();

  if (soonQuest?.length) {
    return (
      <View style={{ marginTop: 20, gap: 6 }}>
        <Text style={{ color: textColor, fontWeight: 600, fontSize: 14 }}>
          เควสที่กำลังจะมาถึง
        </Text>
        {soonQuest?.slice(0, 5).map((q) => (
          <QuestListItem
            quest={q}
            key={`profile-${q._id}`}
            onPress={onPress}
            panMap={true}
          />
        ))}
      </View>
    );
  }

  return;
}
