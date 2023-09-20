import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native";
import extStyles from '../styles/extStyles';
import { server } from '../Service/server_con';
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Components/Button";
import axios from "axios";
import ErrorMessage from "../Components/ErrorMessage";
import AppLoader from "../Components/AppLoader";
import { setErrContent, setErrTitle } from "../Global/Variable";

const FogPassVerify = props => {
    const [OtpVal, setOtpVal] = useState(''); //State variable for the get user entered OTP value
    const [Email, setEmail] = useState(props.route.params.Email); //State variable for the get user entered Email

    const [loading, setLoading] = useState(false); //State variable for the loading screen
    const [error, setError] = useState(false);


    const handleChange = (text) => {
        setOtpVal(text); //Set OTP value to OtpVal state variable
    }

    const OtpValidation = async (e) => {
        setLoading(true);
        try {
            const res = await axios.post(server + 'checkOtpMail', { "Email": Email, "OTP": OtpVal });
            if (res.data === 200) {
                props.navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'ChangePass',
                        params: { Email: Email }
                    }],
                });
            } else if (res.data === 300) {
                setErrTitle("Oops...!!");
                setErrContent("Invalid OTP");
                setLoading(false);
                setError(true);
            } else {
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        } catch (error) {
            console.log(error);
            setErrTitle("Oops...!!");
            setErrContent("Something went wrong");
            setLoading(false);
            setError(true);
        }
    };

    const resend = async e => {
        setLoading(true);
        try {
            await axios.post(server + 'mailOtpResend', { "Email": Email, "FirstName": "", "LastName": "" })
                .then((res) => {
                    if (res.data === 200) {
                        props.navigation.reset({
                            index: 0,
                            routes: [{
                                name: 'FogPassVerify',
                                params: { Email: Email }
                            }]
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
    };

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Material name="shield-check-outline" size={82} color="#FAA41E" style={intStyles.icon} />
                <Text style={[intStyles.title]}>Verification{'\n'}Code</Text>
            </View>
            <View>
                <Text style={{ fontSize: 16, marginLeft: 10 }}>Please type the verification code sent{'\n'}to {Email}</Text>
            </View>
            <View style={[intStyles.formInput]}>
                <TextInput placeholderTextColor="#A5A5A5" style={intStyles.inputText} value={OtpVal} onChangeText={handleChange} maxLength={4} keyboardType={"numeric"} />
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#A5A5A5", marginTop: 10 }}>Did not receive?
                    <Text onPress={resend} style={{ color: "#FAA41E" }} > Resend</Text>
                </Text>
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

export default FogPassVerify;