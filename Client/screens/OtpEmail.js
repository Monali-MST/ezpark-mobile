import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert, Pressable, TextInput } from "react-native";
import extStyles from '../styles/extStyles';
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Components/Button";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const OtpEmail = props => {

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
    const [OtpVal, setOtpVal] = useState('');
    const [Email, setEmail] = useState('');
    const [GenVal, setGenVal] = useState('');

    const handleChange = (text) => {
        setOtpVal(text);
    }

    useEffect(() => {
        async function getEmail() {
            setEmail(await AsyncStorage.getItem('Email'));
            setGenVal(await EncryptedStorage.getItem('OTP'));
        };

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
            console.log(users);
            console.log(vehicle);
            await axios.post("http://10.0.2.2:8800/user", users);
            for(const item of vehicle){
                if(item.VehicleNo!=null){
                    await axios.post("http://10.0.2.2:8800/vehicle", item);
                }
              }
            //EncryptedStorage.clear('OTP');
            //props.navigation.navigate('Congrats');
            // props.navigation.reset({
            //     index: 0,
            //     routes: [{name: 'Congrats'}]
            // });
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
                <Text style={{ fontSize: 16, marginLeft: 10 }}>Please type the verification code sent{'\n'} to {Email.substring(0, 2) + '*'.repeat(6) + Email.substring(10)}</Text>
            </View>
            <View style={[intStyles.formInput]}>
                <TextInput placeholderTextColor="#A5A5A5" style={intStyles.inputText} value={OtpVal} onChangeText={handleChange} />
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#A5A5A5", marginTop: 10 }}>Did not receive?
                    <Text onPress={{}} style={{ color: "#FAA41E" }} > Resend</Text>
                </Text>
            </View>
            <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
                <Button title={"Verify"} onPress={OtpValidation}/>
            </View>
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