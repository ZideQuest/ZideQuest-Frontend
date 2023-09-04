import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TimePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {

    const [isPickerStartShow, setIsPickerStartShow] = useState(false);
    const [isPickerEndShow, setIsPickerEndShow] = useState(false);

    const showStartPicker = () => {
        setIsPickerStartShow(true);
    };

    const showEndPicker = () => {
        setIsPickerEndShow(true);
    };

    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setStartDate(currentDate);
        if (Platform.OS === 'android') {
            setIsPickerStartShow(false);
            setIsPickerEndShow(false);

        }
    };
    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setEndDate(currentDate);
        if (Platform.OS === 'android') {
            setIsPickerStartShow(false);
            setIsPickerEndShow(false);

        }
    };

    if (Platform.OS === 'android') {
        return (
            <View style={styles.view}>
                <View style={styles.innerView}>
                    {!isPickerStartShow && (
                        <View style={styles.datePicker}>
                            <Button title="Show Picker" color="purple" onPress={showStartPicker} />
                        </View>
                    )}

                    {isPickerStartShow && (
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChangeStartDate}
                            style={styles.datePicker}
                        />
                    )}
                </View>
                <View style={styles.innerView}>
                    {!isPickerEndShow && (
                        <View style={styles.datePicker}>
                            <Button title="Show Picker" color="purple" onPress={showPicker} />
                        </View>
                    )}

                    {isPickerEndShow && (
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChangeEndDate}
                            style={styles.datePicker}
                        />
                    )}
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.view}>
                <View style={styles.innerView}>
                    <Text style={{ fontSize: 16 }}>เริ่มจัดกิจกรรม</Text>

                    <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode={'datetime'}
                        is24Hour={true}
                        onChange={onChangeStartDate}
                        style={styles.datePicker}
                    />
                </View>
                <View style={styles.innerView}>
                    <Text style={{ fontSize: 16 }}>เวลาจบ</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        minimumDate={startDate}
                        value={endDate}
                        mode={'datetime'}
                        is24Hour={true}
                        onChange={onChangeEndDate}
                        style={styles.datePicker}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        gap: 5,
        // borderWidth: 1
    },
    innerView: {
        flex: 1,
        gap: 10
        // flexDirection: "column",
        // justifyContent: "flex-start",
        // alignItems: "flex-start",
        // borderWidth: 1
    },
    datePicker: {
        // borderColor: "#000",
        // backgroundColor: "white"
        // padding: 0,
        // borderWidth: 1
    }
});
