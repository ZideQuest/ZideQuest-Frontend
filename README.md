# Get start

Guide to start developing React-native with Expo

## Installation

```
npm install
npm start
```

ถ้ามีปัญหาให้ลอง
`npx expo start -c`

## การใช้งาน

### เพิ่มหน้าจอด้านล่าง

1.  Create screen file

````js
import {View, Text} from "react-native"
export default function PinCreateInfo() {
	return (
		<View>
			<Text>Ayo</Text>
		</View>
)}
```wsz
2. เปลี่ยน View container เป็น Bottomsheet ที่ Import ตามนี้
```js
import {View, Text} from  "react-native"
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
export default function PinCreateInfo() {
	return (
		<Bottomsheet snapPoints={["40%", "90%"]} index={0}>
			<Text>Ayo</Text>
		</Bottomsheet>
)}
````

**snapPoints** คือลิสต์ขนาดของหน้าจอที่จะขยายไปได้
**index** คือ index ของ snapPoints ใช้กำหนดขนาดเริ่มต้นของหน้าจอ

3.  **ใช้ข้อมูลที่ส่งมาจากหน้าจออื่น** เช่น หน้า Pin ส่ง Quest ID ไปที่หน้า Quest detail ส่วนมากใช้ส่ง ID ในการ Fetch ข้อมูลจาก Backend

```js
import { View, Text } from "react-native";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
export default function PinCreateInfo({ route }) {
  return (
    <Bottomsheet snapPoints={["40%", "90%"]} index={0}>
      <Text>{route.params?.questId}</Text>
    </Bottomsheet>
  );
}
```

4.  **ใช้ข้อมูลส่วนกลาง** AppContext เป็นจุดเก็บข้อมูลเช่น User Detail ซึ่งจะสามารถดึงจากหน้าไหนก็ได้ Import ตามนี้

```js
import { View, Text } from "react-native";
import { useAppContext } from "../data/AppContext";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
export default function PinCreateInfo() {
  const { newMarker } = useAppContext();
  return (
    <Bottomsheet snapPoints={["40%"]}>
      <Text>
        {newMarker.placeId} {newMarker.name}
      </Text>
      <Text>
        {newMarker.latitude} {newMarker.longitude}
      </Text>
    </Bottomsheet>
  );
}
```

ตัวอย่างด้านบนจะดึงข้อมูล newMarker จากข้อมูลส่วนกลางมาแสดง
ข้อมูลที่ดึงได้สามารถดูและเพิ่มได้จากไฟล์ `AppContext.jsx`

5.  เพิ่มไปยัง HomeScreen ให้ Import ให้เรียบร้อย แล้วใส่เข้าไปในส่วนนี้ ตั้งชื่อให้เรียบร้อย ควรเป็นชื่อที่บ่งบอกถึงหน้าที่อย่างชัดเจน

```
<Stack.Navigator>
	<Stack.Screen name="Recommend" component={RecommendScreen}  />
	<Stack.Screen name="CreatePin" component={CreatePinScreen}  />
	<Stack.Screen name="PinDetail" component={PinDetailScreen}  />
	<Stack.Screen name="QuestDetail" component={ActivityDetail}  />
	<Stack.Screen name="CreateQuest" component={RecommendScreen}  />
	<Stack.Screen name="PinCreateInfo" component={PinCreateInfo}  />
</Stack.Navigator>
```

---

### เปลี่ยนหน้าด้านล่าง

1.  import TabNavigation

```js
import * as TabNavigation from "../data/TabNavigation";
```

2.  Change screen function

```js
TabNavigation.navigate(page, params);
```

**page** เป็นชื่อ Screen ที่ตั้งไว้ใน HomeScreen
**params** เป็น object ข้อมูลที่จะส่งไปยังหน้าจอนั้น แล้วจอนั้นจะสามารถเข้าถึงได้ผ่าน route.params ตัวอย่างเช่น
`{name: "zidequest", date: "today"}`

---

### Components ต่างๆ

อยู่ใน `/components` Import มาใช้ได้เลย จะเพิ่มก็เพิ่มเข้าไปได้ครับ

- [x] Quest list Item
- [x] Back to recommend screen button
- [ ] Participants List Item
- [ ] Quest Detail Header
