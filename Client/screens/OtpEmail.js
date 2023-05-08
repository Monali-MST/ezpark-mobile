import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert, Pressable, TextInput } from "react-native";
import extStyles from '../styles/extStyles';
import {server} from '../Service/server_con';
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Components/Button";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import AppLoader from "../Components/AppLoader";

const OtpEmail = props => {

    //Array for the user details
    const [users, setUsers] = useState({
        Fname: '',
        Lname: '',
        AddFLine: '',
        AddSLine: '',
        Street: '',
        City: '',
        PCode: '',
        MobNum: '',
        FixedNum: '',
        Nic: '',
        Email: '',
        Pword: '',
    });

    //Array for the vehicle details
    const [vehicle, setVehicle] = useState([{
        VehicleNo: '',
        Type: '',
        Email: ''
    },
    {
        VehicleNo: '',
        Type: '',
        Email: ''
    },
    {
        VehicleNo: '',
        Type: '',
        Email: ''
    },
    {
        VehicleNo: '',
        Type: '',
        Email: ''
    },
    {
        VehicleNo: '',
        Type: '',
        Email: ''
    }
    ]);

    const [OtpVal, setOtpVal] = useState(''); //State variable for the get user entered OTP value
    const [Email, setEmail] = useState(''); //State variable for the get user entered Email
    const [GenVal, setGenVal] = useState(''); //State variable for the get generated OTP value from EncryptedStorage
    const [loading, setLoading] = useState(false); //State variable for the loading screen


    const handleChange = (text) => {
        setOtpVal(text); //Set OTP value to OtpVal state variable
    }

    useEffect(() => {
        async function getEmail() {
            //Get user entered Email from Asyncstorage and set it to Email state varible 
            setEmail(await AsyncStorage.getItem('Email')); 

            //Get generated OTP value from Encryptedstorage and set it to Email state varible 
            setGenVal(await EncryptedStorage.getItem('OTP')); 
        };

        //Get user registartion details to the users array from the AsyncStorage
        async function getUser() {
            setUsers({
                Fname: await AsyncStorage.getItem('Fname'),
                Lname: await AsyncStorage.getItem('Lname'),
                AddFLine: await AsyncStorage.getItem('AddFLine'),
                AddSLine: await AsyncStorage.getItem('AddSLine'),
                Street: await AsyncStorage.getItem('Street'),
                City: await AsyncStorage.getItem('City'),
                PCode: await AsyncStorage.getItem('PCode'),
                MobNum: await AsyncStorage.getItem('MobNum'),
                FixedNum: await AsyncStorage.getItem('FixedNum'),
                Nic: await AsyncStorage.getItem('Nic'),
                Email: await AsyncStorage.getItem('Email'),
                Pword: await AsyncStorage.getItem('Pword')
            });
        };

        //Get user entered vehicles details to the vehicle array from the AsyncStorage
        async function getVehicle() {
            const newVehicle = [...vehicle];
            for (let i = 0; i < 5; i++) {
                newVehicle[i].VehicleNo = await AsyncStorage.getItem('Vno' + (i + 1));
                newVehicle[i].Type = await AsyncStorage.getItem('Vehicle' + (i + 1));
                newVehicle[i].Email = await AsyncStorage.getItem('Email');
                setVehicle(newVehicle);
            }
        };
        getEmail();
        getUser();
        getVehicle();
    }, []);

    const OtpValidation = async e => {
        if (OtpVal == GenVal) {
            setLoading(true);
            //send user's data to backend
            await axios.post(server+"user", users);
            for(const item of vehicle){
                if(item.VehicleNo!=null){
                    //Send vehicel data to backend
                    await axios.post(server+"vehicle", item);
                }
              }
            EncryptedStorage.clear('OTP');
            AsyncStorage.clear();
            //Navigate to congratulations screen
            props.navigation.reset({
                index: 0,
                routes: [{name: 'Congrats'}]
            });
        } else {
            Alert.alert("Invalid OTP");
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Material name="shield-check-outline" size={82} color="#FAA41E" style={intStyles.icon} />
                <Text style={[intStyles.title]}>Verification{'\n'}Code</Text>
            </View>
            <View>
                <Text style={{ fontSize: 16, marginLeft: 10 }}>Please type the verification code sent{'\n'} to {Email}</Text>
            </View>
            <View style={[intStyles.formInput]}>
                <TextInput placeholderTextColor="#A5A5A5" style={intStyles.inputText} value={OtpVal} onChangeText={handleChange} maxLength={4} keyboardType={"numeric"}/>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#A5A5A5", marginTop: 10 }}>Did not receive?
                    <Text onPress={{}} style={{ color: "#FAA41E" }} > Resend</Text>
                </Text>
            </View>
            <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
                <Button title={"Verify"} onPress={OtpValidation}/>
            </View>
            {loading ? <AppLoader/> : null}
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
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
        marginVertical: 5,
        alignItems: "center"
    },

    inputText: {
        fontSize: 36,
        color: "#212121",
        width: "95%",
        marginHorizontal: "2.5%",
    },

    formInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        borderWidth: 4,
        borderColor: "#FAA41E",
        borderRadius: 10,
        marginHorizontal: 10,
        height: 65,
        width: 100,
        alignSelf: "center",
        marginTop: 20
    },
});

export default OtpEmail;