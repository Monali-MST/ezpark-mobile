import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, Alert } from "react-native";
import extStyles from "../styles/extStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import { server } from "../Service/server_con";
import AppLoader from "../Components/AppLoader";
import Button from "../Components/Button";

const BookSum = (props) => {

    const data = props.route.params;
    const [loading, setLoading] = useState(false);

    const [showError, setShowError] = useState(false);

    const [menuHeight, setMenuHeight] = useState(0);

    const [slotCharge, setSlotCharge] = useState(0);

    const [discountRate, setDiscountRate] = useState(0);

    const [discountValue, setDiscountValue] = useState(0);

    const [payableCharge, setPayableCharge] = useState(0);

    const [bookingDetails, setBookingDetails] = useState({
        date: "",
        fromTime: "",
        toTime: ""
    })

    const [selectData, setSelectData] = useState();

    const [selected, setSelected] = useState(null);

    const handleSelect = (value) => {
        setSelected(value);
    }

    useEffect(() => {
        const getDetails = async e => {
            const date = await AsyncStorage.getItem('date');
            const fromTime = await AsyncStorage.getItem('fromTime');
            const toTime = await AsyncStorage.getItem('toTime');
            const token = await AsyncStorage.getItem('AccessToken');
            const decoded = jwtDecode(token);
            setBookingDetails((prev) => ({ ...prev, date: date, fromTime: fromTime, toTime: toTime }));
            await axios.post(server + 'fetchVehicles', { 'userName': decoded.userName })
                .then(res => {
                    const updateSelectData = res.data.map((item, index) => {
                        return { key: String(index + 1), value: item.VehicleNo };
                    });
                    setMenuHeight(updateSelectData.length * 50);
                    setSelectData(updateSelectData);
                    bookingTimeMinutes(fromTime, toTime, decoded.userName);
                }).catch(err => { console.log(err) })
        }
        setLoading(true);
        getDetails();
    }, [])

    function bookingTimeMinutes(fromTime, toTime, userName) {
        const [hoursFT, minutesFT] = fromTime.split(':');
        const [hoursTT, minutesTT] = toTime.split(':');
        const diffInMinutes = (parseInt(hoursTT, 10) * 60 + parseInt(minutesTT, 10)) - (parseInt(hoursFT, 10) * 60 + parseInt(minutesFT, 10));
        setSlotCharge(((parseFloat(data.Price) / 60) * diffInMinutes).toFixed(2));
        getDiscount(userName);
    }

    async function getDiscount(userName) {
        await axios.post(server + 'fetchDiscounts', { "userName": userName })
            .then(res => {
                let newDiscount = 0;
                for (const getDiscount of res.data) {
                    newDiscount = newDiscount + parseInt(getDiscount.Discount);
                }
                setDiscountRate(newDiscount.toFixed(2));
            })
    }

    useEffect(() => {
        setDiscountValue((slotCharge * ((discountRate) / 100)).toFixed(2))
        setPayableCharge((slotCharge - (slotCharge * ((discountRate) / 100))).toFixed(2));
        setLoading(false);
    }, [discountRate]);

    const handlePress = async e => {
        if(selected==null){
            setShowError(true);
        }else{
            setShowError(false);
            console.log(selected);
            props.navigation.navigate("Payment");
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            {/* <View style={{height: "100%", position: "absolute", width: "100%", zIndex: 100}}> */}
            <View style={intStyles.titleContainer}>
                <Text style={intStyles.title}>{data.Slot} Slot</Text>
            </View>
            <View style={intStyles.bookingDetailsContainer}>
                <Text style={intStyles.bookingDetails}>You have booked slot {data.Slot} from {bookingDetails.fromTime} to {bookingDetails.toTime} on {bookingDetails.date}.</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require("./../src/assets/front_car.png")} style={intStyles.image} />
            </View>
            <View style={intStyles.menuContainer}>
                <Text style={intStyles.menuTitle}>Select vehicle number</Text>
                <View style={intStyles.listContainer}>
                    <SelectList data={selectData} save="value" setSelected={(value) => handleSelect(value)} boxStyles={intStyles.boxStyles} search={false} dropdownTextStyles={intStyles.dropdownTextStyles} placeholderTextColor="#A5A5A5" placeholder="Select vehicle" dropdownStyles={{ backgroundColor: "#FFF", height: menuHeight }} inputStyles={intStyles.inputStyles}/>
                </View>
            </View>
            {/* </View> */}
            {/* <View style={{marginTop: 500}}> */}
            <View style={intStyles.paymentContainer}>
                <View style={intStyles.paymentItemContainer}>
                    <Text style={intStyles.paymentText}>
                        Slot Charge
                    </Text>
                    <Text style={intStyles.paymentText}>
                        Discount({discountRate}%)
                    </Text>
                    <Text style={{ ...intStyles.paymentText, ...{ fontWeight: "900" } }}>
                        Total Payable
                    </Text>
                </View>
                <View style={intStyles.paymentAmountContainer}>
                    <Text style={intStyles.paymentText}>
                        {slotCharge}
                    </Text>
                    <Text style={intStyles.paymentText}>
                        -{discountValue}
                    </Text>
                    <Text style={{ ...intStyles.paymentText, ...{ fontWeight: "900" } }}>
                        {payableCharge}
                    </Text>
                </View>
            </View>
            <View style={intStyles.errorContainer}>
                {showError ? <Text style={intStyles.errTxt}>Please select the vehicle</Text> : null}
            </View>
            <View style={intStyles.buttonContainer}>
                <Button title={"Proceed to payment"} onPress={() => handlePress()} />
            </View>
            {loading ? <AppLoader /> : null}
            {/* </View> */}
        </SafeAreaView>
    );
}

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
        marginTop: 70
    },

    buttonContainer: {
        width: "90%",
        alignSelf: "center",
    },

    paymentText: {
        fontSize: 20,
        fontWeight: "500",
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
        height: 118,
        borderWidth: 2,
        borderColor: "#7D7E7E",
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#FFF",
    },

    inputStyles: {
        fontSize: 19,
    },

    dropdownTextStyles: {
        color: "#000",
        fontSize: 20,
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


export default BookSum;