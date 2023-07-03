import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import extStyles from "../styles/extStyles";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ant from 'react-native-vector-icons/AntDesign';
import Button from "../Components/Button";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DateTime = (props) => {
    const [date, setDate] = useState({
        DateShow: false,
        Date: null,
        DateChecker: new Date(),
        DateSelected: false,
    });

    const [fromTime, setFromTime] = useState({
        TimeShow: false,
        Time: null,
        TimeChecker: new Date(),
        TimeSelected: false,
    });

    const [toTime, setToTime] = useState({
        TimeShow: false,
        Time: null,
        TimeChecker: new Date(),
        TimeSelected: false,
    });

    const [maxDate, setMaxDate] = useState(new Date());

    const [error, setError] = useState(false);

    const validate = async e => {
        if(date.Date==null){
            setErrTitle("Oops...!!");
            setErrContent("Select the date first");
            setError(true);
        }else if(fromTime.Time==null && toTime.Time==null){
            setErrTitle("Oops...!!");
            setErrContent("Select the booking starting and end time");
            setError(true);
        }else if(toTime.Time==null){
            setErrTitle("Oops...!!");
            setErrContent("Select the booking end time");
            setError(true);
        }else if(fromTime.TimeChecker>toTime.TimeChecker){
            setErrTitle("Oops...!!");
            setErrContent("Invalid time selection");
            setError(true);
        }else if(fromTime.TimeChecker.getHours()==toTime.TimeChecker.getHours() && (toTime.TimeChecker.getMinutes()-fromTime.TimeChecker.getMinutes()) < 31){
            setErrTitle("Oops...!!");
            setErrContent("Maximum booking time must be more than 30 minutes");
            setError(true);
        }else{
            await AsyncStorage.multiSet([['date', date.Date], ['fromTime', fromTime.Time],['toTime', toTime.Time],['type', 'new']]);
            props.navigation.navigate('Zone');
        }
    }


    const onChange = (event, selected, item) => {
        if (item === "date") {
            let fDate = selected.getFullYear() + "/" + (selected.getMonth() + 1) + "/" + selected.getDate();
            setDate((prev) => ({ ...prev, DateShow: Platform.OS === 'ios', Date: fDate, DateChecker: selected }));
        } else if (item === "fromTime") {
            let fTime = selected.getHours().toString().padStart(2, '0') + ":" + selected.getMinutes().toString().padStart(2, '0');
            setFromTime((prev) => ({ ...prev, TimeShow: Platform.OS === 'ios', Time: fTime, TimeChecker: selected }));
        }else if (item === "toTime") {
            let fTime = selected.getHours().toString().padStart(2, '0') + ":" + selected.getMinutes().toString().padStart(2, '0');
            setToTime((prev) => ({ ...prev, TimeShow: Platform.OS === 'ios', Time: fTime, TimeChecker: selected }));
        }
    }

    const showMode = (state, item) => {
        state((prev) => ({ ...prev, [item]: true }));
    }

    useEffect(() => {
        maxDate.setDate(maxDate.getDate() + 7);
    }, [])

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Material name="calendar-edit" color={"#FAA41E"} size={82} style={intStyles.icon} />
                <Text style={intStyles.title}>Make a{'\n'}booking</Text>
            </View>

            <View style={intStyles.imageContainer}>
                <Image source={require('./../src/assets/Parking-amico.png')} style={intStyles.image} />
            </View>
            <View style={intStyles.formContainer}>
                <View style={intStyles.formElement}>
                    <Text style={intStyles.formTitle}>Date</Text>
                    <View style={{ flexDirection: "row", width: "100%", marginHorizontal: "3.3%" }}>
                        <Pressable style={{...intStyles.inputField, ...{width:"93.3%"}}} onPress={() => showMode(setDate, 'DateShow')}>
                            <View style={{ width: "85%" }}>
                                {
                                    date.Date != null ? <Text style={intStyles.selectedText}>{date.Date}</Text>
                                        :
                                        <Text style={intStyles.inputFieldText}>Date</Text>
                                }
                            </View>
                            <Ant name="right" size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
                        </Pressable>
                    </View>
                </View>

                <View style={intStyles.formElement}>
                    <Text style={intStyles.formTitle}>Time</Text>
                    <View style={{ flexDirection: "row", width: "100%", marginHorizontal: "3.3%" }}>
                        <Pressable style={intStyles.inputField} onPress={() => showMode(setFromTime, 'TimeShow')}  disabled={date.Date == null}>
                            <View style={{ width: "85%" }}>
                                {
                                    fromTime.Time != null ? <Text style={intStyles.selectedText}>{fromTime.Time}</Text>
                                        :
                                        <Text style={intStyles.inputFieldText}>Time</Text>
                                }
                            </View>
                            <Ant name="clockcircleo" size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
                        </Pressable>

                        <Pressable style={{ ...intStyles.inputField, ...{ marginLeft: "3.3%" } }} onPress={() => showMode(setToTime, 'TimeShow')} disabled={fromTime.Time == null}>
                            <View style={{ width: "85%" }}>
                                {
                                    toTime.Time != null ? <Text style={intStyles.selectedText}>{toTime.Time}</Text>
                                        :
                                        <Text style={intStyles.inputFieldText}>Time</Text>
                                }
                            </View>
                            <Ant name="clockcircleo" size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
                        </Pressable>
                    </View>
                </View>

                <View style={{ width: "90%", alignSelf: "center", marginVertical: 50 }}>
                    <Button title={"Next"} onPress={() => validate()} />
                </View>
            </View>

            {date.DateShow && (<DateTimePicker value={date.Date != null ? date.DateChecker : new Date()} mode='date' display="default" minimumDate={new Date()} maximumDate={maxDate} onChange={(event, selectedDate) => onChange(event, selectedDate, "date")} />)}

            {fromTime.TimeShow && (<DateTimePicker value={fromTime.Time != null ? fromTime.TimeChecker : new Date()} mode='time' is24Hour={true} display="default" onChange={(event, selectedTime) => onChange(event, selectedTime, "fromTime")} />)}

            {toTime.TimeShow && (<DateTimePicker value={toTime.Time != null ? toTime.TimeChecker : new Date()} mode='time' is24Hour={true} display="default" onChange={(event, selectedTime) => onChange(event, selectedTime, "toTime")} />)}

            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null }
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({

    selectedText: {
        fontSize: 20,
        alignSelf: "flex-start",
        color: "#000"
    },

    inputFieldText: {
        fontSize: 20,
        alignSelf: "flex-start"
    },

    inputField: {
        width: "45%",
        height: 50,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 6,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    formTitle: {
        textAlign: "center",
        color: "#000",
        fontSize: 20,
        fontWeight: "800"
    },

    icon: {
        marginLeft: 10,
        marginRight: 5,
        height: "100%"
    },

    title: {
        fontSize: 36,
        fontWeight: "900",
        color: "#FAA41E",
        lineHeight: 40,
    },

    titleView: {
        flexDirection: "row",
        alignItems: "center"
    },

    imageContainer: {
        height: "35%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    formContainer: {
        height: "65%",
        width: "100%",
        alignItems: "center"
    },

    image: {
        resizeMode: "contain",
        width: "80%",
        height: "80%"
    },

    formElement: {
        width: "95%",
        height: 100,
        backgroundColor: "#FAA41E",
        borderRadius: 9,
        marginBottom: 10,
    }
})

export default DateTime;