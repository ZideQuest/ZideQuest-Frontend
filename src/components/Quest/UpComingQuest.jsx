import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

import { useAppContext } from "../../data/AppContext";
import { textColor } from "../../data/color";
import QuestListItem from "../QuestListItem";

export default function UpComingQuest({ onPress }) {
  const { soonQuest } = useAppContext();

  return (
    <View style={{ marginTop: 20, flexShrink: 1 }}>
      <Text style={{ color: textColor, fontFamily: "Kanit400", fontSize: 16 }}>
        เควสที่กำลังจะมาถึง
      </Text>
      {soonQuest?.length ? (
        <ScrollView>
          <View style={{ gap: 6, marginTop: 2 }}>
            {soonQuest?.map((q) => (
              <QuestListItem
                quest={q}
                key={`profile-${q._id}`}
                onPress={onPress}
                panMap={true}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text
          style={{
            color: textColor,
            fontFamily: "Kanit300",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          คุณยังไม่มีเควสที่กำลังจะมาถึง...
        </Text>
      )}
    </View>
  );
}
