import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import extStyles from "../styles/extStyles";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { server } from "../Service/server_con";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment-timezone";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';


const MyBookings = (props) => {
    const [error, setError] = useState(false);

    const [fetchedData, setFetchedData] = useState([]);

    const [currentBookings, setCurrentBookings] = useState([]);

    const [futureBookings, setFutureBookings] = useState([]);

    const [overlappedBookings, setOverlappedBookings] = useState([]);

    useEffect(() => {
        async function getData() {
            const token = await AsyncStorage.getItem('AccessToken');
            const decoded = jwtDecode(token);
            try {
                const response = await axios.post(server + 'fetchBookings', { "userName": decoded.userName });
                if (response.data != 404) {
                    setFetchedData(response.data);
                }
                setError(false);
            } catch (err) {
                console.log(err);
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setError(true);
            }
        }

        getData();

        const interval = setInterval(getData, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        let i = 0;
        let j = 0;
        let k = 0;
        fetchedData.forEach((item, index) => {
            if ((moment(item.Date).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')) && item.Overlapped == "0" || ((moment(item.Date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) && (item.StartTime > moment().format('HH:mm:ss'))) && item.Overlapped == "0") {
                futureBookings[i] = item;
                i++;
            } else if (item.Overlapped == "0") {
                currentBookings[j] = item;
                j++;
            } else {
                overlappedBookings[k] = item;
                k++;
            }
        });

        if (futureBookings[i]) {
            setFutureBookings(prevBookings => prevBookings.slice(0, -1));
        }

        if (currentBookings[j]) {
            setCurrentBookings(prevBookings => prevBookings.slice(0, -1));
        }

        if (overlappedBookings[k]) {
            setOverlappedBookings(prevBookings => prevBookings.slice(0, -1));
        }
    }, [fetchedData]);

    if (!Array.isArray(fetchedData)) {
        return <AppLoader />;
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Material name="calendar-clock" color={"#FAA41E"} size={82} style={intStyles.icon} />
                <Text style={intStyles.title}>My{'\n'}Bookings</Text>
            </View>
            <View style={intStyles.scrollHeadingContainer}>
                <Text style={intStyles.scrollHeadingTxt}>Bookings now in operation</Text>
            </View>
            <View style={intStyles.scrollContainer}>
                <ScrollView>
                    {currentBookings.map((item, index) => (
                        <ProgressBooking key={index} ID={item.BookingID} date={moment(item.Date).format('YYYY-MM-DD')} StartTime={item.StartTime} EndTime={item.EndTime} VehicleNo={item.VehicleNo} Slot={item.Slot} props={props} extend={item.Extend} />
                    ))}
                </ScrollView>
            </View>
            <View style={intStyles.scrollHeadingContainer}>
                <Text style={intStyles.scrollHeadingTxt}>Future Bookings</Text>
            </View>
            <View style={intStyles.scrollContainer}>
                <ScrollView style={{ paddingTop: 10, height: "100%" }}>
                {overlappedBookings.map((item, index) => (
                        <OverlappedBookings key={index} ID={item.BookingID} Date={moment(item.Date).format('YYYY-MM-DD')} StartTime={item.StartTime} EndTime={item.EndTime} VehicleNo={item.VehicleNo} Slot={item.Slot} props={props} />
                    ))}
                    {futureBookings.map((item, index) => (
                        <FutureBooking key={index} ID={item.BookingID} Date={moment(item.Date).format('YYYY-MM-DD')} StartTime={item.StartTime} EndTime={item.EndTime} VehicleNo={item.VehicleNo} Slot={item.Slot} props={props} />
                    ))}
                </ScrollView>
            </View>
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
        </SafeAreaView>
    );
}

const OverlappedBookings = ({ ID, Date, StartTime, EndTime, VehicleNo, Slot, props }) => {

    const [refundID, setRefundID] = useState(1);
    const currentDate = moment.tz("Asia/Colombo");

    const handleCancel = () => {
        props.navigation.navigate("Cancel", { bookingID: ID, dateDif: 7, bookingDate: Date, Slot: Slot, VehicleNo: VehicleNo, refundID: refundID, startTime: StartTime, EndTime: EndTime, dateDif: 0, currentDate: (currentDate.format('YYYY-MM-DD')) });
    };

    const handleSelect = async e => {
        await AsyncStorage.setItem('date',Date);
        await AsyncStorage.setItem('fromTime',StartTime);
        await AsyncStorage.setItem('toTime',EndTime);
        await AsyncStorage.setItem('type','update');
        await AsyncStorage.setItem('bookingID', String(ID));
        props.navigation.navigate("Zone");
    }

    return (
        <View style={{...intStyles.detailsContainer,...{backgroundColor: "#FFD6D6"}}}>
            <Text style={intStyles.slotTxt}>Slot <Text style={{ color: "#000" }}>{Slot}</Text></Text>
            <Text style={intStyles.vehicleNoTxt}>{VehicleNo}</Text>
            <Text style={intStyles.dateTimeTxt}>{Date} | {StartTime} to {EndTime}</Text>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity style={intStyles.selectSlotBtn} onPress={handleSelect}>
                    <Text style={intStyles.selectSlotBtnTxt}>Select another slot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={intStyles.btn} onPress={handleCancel}>
                    <Text style={intStyles.btnTxt}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const ProgressBooking = ({ ID, date, StartTime, EndTime, VehicleNo, Slot, props, extend }) => {
    const formatTime = date + "T" + EndTime;
    const targetTime = moment.tz(formatTime, "Asia/Colombo");
    const targetTime2 = moment(targetTime).add(15, "minutes");

    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
    const [remaingTimeExtend, setRemainingTimeExtend] = useState(calculateRemainingTimeExtend());
    const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime());

    const [extendTimer, setExtendTimer] = useState(false);
    const [fineTimer, setFineTimer] = useState(false);

    // const [extendItem, setExtendItem] = useState(false);
    function calculateRemainingTime() {
        const currentTime = moment.tz("Asia/Colombo");
        const difference = targetTime.diff(currentTime);

        // Check if the remaining time is less than or equal to 0
        if (difference <= 0) {
            // Stop the interval and return 0:0:0
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        // Calculate the remaining time in hours, minutes, and seconds
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    function calculateRemainingTimeExtend() {
        const currentTime = moment.tz("Asia/Colombo");
        const difference = targetTime2.diff(currentTime);

        // Check if the remaining time is less than or equal to 0
        if (difference <= 0) {
            // Stop the interval and return 0:0:0
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        // Calculate the remaining time in hours, minutes, and seconds
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    function calculateElapsedTime() {
        const currentTime = moment.tz("Asia/Colombo");
        const difference = currentTime.diff(targetTime2);

        // Calculate the elapsed time in hours, minutes, and seconds
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const current = moment.tz("Asia/Colombo");
            if (moment(EndTime, 'HH:mm:ss').isAfter(current) && !extend) {
                setRemainingTime(calculateRemainingTime());
            } else if (moment(EndTime, 'HH:mm:ss').isBefore(current.subtract(15, "minutes")) && !extend) {
                setExtendTimer(false);
                setFineTimer(true);
                setElapsedTime(calculateElapsedTime());
            } else {
                setExtendTimer(true);
                setRemainingTimeExtend(calculateRemainingTimeExtend());
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleExtend = () => {
        props.navigation.navigate("Extend", { bookingId: ID, date: date, slot: Slot, startTime: String(targetTime2), VehicleNo: VehicleNo });
    }

    return (
        <View style={intStyles.detailsContainer}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                    <Text style={intStyles.slotTxt}>Slot <Text style={{ color: "#000" }}>{Slot}</Text></Text>
                    <Text style={intStyles.vehicleNoTxt}>{VehicleNo}</Text>
                </View>
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                    {fineTimer ?
                        <Text style={intStyles.timerTitleFine}>Penalty Time</Text>
                        : extendTimer ?
                            <Text style={intStyles.timerTitleExtend}>Time to Extend</Text>
                            :
                            <Text style={intStyles.timerTitle}>Remaining Time</Text>
                    }

                    {fineTimer ?
                        <Text style={intStyles.timerFine}>
                            {elapsedTime.hours.toString().padStart(2, '0')}:
                            {elapsedTime.minutes.toString().padStart(2, '0')}:
                            {elapsedTime.seconds.toString().padStart(2, '0')}
                        </Text>
                        : extendTimer ?
                            <Text style={intStyles.timerExtend}>
                                {remaingTimeExtend.hours.toString().padStart(2, '0')}:
                                {remaingTimeExtend.minutes.toString().padStart(2, '0')}:
                                {remaingTimeExtend.seconds.toString().padStart(2, '0')}
                            </Text>
                            :
                            <Text style={intStyles.timer}>
                                {remainingTime.hours.toString().padStart(2, '0')}:
                                {remainingTime.minutes.toString().padStart(2, '0')}:
                                {remainingTime.seconds.toString().padStart(2, '0')}
                            </Text>
                    }

                </View>
            </View>
            <Text style={intStyles.dateTimeTxt}>{date} | {StartTime} to {EndTime}</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity style={intStyles.btnReview}>
                    <Text style={intStyles.btnTxt}>Add Review</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleExtend} style={extendTimer && !extend ? intStyles.extendBtn : intStyles.btnDisabled} disabled={!extendTimer || Boolean(extend)}>
                    <Text style={intStyles.extendBtnTxt}>Extend</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const FutureBooking = ({ ID, Date, StartTime, EndTime, VehicleNo, Slot, props }) => {
    const [validRefund, setValidRefund] = useState(true);
    const [refundID, setRefundID] = useState(3);
    const startDate = moment(Date, 'YYYY-MM-DD');
    const currentDate = moment.tz("Asia/Colombo");
    const dateDif = startDate.add(1, 'day').diff(currentDate, 'days');
    useEffect(() => {
        if (dateDif > 4) {
            setValidRefund(true);
            setRefundID(1);
        } else if (dateDif > 2) {
            setValidRefund(true);
            setRefundID(2);
        } else {
            setValidRefund(false);
            setRefundID(3);
        }
    }, [])

    const handlePress = () => {
        if (validRefund) {
            props.navigation.navigate("Cancel", { bookingID: ID, dateDif: dateDif, bookingDate: Date, Slot: Slot, VehicleNo: VehicleNo, refundID: refundID, startTime: StartTime, EndTime: EndTime, dateDif: dateDif, currentDate: (currentDate.format('YYYY-MM-DD')) });
        } else {
            props.navigation.navigate("RefundReq", { bookingID: ID, dateDif: dateDif, bookingDate: Date, Slot: Slot, VehicleNo: VehicleNo, refundID: refundID, startTime: StartTime, EndTime: EndTime, dateDif: dateDif, currentDate: (currentDate.format('YYYY-MM-DD')) });
        }
    }

    return (
        <View style={intStyles.detailsContainer}>
            <Text style={intStyles.slotTxt}>Slot <Text style={{ color: "#000" }}>{Slot}</Text></Text>
            <Text style={intStyles.vehicleNoTxt}>{VehicleNo}</Text>
            <Text style={intStyles.dateTimeTxt}>{Date} | {StartTime} to {EndTime}</Text>
            <TouchableOpacity style={intStyles.btn} onPress={handlePress}>
                <Text style={intStyles.btnTxt}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const intStyles = StyleSheet.create({
    selectSlotBtnTxt: {
        color: "#000",
        fontWeight: "800",
        fontSize: 12
    },

    selectSlotBtn: {
        width: 120,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#FAA41E",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    extendBtnTxt: {
        color: "#000",
        fontWeight: "800",
        fontSize: 16
    },

    extendBtn: {
        width: 93,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#FAA41E",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    btnReview: {
        width: 104,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#000",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    timerFine: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#F00"
    },

    timerExtend: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#A9A9A9"
    },

    timer: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#000"
    },

    timerTitleFine: {
        fontSize: 14,
        fontWeight: "600",
        color: "#F00"

    },

    timerTitleExtend: {
        fontSize: 14,
        fontWeight: "600",
        color: "#A9A9A9"

    },

    timerTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000"

    },

    btnTxt: {
        color: "#FFF",
        fontWeight: "800",
        fontSize: 16
    },

    btnDisabled: {
        width: 93,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#DCDCDC",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    btn: {
        width: 93,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#000",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    dateTimeTxt: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginTop: 3
    },

    vehicleNoTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000"
    },

    slotTxt: {
        fontSize: 24,
        fontWeight: "900",
        color: "#FAA41E"
    },

    detailsContainer: {
        width: "90%",
        alignSelf: "center",
        elevation: 8,
        backgroundColor: "#FFF",
        height: 125,
        marginBottom: 10,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },

    scrollContainer: {
        width: "100%",
        height: "42%",
    },

    scrollHeadingTxt: {
        fontSize: 14,
        color: "#000",
        fontWeight: "500",
    },

    scrollHeadingContainer: {
        height: "2.5%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
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
        alignItems: "center",
        marginTop: 10,
        height: "11%"
    },
});

export default MyBookings;