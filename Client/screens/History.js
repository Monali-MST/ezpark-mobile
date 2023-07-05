import React from "react";
import {StyleSheet, SafeAreaView, View, Text, ScrollView} from "react-native";
import extStyles from "../styles/extStyles";
import Octicons from "react-native-vector-icons/Octicons";

const History = (props) => {
    return(
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <Octicons name="history" size={70} color={"#FAA41E"}/>
                <Text style={intStyles.itle}>Booking{'\n'}History</Text>
            </View>
            <View style={intStyles.scrollContainer}>
                <ScrollView style={{height: "100%", width: "100%"}} showsVerticalScrollIndicator={false}>
                    <CompleteBooking/>
                    <CanceledBooking/>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const CompleteBooking = () => {
    return(
        <View style={intStyles.itemContainer}>
            <Text style={intStyles.bookingIdTxt}>Booking ID <Text style={{color: "#000"}}>147</Text></Text>
            <Text style={intStyles.subTxt}>Date & Time <Text style={{color: "#000"}}>2023/06/23 | 12:00:00 - 13:00:00</Text></Text>
            <Text style={intStyles.subTxt}>Booked Slot <Text style={{color: "#000"}}>A-3</Text></Text>
            <Text style={intStyles.subTxt}>Paid Amount <Text style={{color: "#000"}}>1100.00</Text></Text>
        </View>
    );
}

const CanceledBooking = () => {
    return(
        <View style={{...intStyles.itemContainer,...{backgroundColor: "#FFD6D6"}}}>
            <View style={{width: "100%", flexDirection: "row"}}>
                <Text style={intStyles.bookingIdTxt}>Booking ID <Text style={{color: "#000"}}>147</Text></Text>
                <View style={{width: "50%"}}>
                    <Text style={intStyles.cancelledTxt}>Cancelled</Text>
                </View>
            </View>
            <Text style={intStyles.subTxt}>Date & Time <Text style={{color: "#000"}}>2023/06/23 | 12:00:00 - 13:00:00</Text></Text>
            <Text style={intStyles.subTxt}>Booked Slot <Text style={{color: "#000"}}>A-3</Text></Text>
            <Text style={intStyles.subTxt}>Paid Amount <Text style={{color: "#000"}}>1100.00</Text></Text>
            <Text style={intStyles.subTxt}>Refunded Amount <Text style={{color: "#000"}}>1100.00</Text></Text>
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
        backgroundColor: "#FFF",
        borderRadius: 10,
        elevation: 8,
        alignSelf: "center",
        marginBottom: 8,
        marginTop: 5,
        padding: 10
    },

    scrollContainer: {
        padding: 10,
        height: "100%",
        width: "100%",
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