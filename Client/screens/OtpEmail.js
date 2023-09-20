import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native";
import extStyles from '../styles/extStyles';
import { server } from '../Service/server_con';
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import ErrorMessage from "../Components/ErrorMessage";
import AppLoader from "../Components/AppLoader";
import { setErrContent, setErrTitle } from "../Global/Variable";

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

    const [loading, setLoading] = useState(false); //State variable for the loading screen
    const [error, setError] = useState(false);
    const [invalid, setInvalid] = useState(false);


    const handleChange = (text) => {
        setOtpVal(text); //Set OTP value to OtpVal state variable
    }

    useEffect(() => {
        async function getEmail() {
            //Get user entered Email from Asyncstorage and set it to Email state varible 
            setEmail(await AsyncStorage.getItem('Email'));
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


    const OtpValidation = async (e) => {
        setLoading(true);
        try {
            const res = await axios.post(server + 'checkOtpMail', { "Email": Email, "OTP": OtpVal });
            if (res.data === 200) {
                // Send user's data to backend
                await axios.post(server + "user", users);
                for (const item of vehicle) {
                    if (item.VehicleNo != null) {
                        // Send vehicle data to backend
                        await axios.post(server + "vehicle", item);
                    }
                }
                AsyncStorage.clear();
                // Navigate to congratulations screen
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Congrats' }]
                });
            } else if (res.data === 300) {
                setErrTitle("Oops...!!");
                setErrContent("Invalid OTP");
                setLoading(false);
                setError(true);
                setInvalid(true);
            } else {
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
                setInvalid(true);
            }
        } catch (error) {
            console.log(error);
            setErrTitle("Oops...!!");
            setErrContent("Something went wrong");
            setLoading(false);
            setError(true);
            setInvalid(true);
        }
    };

    const resend = async e => {
        setLoading(true);
        try {
            await axios.post(server + 'mailOtpResend', { "Email": Email, "FirstName": users.Fname, "LastName": users.Lname })
                .then((res) => {
                    if (res.data === 200) {
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'OtpEmail' }]
                        });
                    } else {
                        setErrTitle("Oops...!!");
                        setErrContent("Something went wrong");
                        setLoading(false);
                        setError(true);
                    }
                })
        } catch (err) {
            setErrTitle("Oops...!!");
            setErrContent("Something went wrong");
            setLoading(false);
            setError(true);
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
                <TextInput placeholderTextColor="#A5A5A5" style={intStyles.inputText} value={OtpVal} onChangeText={handleChange} maxLength={4} keyboardType={"numeric"} />
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#A5A5A5", marginTop: 10 }}>Did not receive?
                    <Text onPress={resend} style={{ color: "#FAA41E" }} > Resend</Text>
                </Text>
                {invalid ? <Text onPress={() => props.navigation.navigate('ChangeEmail')} style={{ fontWeight: "bold", fontSize: 16, color: "#D24E01", marginTop: 50 }} >Change Email</Text> : null}
            </View>
            <View style={intStyles.btnContainer}>
                <Button title={"Verify"} onPress={OtpValidation} />
            </View>
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
    messageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },

    btnContainer: {
        marginTop: 100,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
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