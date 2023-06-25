import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput } from "react-native";
import extStyles from "../styles/extStyles";
import axios from "axios";
import { server } from "../Service/server_con";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import AppLoader from "../Components/AppLoader";
import Button from '../Components/Button';
import Button_Cancel from "../Components/Button_Cancel";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from "../Global/Variable";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";


const RefundReq = (props) => {

    const data = props.route.params;

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);


    const [respondData, setRespondData] = useState(0);
    const [refundAmount, setRefundAmount] = useState(0);

    const [timeDiff, setTimeDiff] = useState(0);

    useEffect(() => {
        async function getRefundRate() {
            try {
                const response = await axios.post(server + 'refundDetails', { refundId: data.refundID, bookingID: data.bookingID })
                setRespondData(response.data);
                setRefundAmount(response.data[0] * (response.data[1] / 100));
                setLoading(false);
            } catch (err) {
                console.log(err)
            }
        }
        setLoading(true);
        setTimeDiff(moment(data.EndTime, 'HH:mm:ss').diff(moment(data.startTime, 'HH:mm:ss'), 'minutes'));
        getRefundRate();
    }, [])

    const handleClick = async e => {
        setLoading(true);
        const token = await AsyncStorage.getItem('AccessToken');
        const decoded = jwtDecode(token);
        const values = { "bookingID": data.bookingID, "Date": data.currentDate, "reason": request,   "userName": decoded.userName };
        await axios.post(server + 'cancelRequest', values)
            .then((res) => {
                if (res.data == 200) {
                    props.navigation.reset({
                        index: 0,
                        routes: [{
                            name: 'RefundSuccess',
                            params: { Message: "Refund request succefully recorded" }
                        }]
                    })
                } else {
                    setErrTitle("Oops...!!");
                    setErrContent("Something went wrong");
                    setLoading(false);
                    setError(true);
                }
            })
    }

    const [request, setRequest] = useState('');

    const handleChangeText = (value) => {
        setRequest(value);
    };

    const characterCount = request.length;

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Material name="book-cancel" size={82} color={"#FAA41E"} style={intStyles.icon} />
                <Text style={intStyles.title}>Booking{'\n'}Cancellation</Text>
            </View>
            <View style={intStyles.headingContainer}>
                <Text style={intStyles.heading}>Booking details</Text>
            </View>
            <View style={intStyles.detailsContanier}>
                <View style={intStyles.itemContiner}>
                    <Text style={intStyles.item}>Booking ID</Text>
                    <Text style={intStyles.item}>Slot</Text>
                    <Text style={intStyles.item}>Vehicle No.</Text>
                    <Text style={intStyles.item}>Booked Date</Text>
                    <Text style={intStyles.item}>Start Time</Text>
                    <Text style={intStyles.item}>End Time</Text>
                    <Text style={intStyles.item}>Amount Paid</Text>
                    <Text style={intStyles.item}>Refund Rate</Text>
                    <Text style={{ ...intStyles.item, ...{ fontWeight: "bold", fontSize: 18 } }}>Amount to be refunded</Text>
                </View>
                <View style={intStyles.valueContainer}>
                    <Text style={intStyles.value}>{data.bookingID}</Text>
                    <Text style={intStyles.value}>{data.Slot}</Text>
                    <Text style={intStyles.value}>{data.VehicleNo}</Text>
                    <Text style={intStyles.value}>{data.bookingDate}</Text>
                    <Text style={intStyles.value}>{data.startTime}</Text>
                    <Text style={intStyles.value}>{data.EndTime}</Text>
                    <Text style={intStyles.value}>{Number(respondData[1]).toFixed(2)}</Text>
                    <Text style={intStyles.value}>{respondData[0]}%</Text>
                    <Text style={{ ...intStyles.item, ...{ fontWeight: "bold", fontSize: 18 } }}>{refundAmount.toFixed(2)}</Text>
                </View>
            </View>
            <View style={intStyles.inputContainer}>
                <TextInput value={request} onChangeText={handleChangeText} style={intStyles.input} multiline numberOfLines={4} maxLength={250} placeholder="Enter your reason here" textAlignVertical="top" />
            </View>
            <Text style={intStyles.characterCount}>
                {characterCount}/250
            </Text>
            <View style={intStyles.messageContainer}>
                <Text style={intStyles.messageTitle}>IMPORTANT</Text>
                <View style={intStyles.subMsgContainer}>
                    <Text style={intStyles.message}>
                        This booking is cancelled prior {data.dateDif} days from the
                        booked date. As a result, no refund ({respondData[0]}%) will
                        be issued.{'\n'}A request for a refund can be sent. Only reasonable
                        requests will be considered, and a refund will be issued.
                    </Text>
                </View>
            </View>
            <View style={intStyles.btnContainer}>
                <Button title="Refund Request" onPress={handleClick} />
            </View>
            <View style={{ ...intStyles.btnContainer, ...{ marginTop: 20 } }}>
                <Button_Cancel title="Cancel" onPress={() => props.navigation.navigate("MyBookings")} />
            </View>
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
            {loading ? <AppLoader /> : null}
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
    characterCount: {
        alignSelf: 'flex-end',
        color: 'gray',
        marginRight: 20
      },
    input: {
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 10,
        height: "90%",
        fontSize: 18,
        fontWeight: "400",
        color: "#000"
    },

    inputContainer: {
        width: "100%",
        height: 130,
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: "center"
    },

    btnContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20
    },

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
        height: 130,
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
    },

    value: {
        fontSize: 16,
        color: "#000",
        fontWeight: "300",
    },

    item: {
        fontSize: 16,
        color: "#000",
        fontWeight: "400",
    },

    valueContainer: {
        width: "40%",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingHorizontal: 20
    },

    itemContiner: {
        width: "60%",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 20
    },

    detailsContanier: {
        width: "100%",
        flexDirection: "row"
    },

    heading: {
        fontSize: 16,
        color: "#000",
        fontWeight: "700",
        marginLeft: 10,
        textAlign: "center"
    },

    headingContainer: {
        width: "100%"
    },

    icon: {
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
        marginTop: 10
    },
})

export default RefundReq;