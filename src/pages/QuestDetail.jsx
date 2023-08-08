import React from "react"
import {View, Text} from "react-native"

export default function QuestDetail ({route}) {
  return (
    <View>
      <Text>{route.params?.questId}</Text>
      <Text>Quest detail 1</Text>
      <Text>Quest detail 2</Text>
      <Text>Quest detail 3</Text>
    </View>
  )
}