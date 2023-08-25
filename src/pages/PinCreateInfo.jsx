import {View, Text} from "react-native"
import { useAppContext } from "../data/AppContext"

export default function PinCreateInfo() {

  const {newMarker} = useAppContext();

  return (
    <View>
      <Text>{newMarker.placeId} {newMarker.name}</Text>
      <Text>{newMarker.latitude} {newMarker.longitude}</Text>
    </View>
  )
}