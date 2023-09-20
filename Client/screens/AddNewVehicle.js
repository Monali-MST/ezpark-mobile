import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, Alert, TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import extStyles from "../styles/extStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "../Components/Button";
import axios from "axios";
import { server } from "../Service/server_con";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';

const AddNewVehicle = props => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const data = [
        { label: '1', value: 'Car' },
        { label: '2', value: 'Van' },
        { label: '3', value: 'Lorry' },
        { label: '4', value: 'Cab' },
    ];

    const [errors, setErrors] = useState({
        vNoBColor: "#212121",
        vTypeBColor: "#212121",
        errText: "",
    });

    const [vehicleNo, setVehicleNo] = useState("");

    const handleSelect = (value) => {
        setSelected(value);
    };

    const [selected, setSelected] = useState("");

    const isValid = () => {
        setErrors((prev)=>({...prev, valid: true}));
        if (selected == "" && vehicleNo == "") {
            setErrors((prev) => ({ ...prev, vNoBColor: "#F00", vTypeBColor: "#F00", errText: "Please input vehcle number and select vehicle type" }));
            return false;
        } else if (selected != "" && vehicleNo == "") {
            setErrors((prev) => ({ ...prev, vNoBColor: "#F00", vTypeBColor: "#68BB59", errText: "Please input vehcle number" }));
            return false;
        } else if (selected == "" && vehicleNo != "") {
            setErrors((prev) => ({ ...prev, vNoBColor: "#68BB59", vTypeBColor: "#F00", errText: "Please select the vehcle type" }));
            return false;
        } else if (vehicleNo.length < 10 || vehicleNo.length > 11) {
            setErrors((prev) => ({ ...prev, vNoBColor: "#F00", vTypeBColor: "#68BB59", errText: "Invalid vehicle number! Eg:WP TA-5334" }));
            return false;
        } else {
            setErrors((prev) => ({ ...prev, vNoBColor: "#68BB59", vTypeBColor: "#68BB59", errText: "" }));
            return true;
        }
    };

    const [showError, setShowError] = useState(false);

    const handleSubmit = async () =>{
        if(isValid()){
            setLoading(true);
            const token = await AsyncStorage.getItem('AccessToken');
            const decoded = jwtDecode(token);
            const response = await axios.post(server + 'addNewVehicle', {"vehicleNo":vehicleNo, "vehicleType": selected, "userName":decoded.userName});
            if(response.data==200){
                props.navigation.navigate("Dashboard");
            }else{
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        }else{
            setShowError(true);
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Ionicons name="md-car-sport-sharp" color={"#FAA41E"} size={82} style={intStyles.icon} />
                <Text style={intStyles.title}>Add New{'\n'}Vehicle</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require("../src/assets/front_car.png")} style={intStyles.image} />
            </View>
            <View style={intStyles.inputConatiner}>
                <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start", borderColor: errors.vNoBColor } }}>
                    <TextInput placeholder={"Vehicle No."} onChangeText={(value) => setVehicleNo(value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    <View style={{ width: "100%" }}>
                        <SelectList setSelected={(value) => handleSelect(value)} placeholder={"Vehicle Type"} boxStyles={{ ...intStyles.boxStyles, ...{ borderColor: errors.vTypeBColor } }} dropdownTextStyles={intStyles.dropdownTextStyles} dropdownStyles={{ height: 200, backgroundColor: "#FFF" }} inputStyles={intStyles.inputStyles} search={false} data={data} save="value4" />
                    </View>
                </View>
            </View>
            <View style={intStyles.errContainer}>
                <Text style={intStyles.errText}>{errors.errText}</Text>
            </View>
            <View style={intStyles.btnContainer}>
                {<Button title={"Add"} onPress={() => handleSubmit()}/>}
            </View>
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
        </SafeAreaView>
    );
};

const intStyles = StyleSheet.create({
    errText: {
        fontSize: 15,
        color: "#F00",
        fontWeight: "bold"
    },

    errContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        marginTop: 100
    },

    btnContainer: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        paddingHorizontal: 10
    },

    boxStyles: {
        height: 50,
        alignSelf: "baseline",
        width: "100%",
        borderWidth: 1,
        borderColor: "#212121",
        marginTop: 10,
        backgroundColor: "#FFF"
    },

    dropdownTextStyles: {
        color: "#000",
        fontSize: 20,
    },

    inputStyles: {
        fontSize: 19,
    },

    formInput: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#212121",
        borderRadius: 10,
        marginHorizontal: 10,
        height: 50,
        width: "90%",
        alignSelf: "center",
        marginTop: 10
    },

    inputText: {
        fontSize: 20,
        color: "#212121",
        width: "95%",
        marginHorizontal: "2.5%"
    },

    inputConatiner: {
        width: "100%",
        paddingHorizontal: 20,
        height: 130,
        marginTop: 20,
        zIndex: 1
    },

    image: {
        resizeMode: "contain",
        width: "100%",
        height: "100%"
    },

    imageContainer: {
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10
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
        paddingTop: 10,
        height: "11%"
    },
});

export default AddNewVehicle;