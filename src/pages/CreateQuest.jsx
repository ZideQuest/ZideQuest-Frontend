import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import AddPhoto from '../components/AddPhoto';
import SelectDropdown from 'react-native-select-dropdown'
import React, { useEffect, useState } from 'react'
import { TimePicker } from '../components/TimePicker';
import axios from 'axios';
import { useRoute } from '@react-navigation/native'
import * as SecureStore from "expo-secure-store";
import { createQuest } from '../data/Quest';
const BASE_URL = "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";
// const activityCategories = ["ไม่มีชั่วโมงกิจกรรม", "1 กิจกรรมมหาวิทยาลัย", "2.1 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาคุณธรรม จริยธรรม", "2.2 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านการคิดและการเรียนรู้", "2.3 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล", "2.4 กิจกรรมเพื่อเสริมสร้างสมรรถนะ ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล", "3 กิจกรรมเพื่อสังคม"]
const activityCategories = [
    "ไม่มีชั่วโมงกิจกรรม",
    "1 กิจกรรมมหาวิทยาลัย",
    "2.1  ด้านพัฒนาคุณธรรม จริยธรรม",
    "2.2  ด้านการคิดและการเรียนรู้",
    "2.3  ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล",
    "2.4  ด้านพัฒนาทักษะเสริมสร้างความสัมพันธ์ระหว่างบุคคล",
    "3 กิจกรรมเพื่อสังคม"
]

