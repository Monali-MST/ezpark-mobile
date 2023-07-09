import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
import extStyles from "../styles/extStyles";
import Octicons from "react-native-vector-icons/Octicons";
import { server } from "../Service/server_con";
import axios from "axios";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import moment from "moment-timezone";

const History = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [fetchData, setFetchData] = useState([]);

    useEffect(() => {
        const getData = async e => {
            try {
                const token = await AsyncStorage.getItem('AccessToken');
                const decoded = jwtDecode(token);
                const response = await axios.post(server + 'bookHistory', { "UserName": decoded.userName });
                if (response.data == 404) {

                } else if (response.data == 100) {
                    setErrTitle("Oops...!!");
                    setErrContent("Something went wrong");
                    setLoading(false);
                    setError(true);
                } else {
                    setFetchData(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        }
        setLoading(true);
        getData();
    }, [])

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <Octicons name="history" size={70} color={"#FAA41E"} />
                <Text style={intStyles.itle}>Booking{'\n'}History</Text>
            </View>
            <View style={intStyles.scrollContainer}>
                <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
                    {fetchData.map((item, index)=>(
                        (item.cancel==0) ? (
                            <CompleteBooking key={index} bookingID={item.BookingID} Date={moment(item.BookedDate).format('YYYY-MM-DD')} startTime={item.StartTime} endTime={item.EndTime} slotID={item.slot} charge={item.PaymentAmount} vehicleNo={item.VehicleNo}/>
                        ) : (item.cancel==1 && item.Refund_amount==null) ? (
                            <RequestedCancelling key={index} bookingID={item.BookingID} Date={moment(item.BookedDate).format('YYYY-MM-DD')} startTime={item.StartTime} endTime={item.EndTime} slotID={item.slot} charge={item.PaymentAmount} vehicleNo={item.VehicleNo}/>
                        ) : 
                            <CanceledBooking key={index} bookingID={item.BookingID} Date={moment(item.BookedDate).format('YYYY-MM-DD')} startTime={item.StartTime} endTime={item.EndTime} slotID={item.slot} charge={item.PaymentAmount} vehicleNo={item.VehicleNo} refundedAmount={item.Refund_amount}/>
                    ))}
                </ScrollView>
            </View>
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
            {loading ? <AppLoader /> : null}
        </SafeAreaView>
    );
}

const RequestedCancelling = ({bookingID, Date, startTime, endTime, slotID, charge, vehicleNo}) => {
    let slot;
    console.log(slotID);
    if(slotID>=43){
        slot = "D-"+(slotID-42);
    }else if(slotID>=29){
        slot = "C-"+(slotID-28);
    }else if(slotID>=15){
        slot = "B-"+(slotID-14);
    }else{
        slot = "A-"+slotID;
    }
    return(
        <View style={{ ...intStyles.itemContainer, ...{ backgroundColor: "#FFEEEE" } }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
                <View  style={{ width: "60%" }}>
                    <Text style={intStyles.bookingIdTxt}>Booking ID <Text style={{ color: "#000" }}>{bookingID}</Text></Text>
                </View> 
                <View style={{ width: "40%" }}>
                    <Text style={intStyles.cancelledTxt}>Cancelled{'\n'}<Text style={{fontSize:14}}>(Refund Requested)</Text></Text>
                </View>
            </View>
            <Text style={intStyles.subTxt}>Date & Time <Text style={{ color: "#000" }}>{Date} | {startTime} - {endTime}</Text></Text>
            <View style={{width:"100%", flexDirection: "row"}}>
                <View style={{width:"40%"}}>
                    <Text style={intStyles.subTxt}>Booked Slot <Text style={{ color: "#000" }}>{slot}</Text></Text> 
                </View>
                <View style={{width:"60%"}}>
                    <Text style={intStyles.subTxt}>Vehicle No <Text style={{ color: "#000" }}>{vehicleNo}</Text></Text> 
                </View>
            </View>
            <Text style={intStyles.subTxt}>Paid Amount <Text style={{ color: "#000" }}>{Number(charge).toFixed(2)}</Text></Text>
        </View>
    );
}

const CompleteBooking = ({bookingID, Date, startTime, endTime, slotID, charge, vehicleNo}) => {
    let slot;
    console.log(slotID);
    if(slotID>=43){
        slot = "D-"+(slotID-42);
    }else if(slotID>=29){
        slot = "C-"+(slotID-28);
    }else if(slotID>=15){
        slot = "B-"+(slotID-14);
    }else{
        slot = "A-"+slotID;
    }
    return (
        <View style={intStyles.itemContainer}>
            <View style={{ width: "100%", flexDirection: "row" }}>
                <View  style={{ width: "60%" }}>
                    <Text style={intStyles.bookingIdTxt}>Booking ID <Text style={{ color: "#000" }}>{bookingID}</Text></Text>
                </View> 
                <View style={{ width: "40%" }}>
                    <Text style={{...intStyles.cancelledTxt,...{color: "#558B2F"}}}>Completed</Text>
                </View>
            </View>
            <Text style={intStyles.subTxt}>Date & Time <Text style={{ color: "#000" }}>{Date} | {startTime} - {endTime}</Text></Text>
            <View style={{width:"100%", flexDirection: "row"}}>
                <View style={{width:"40%"}}>
                    <Text style={intStyles.subTxt}>Booked Slot <Text style={{ color: "#000" }}>{slot}</Text></Text> 
                </View>
                <View style={{width:"60%"}}>
                    <Text style={intStyles.subTxt}>Vehicle No <Text style={{ color: "#000" }}>{vehicleNo}</Text></Text> 
                </View>
            </View>
            <Text style={intStyles.subTxt}>Paid Amount <Text style={{ color: "#000" }}>{Number(charge).toFixed(2)}</Text></Text>
        </View>
    );
}

const CanceledBooking = ({bookingID, Date, startTime, endTime, slotID, charge, vehicleNo, refundedAmount}) => {
    let slot;
    console.log(slotID);
    if(slotID>=43){
        slot = "D-"+(slotID-42);
    }else if(slotID>=29){
        slot = "C-"+(slotID-28);
    }else if(slotID>=15){
        slot = "B-"+(slotID-14);
    }else{
        slot = "A-"+slotID;
    }
    return (
        <View style={{ ...intStyles.itemContainer, ...{ backgroundColor: "#FFEEEE" } }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
                <View  style={{ width: "70%"}}>
                    <Text style={intStyles.bookingIdTxt}>Booking ID <Text style={{ color: "#000" }}>{bookingID}</Text></Text>
                </View>
                <View style={{ width: "30%" }}>
                    <Text style={intStyles.cancelledTxt}>Cancelled</Text>
                </View>
            </View>
            <Text style={intStyles.subTxt}>Date & Time <Text style={{ color: "#000" }}>{Date} | {startTime} - {endTime}</Text></Text>
            <View style={{width:"100%", flexDirection: "row"}}>
                <View style={{width:"40%"}}>
                    <Text style={intStyles.subTxt}>Booked Slot <Text style={{ color: "#000" }}>{slot}</Text></Text> 
                </View>
                <View style={{width:"60%"}}>
                    <Text style={intStyles.subTxt}>Vehicle No <Text style={{ color: "#000" }}>{vehicleNo}</Text></Text> 
                </View>
            </View>
            <Text style={intStyles.subTxt}>Paid Amount <Text style={{ color: "#000" }}>{Number(charge).toFixed(2)}</Text></Text>
            <Text style={intStyles.subTxt}>Refunded Amount <Text style={{ color: "#000" }}>{Number(refundedAmount).toFixed(2)}</Text></Text>
        </View>
    );
}

const intStyles = StyleSheet.create({
    cancelledTxt: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#F00",
        textAlign: "right"
    },

    subTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FAA41E"
    },

    bookingIdTxt: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#FAA41E"
    },

    itemContainer: {
        width: "98%",
        height: 140,
        backgroundColor: "#F1F8E9",
        borderRadius: 10,
        elevation: 8,
        alignSelf: "center",
        marginBottom: 15,
        marginTop: 5,
        padding: 10,
        justifyContent: "center"
    },

    scrollContainer: {
        padding: 10,
        flex: 1
    },

    itle: {
        fontSize: 36,
        fontWeight: "900",
        color: "#FAA41E",
        lineHeight: 40,
        marginLeft: 10
    },

    titleContainer: {
        width: "100%",
        flexDirection: "row",
        padding: 10
    }
});

export default History;