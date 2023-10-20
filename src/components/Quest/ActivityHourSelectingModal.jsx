import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";

import ItemSelectingModal from "../misc/ItemSelectingModal";

import { activityCategories } from "../../data/activityCategory";

export default function ActivityHourSelectingModal({ activity, setActivity }) {
  const [refresher, setRefresher] = useState(false);
  const activityPressHandler = (act) => {
    setActivity(act);
    setRefresher((prev) => !prev);
  };

  return (
    <ItemSelectingModal
      subject={activityCategories[activity]}
      closeOnPress
      refresher={refresher}
      isActive={activity != 0}
    >
      <View>
        <Text
          style={{
            paddingHorizontal: 7,
            marginTop: 10,
            marginBottom: 6,
            fontFamily: "Kanit400",
            fontSize: 18,
          }}
        >
          เลือกชั่วโมงกิจกรรม
        </Text>
        {Object.keys(activityCategories).map((act) => (
          <TouchableHighlight
            underlayColor="#DDDDDD"
            onPress={() => activityPressHandler(act)}
            key={`activity-hour-${act}`}
            style={{ width: "100%", padding: 7, paddingLeft: 13 }}
          >
            <Text style={{ fontFamily: "Kanit300", fontSize: 15 }}>
              {activityCategories[act]}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
    </ItemSelectingModal>
  );
}
