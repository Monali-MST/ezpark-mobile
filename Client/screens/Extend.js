import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, Pressable } from "react-native";
import extStyles from "../styles/extStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../Components/Button";
import Button_Cancel from "../Components/Button_Cancel";
import moment from "moment-timezone";


const Extend = props => {

    const [showError, setShowError] = useState(false);

    const data = props.route.params;

    const [selected, setSelected] = useState({
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false
    });

    const handlePressed = (name) => {
        setShowError(false);
        setSelected((prev) => ({ ...prev, btn1: false, btn2: false, btn3: false, btn4: false }));
        setSelected((prev) => ({ ...prev, [name]: true }));
    };

    const handleClick = () => {
        if (selected.btn1 || selected.btn2 || selected.btn3 || selected.btn4) {
            let endTime = "";
            if (selected.btn1) {
                endTime = moment(data.startTime).add(30, "minutes");
            } else if (selected.btn2) {
                endTime = moment(data.startTime).add(1, "hours");
            } else if (selected.btn3) {
                endTime = moment(data.startTime).add(90, "minutes");
            } else if (selected.btn4) {
                endTime = moment(data.startTime).add(2, "hours");
            }
            const values = { bookingId: data.bookingId, date: data.date, startTime: data.startTime, endTime: String(endTime), slot: data.slot, VehicleNo: data.VehicleNo };
            props.navigation.navigate("BookSumExtend", values);
        } else {
            setShowError(true);
        }
    };

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <Ionicons name="timer-outline" size={80} color={'#FAA41E'} />
                <Text style={intStyles.titleTxt}>Extend Booking{'\n'}Time</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require("../src/assets/Deadline-pana.png")} style={intStyles.image} />
            </View>
            <View style={intStyles.headingContainer}>
                <Text style={intStyles.heading}>Select The Extend Time That You Want</Text>
            </View>
            <View style={{ ...intStyles.btnContainer, ...{ marginTop: 10 } }}>
                <View style={intStyles.btnDevider}>
                    <Pressable style={selected.btn1 ? intStyles.btnPressed : intStyles.btn} onPress={() => handlePressed("btn1")}>
                        <Text style={intStyles.btnText}>30 Minutes</Text>
                    </Pressable>
                </View>
                <View style={intStyles.btnDevider}>
                    <Pressable style={selected.btn2 ? intStyles.btnPressed : intStyles.btn} onPress={() => handlePressed("btn2")}>
                        <Text style={intStyles.btnText}>1 Hour</Text>
                    </Pressable>
                </View>
            </View>
            <View style={intStyles.btnContainer}>
                <View style={intStyles.btnDevider}>
                    <Pressable style={selected.btn3 ? intStyles.btnPressed : intStyles.btn} onPress={() => handlePressed("btn3")}>
                        <Text style={intStyles.btnText}>1 Hour 30 Mins</Text>
                    </Pressable>
                </View>
                <View style={intStyles.btnDevider}>
                    <Pressable style={selected.btn4 ? intStyles.btnPressed : intStyles.btn} onPress={() => handlePressed("btn4")}>
                        <Text style={intStyles.btnText}>2 Hours</Text>
                    </Pressable>
                </View>
            </View>
            <View style={intStyles.errorContainer}>
                {showError ? <Text style={intStyles.errTxt}>Please select the extend time</Text> : null}
            </View>
            <View style={intStyles.btnContainer2}>
                <Button title="Proceed to Extend" onPress={handleClick} />
            </View>
            <View style={{ ...intStyles.btnContainer2, ...{ marginTop: 20 } }}>
                <Button_Cancel title="Cancel" onPress={() => props.navigation.navigate("MyBookings")} />
            </View>
        </SafeAreaView>
    );
};


const intStyles = StyleSheet.create({
    errTxt: {
        color: "#F00",
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10
    },

    errorContainer: {
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 60
    },

    btnContainer2: {
        width: "90%",
        alignSelf: "center",
    },

    btnText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000"
    },

    btnPressed: {
        width: "80%",
        height: "90%",
        backgroundColor: "#FAA41E",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#FAA41E",
        elevation: 5
    },

    btn: {
        width: "80%",
        height: "90%",
        backgroundColor: "#FFF",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#000",
    },

    btnDevider: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },

    btnContainer: {
        width: "100%",
        flexDirection: "row",
        marginTop: 10
    },

    heading: {
        color: "#000",
        fontWeight: "500",
        fontSize: 16,
        marginTop: 10
    },

    headingContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },

    image: {
        resizeMode: "contain",
        height: "100%",
        width: "100%"
    },

    imageContainer: {
        width: "100%",
        height: 200,
        paddingHorizontal: 10
    },

    titleTxt: {
        fontSize: 36,
        fontWeight: "900",
        color: "#FAA41E",
        lineHeight: 40,
        marginHorizontal: 10
    },
    titleContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 10
    }
})

export default Extend;