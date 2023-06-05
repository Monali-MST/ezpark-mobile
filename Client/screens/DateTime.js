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
    const [fromDate, setFromDate] = useState({
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

    const [toDate, setToDate] = useState({
        DateShow: false,
        Date: null,
        DateChecker: new Date(),
        DateSelected: false,
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
        console.log(toTime.TimeChecker.getMinutes()-fromTime.TimeChecker.getMinutes());
        if(fromDate.DateChecker>toDate.DateChecker){
            setErrTitle("Oops...!!");
            setErrContent("Invalid date selection");
            setError(true);
        }else if(fromDate.DateChecker.getDate()==toDate.DateChecker.getDate() && fromTime.TimeChecker>toTime.TimeChecker){
            setErrTitle("Oops...!!");
            setErrContent("Invalid time selection");
            setError(true);
        }else if(fromDate.DateChecker.getDate()==toDate.DateChecker.getDate() && fromTime.TimeChecker.getHours()==toTime.TimeChecker.getHours() && (toTime.TimeChecker.getMinutes()-fromTime.TimeChecker.getMinutes()) < 31){
            setErrTitle("Oops...!!");
            setErrContent("Maximum booking time must be more than 30 minutes");
            setError(true);
        }else{
            await AsyncStorage.multiSet([['fromDate', fromDate.Date], ['fromTime', fromTime.Time], ['toDate', toDate.Date], ['toTime', toTime.Time]]);
            props.navigation.navigate('Zone');
        }
    }


    const onChange = (event, selected, item) => {
        if (item === "fromDate") {
            let fDate = selected.getFullYear() + "/" + (selected.getMonth() + 1) + "/" + selected.getDate();
            setFromDate((prev) => ({ ...prev, DateShow: Platform.OS === 'ios', Date: fDate, DateChecker: selected }));
        } else if (item === "fromTime") {
            let fTime = selected.getHours() + ":" + selected.getMinutes();
            setFromTime((prev) => ({ ...prev, TimeShow: Platform.OS === 'ios', Time: fTime, TimeChecker: selected }));
        } else if (item === "toDate") {
            let fDate = selected.getFullYear() + "/" + (selected.getMonth() + 1) + "/" + selected.getDate();
            setToDate((prev) => ({ ...prev, DateShow: Platform.OS === 'ios', Date: fDate, DateChecker: selected }));
        } else if (item === "toTime") {
            let fTime = selected.getHours() + ":" + selected.getMinutes();
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
                <Text style={intStyles.title}>Sign Up</Text>
            </View>

            <View style={intStyles.imageContainer}>
                <Image source={require('./../src/assets/Parking-amico.png')} style={intStyles.image} />
            </View>
            <View style={intStyles.formContainer}>
                <View style={intStyles.formElement}>
                    <Text style={intStyles.formTitle}>From</Text>
                    <View style={{ flexDirection: "row", width: "100%", marginHorizontal: "3.3%" }}>
                        <Pressable style={intStyles.inputField} onPress={() => showMode(setFromDate, 'DateShow')}>
                            <View style={{ width: "85%" }}>
                                {
                                    fromDate.Date != null ? <Text style={intStyles.selectedText}>{fromDate.Date}</Text>
                                        :
                                        <Text style={intStyles.inputFieldText}>Date</Text>
                                }
                            </View>
                            <Ant name="right" size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
                        </Pressable>

                        <Pressable style={{ ...intStyles.inputField, ...{ marginLeft: "3.3%" } }} onPress={() => showMode(setFromTime, 'TimeShow')}>
                            <View style={{ width: "85%" }}>
                                {
                                    fromTime.Time != null ? <Text style={intStyles.selectedText}>{fromTime.Time}</Text>
                                        :
                                        <Text style={intStyles.inputFieldText}>Time</Text>
                                }
                            </View>
                            <Ant name="clockcircleo" size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
                        </Pressable>
                    </View>
                </View>

                <View style={intStyles.formElement}>
                    <Text style={intStyles.formTitle}>To</Text>
                    <View style={{ flexDirection: "row", width: "100%", marginHorizontal: "3.3%" }}>
                        <Pressable style={intStyles.inputField} onPress={() => showMode(setToDate, 'DateShow')} disabled={fromDate.Date === null}>
                            <View style={{ width: "85%" }}>
                                {
                                    toDate.Date != null ? <Text style={intStyles.selectedText}>{toDate.Date}</Text>
                                        :
                                        <Text style={intStyles.inputFieldText}>Date</Text>
                                }
                            </View>
                            <Ant name="right" size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
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

            {fromDate.DateShow && (<DateTimePicker value={fromDate.Date != null ? fromDate.DateChecker : new Date()} mode='date' display="default" minimumDate={new Date()} maximumDate={maxDate} onChange={(event, selectedDate) => onChange(event, selectedDate, "fromDate")} />)}

            {fromTime.TimeShow && (<DateTimePicker value={fromTime.Time != null ? fromTime.TimeChecker : new Date()} mode='time' is24Hour={true} display="default" onChange={(event, selectedTime) => onChange(event, selectedTime, "fromTime")} />)}

            {toDate.DateShow && (<DateTimePicker value={toDate.Date != null ? toDate.DateChecker : new Date()} mode='date' display="default" minimumDate={fromDate != null ? fromDate.DateChecker : new Date()} maximumDate={maxDate} onChange={(event, selectedDate) => onChange(event, selectedDate, "toDate")} />)}

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