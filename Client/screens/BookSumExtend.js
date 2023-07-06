import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, Alert } from "react-native";
import extStyles from "../styles/extStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import { server } from "../Service/server_con";
import AppLoader from "../Components/AppLoader";
import Button from "../Components/Button";
import moment from "moment-timezone";

const BookSumExtend = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [slotPrice, setSlotPrice] = useState();
    const [timeDiff, setTimeDiff] = useState();
    const [slotID, setSlotID] = useState();

    const [times, setTimes] = useState({
        startTime: "",
        endTime: ""
    });

    const data = props.route.params;

    useEffect(() => {
        async function getPrice(SlotId) {
            const response = await axios.post(server + 'slotPrice', { "slotId": SlotId });
            if (response.data != 100 && response.data != 404) {
                setSlotPrice(response.data / 60);
            } else {
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        }
        setLoading(true);
        setTimes((prev) => ({ ...prev, startTime: moment(data.startTime).format("HH:mm:ss"), endTime: moment(data.endTime).format("HH:mm:ss") }));

        setTimeDiff(moment(data.endTime).diff(moment(data.startTime), "minutes"));

        let SlotId = data.slot;
        if (SlotId.charAt(0) === "D") {
            SlotId = parseInt(SlotId.slice(2)) + 42;
        } else if (SlotId.charAt(0) === "C") {
            SlotId = parseInt(SlotId.slice(2)) + 28;
        } else if (SlotId.charAt(0) === "B") {
            SlotId = parseInt(SlotId.slice(2)) + 14;
        } else if (SlotId.charAt(0) === "A") {
            SlotId = parseInt(SlotId.slice(2));
        }

        getPrice(SlotId);
        setSlotID(SlotId);
    }, [])

    useEffect(() => {
        setLoading(false);
    }, [slotPrice]);

    const handleSubmit = async e => {
        const token = await AsyncStorage.getItem('AccessToken');
        const decoded = jwtDecode(token);
        const values = { "Date": data.date, "StartTime": times.startTime, "EndTime": times.endTime, "VehicleNo": data.VehicleNo, "BookingMethod": "online", "slot": slotID, "user_email": decoded.userName };
        try {
            let response = await axios.post(server + 'tempBooking', values);
            if (response.data == 200) {
                const formattedAmount = Number(timeDiff * slotPrice * 1.5).toFixed(0);
                response = await axios.post(server + 'paymentIntent', {"amount":formattedAmount, "userName":decoded.userName});
                if(response.data!=100){
                    if(!response.error){
                        props.navigation.reset({
                            index: 0,
                            routes: [{
                            name: 'PaymentExtend',
                            params: {SlotCharge: (timeDiff * slotPrice * 1.5).toFixed(2),
                                Discount: 0,
                                Total: (timeDiff * slotPrice * 1.5).toFixed(2),
                                rate: 0,
                                intent: response.data.paymentIntent,
                                date: data.date,
                                startTime: times.startTime,
                                endTime: times.endTime,
                                vehicleNo: data.VehicleNo,
                                slot: slotID,
                                userName: decoded.userName,
                                timeDiff: timeDiff,
                                bookingId: data.bookingId
                            }
                        }],    
                        });
                    }else{
                        console.log(response.error)
                        setErrTitle("Oops...!!");
                        setErrContent("Something went wrong");
                        setLoading(false);
                        setError(true);
                    }
                }else{
                    setErrTitle("Oops...!!");
                    setErrContent("Something went wrong");
                    setLoading(false);
                    setError(true);
                }
            } else if (response.data == 100) {
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        } catch (err) {
            console.log(err)
            setErrTitle("Oops...!!");
            setErrContent("Something went wrong");
            setLoading(false);
            setError(true);
        }
    };

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <Text style={intStyles.title}>{data.slot} Slot</Text>
            </View>
            <View style={intStyles.bookingDetailsContainer}>
                <Text style={intStyles.bookingDetails}>You have extended the booking time from {times.startTime} to {times.endTime}</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require("./../src/assets/front_car.png")} style={intStyles.image} />
            </View>
            <View style={intStyles.paymentContainer}>
                <View style={intStyles.paymentItemContainer}>
                    <Text style={intStyles.paymentText}>
                        Extend Charge
                    </Text>
                </View>
                <View style={intStyles.paymentAmountContainer}>
                    <Text style={intStyles.paymentText}>
                        {(timeDiff * slotPrice * 1.5).toFixed(2)}
                    </Text>
                </View>
            </View>
            <View style={intStyles.messageContainer}>
                <Text style={intStyles.messageTitle}>IMPORTANT</Text>
                <View style={intStyles.subMsgContainer}>
                    <Text style={intStyles.message}>
                        Price per extended booking will be 50% higher than the normal price.
                    </Text>
                </View>
            </View>
            <View style={intStyles.buttonContainer}>
                <Button title={"Proceed to payment"} onPress={handleSubmit} />
            </View>
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
    message: {
        fontSize: 15,
        color: "#000",
        textAlign: "center",
        fontWeight: "400"
    },

    subMsgContainer: {
        width: "90%",
        alignSelf: "center",
        borderColor: "#F00",
        borderWidth: 2,
        borderRadius: 15,
        height: 80,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    messageTitle: {
        color: "#F00",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center"
    },

    messageContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },

    buttonContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 70
    },

    paymentText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#7D7E7E",
        marginTop: 8,
        marginLeft: 10
    },

    paymentAmountContainer: {
        width: "30%",
        height: "100%",
        alignItems: "flex-end",
        paddingRight: 10,
    },

    paymentItemContainer: {
        width: "70%",
        height: "100%",
    },

    paymentContainer: {
        width: "95%",
        alignSelf: "center",
        height: 50,
        borderWidth: 2,
        borderColor: "#7D7E7E",
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#FFF",
    },

    boxStyles: {
        height: 50,
        alignSelf: "baseline",
        width: "100%",
        borderWidth: 1,
        borderColor: "#212121",
        backgroundColor: "#fff"
    },

    listContainer: {
        height: 50,
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 10,
    },

    menuTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },

    menuContainer: {
        marginVertical: 20,
        width: "95%",
        alignSelf: "center",
        height: "15%",
        backgroundColor: "#FAA41E",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
    },

    image: {
        resizeMode: "contain",
        width: "90%",
        height: "90%"
    },

    imageContainer: {
        height: "25%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    bookingDetails: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        color: "#000"
    },

    bookingDetailsContainer: {
        paddingHorizontal: 10,
        height: "5%"
    },

    title: {
        fontSize: 48,
        fontWeight: "900",
        color: "#FAA41E"
    },

    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "10%",
    }
});


export default BookSumExtend;