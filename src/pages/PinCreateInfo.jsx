import {View, Text} from "react-native"
import { useAppContext } from "../data/AppContext"

import Bottomsheet from "../components/Bottomsheet/Bottomsheet";

export default function PinCreateInfo() {

  const {newMarker} = useAppContext();

  return (
    <Bottomsheet snapPoints={["40%"]}>
      <Text>{newMarker.placeId} {newMarker.name}</Text>
      <Text>{newMarker.latitude} {newMarker.longitude}</Text>
    </Bottomsheet>
  )
}