function CreateQuest() {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [questName, setQuestName] = useState("")
    const [description, setDescription] = useState("")
    const [maxParticipant, setMaxParticipant] = useState("")
    const [activity, setActivity] = useState("")
    const [activityHour, setActivityHour] = useState(0)
    const [tags, setTags] = useState([])
    const [tagId, setTagId] = useState("")
    const route = useRoute()
    const { locationId } = route.params

    const buttonHandler = async (e) => {
        console.log(startDate, endDate)
        try {
            const questDetail = new FormData()
            // questDetail.append("timeStart", "2023-07-24T00:19:54.519Z")
            // questDetail.append("timeEnd", "2023-07-24T00:21:54.519Z")
            questDetail.append("timeStart", startDate.toDateString())
            questDetail.append("timeEnd", endDate.toDateString())
            questDetail.append("questName", questName)
            questDetail.append("description", description)
            questDetail.append("maxParticipant", maxParticipant)
            questDetail.append("autoComplete", true)

            if (activity != "" || activityHour != 0) {
                const activityDetail = {
                    category: activity,
                    hour: activityHour
                }
                questDetail.append("activityHour", activityDetail)
            }

            if (tagId != "") {
                const handleTag = [tagId]
                questDetail.append("tagId", handleTag)

            }
            await createQuest(questDetail, locationId)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getTags = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/tag`)
                setTags(data)
            } catch (error) {
                return {
                    message: "failed to load locations",
                    status: 401,
                };
            }
        }
        getTags()
    }, [])

    const tagArray = ["ไม่มีแท็ก", ...tags.map((item) => item.tagName)]
    return (
        <Bottomsheet style={styles.container} snapPoints={["31%", "65%", "90%"]} index={1}>
            <BottomSheetScrollView
                style={{ backgroundColor: "white" }}>
                <View style={styles.innerContainer}>
                    <Text style={styles.textXl}>
                        เพิ่มเควสใหม่
                    </Text>

                    <View style={styles.detailBox}>
                        <View style={styles.box}>
                            <Text style={styles.textMd}>ชื่อเควส</Text>
                            <TextInput style={styles.textIn} value={questName} onChangeText={setQuestName} />
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.textMd}>รายละเอียด</Text>
                            <TextInput style={styles.textIn} value={description} onChangeText={setDescription} />

                        </View>
                        <View style={{ flexDirection: "row", gap: 20, flex: 1, justifyContent: 'space-between' }}>

                            <View style={{ ...styles.box, flex: 1 }}>
                                <Text style={styles.textMd}>แท็ก</Text>
                                <SelectDropdown
                                    search={true}
                                    defaultValueByIndex={0}
                                    data={tagArray}
                                    onSelect={(selectedItem, index) => {
                                        if (index === 0) {
                                            setTagId("")
                                        } else {
                                            setTagId(tags[index]._id)
                                        }
                                        const activityType = selectedItem.split(" ")[0]
                                        // console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                    // search={true}
                                    buttonTextStyle={{
                                        fontSize: 16,
                                    }}

                                    dropdownStyle={{
                                        borderRadius: 20,
                                        backgroundColor: "#fbfbfb"
                                    }}
                                    rowTextStyle={{
                                        fontSize: 16,
                                        textAlign: 'left'
                                    }}

                                    buttonStyle={{
                                        height: 30,
                                        borderColor: "#CDCDCD",
                                        borderWidth: 1,
                                        width: "100%",

                                        backgroundColor: "#fbfbfb",
                                        borderRadius: 10,
                                        fontSize: 16
                                    }}
                                />
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.textMd}>จำนวนคน</Text>
                                <TextInput style={styles.textIn} value={maxParticipant} onChangeText={setMaxParticipant} />
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.textMd}>เพิ่่มรูปภาพ</Text>
                                <AddPhoto />

                            </View>
                        </View>
                        <View style={styles.box}>
                            {/* <Text style={styles.textMd}>ช่วงเวลาจัดกิจกรรม</Text> */}
                            <TimePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                        </View>

                        <View style={{ flexDirection: "row", gap: 40, flex: 1 }}>
                        </View>
                        <View style={{ flexDirection: "row", gap: 40, flex: 1 }}>
                            <View style={styles.box}>
                                <Text style={styles.textMd}>ชั่วโมงกิจกรรม</Text>
                                <SelectDropdown
                                    defaultValueByIndex={0}
                                    data={activityCategories}
                                    onSelect={(selectedItem, index) => {
                                        if (index === 0) {
                                            setActivity("")
                                        }
                                        const activityType = selectedItem.split(" ")[0]
                                        setActivity(activityType)
                                        // console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                    // search={true}
                                    buttonTextStyle={{
                                        fontSize: 16,
                                    }}

                                    dropdownStyle={{
                                        borderRadius: 20,
                                        backgroundColor: "#fbfbfb"
                                    }}
                                    rowTextStyle={{
                                        fontSize: 16,
                                        textAlign: 'left'
                                    }}

                                    buttonStyle={{
                                        height: 30,
                                        borderColor: "#CDCDCD",
                                        borderWidth: 1,

                                        backgroundColor: "#fbfbfb",
                                        borderRadius: 10,
                                        fontSize: 16
                                    }}

                                />

                            </View>
                            <View style={styles.box}>
                                <Text style={styles.textMd}>จำนวนชั่วโมง</Text>
                                <TextInput style={styles.textIn} value={activityHour} onChangeText={setActivityHour} />
                            </View>
                        </View>
                    </View>
                    <Pressable style={styles.btn} onPress={buttonHandler}>
                        <Text style={styles.textBtn}>สร้างกิจกรรม</Text>
                    </Pressable>
                </View>
            </BottomSheetScrollView>
        </Bottomsheet >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FDFEFE",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        columnGap: 10,
        flex: 1,
        overflow: "scroll",
    },
    innerContainer: {
        paddingHorizontal: 25,
        gap: 20
    },
    textIn: {
        borderColor: "#CDCDCD",
        borderWidth: 1,
        padding: 4,
        backgroundColor: "#fbfbfb",
        borderRadius: 10,
        fontSize: 16
    },
    textXl: {
        fontSize: 28,
        fontWeight: "bold"
    },
    textMd: {
        fontSize: 16
    },
    box: {
        gap: 4,
        // borderWidth: 1
    },
    detailBox: {
        gap: 10
    },
    btn: {
        backgroundColor: "#e86a33",
        padding: 10,
        width: "100%",
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    textBtn: {
        textAlign: 'center',
        color: "white",
        fontWeight: "bold"
    }
});

export default CreateQuest