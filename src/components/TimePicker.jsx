import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TimePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {

    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate;

        setStartDate(currentDate);
    };
    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setEndDate(currentDate);
    };

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
};

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        gap: 5
    },
    innerView: {
        flex: 1,
        // flexDirection: "column",
        // justifyContent: "flex-start",
        // alignItems: "flex-start",
        // borderWidth: 1
    },
    datePicker: {
        borderColor: "#000",
        // padding: 0,
        // borderWidth: 1
    }
});
