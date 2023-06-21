import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput } from "react-native";
import extStyles from "../styles/extStyles";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Components/Button";
import axios from "axios";
import { server } from "../Service/server_con";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrTitle, setErrContent } from "../Global/Variable";
import AppLoader from "../Components/AppLoader";


const FogPass = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const [errors, setErrors] = useState({ //State variable with array for validation purpose
        emailErr: "",
        emailBColor: "#212121",
        vlid: false,
        emailValid: false
    })

    const [email, setEmail] = useState("");

    const handleChange = (value) => {
        setEmail(value);
    }

    const isValid = () => {
        setErrors((prev) => ({ ...prev, valid: true }));
        //Validate Email address
        if (email == "") {
            setErrors((prev) => ({ ...prev, emailErr: "E-mail field cannot be empty", emailBColor: "#F00", valid: false }));
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            setErrors((prev) => ({ ...prev, emailErr: "Invalid E-Mail", emailBColor: "#F00", valid: false }));
        } else {
            setErrors((prev) => ({ ...prev, emailErr: "", emailBColor: "#FAA41E" }));
            setLoading(true);
            isRegistered();
        }
    }

    const isRegistered = async (e) => {
        try {
            const res = await axios.post(server + "emailValidation", { "Email": email });
            if (res.data === 200) {
                setLoading(true); // Enable loading lottie
                try {
                    const otpResponse = await axios.post(server + 'sendOtpMail', { "Email": email, "FirstName": "", "LastName": "" });
                    if (otpResponse.data === 200) {
                        props.navigation.reset({
                            index: 0,
                            routes: [{
                                name: 'FogPassVerify',
                                params: { Email: email }
                            }],
                        });
                    } else {
                        setErrTitle("Oops...!!");
                        setErrContent("Something went wrong");
                        setLoading(false);
                        setError(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else if (res.data === 100) {
                setErrTitle("Oops...!!");
                setErrContent("This Email address is not registered");
                setLoading(false);
                setError(true);
                console.log("Not Registered");
            } else {
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        } catch (error) {
            setErrTitle("Oops...!!");
            setErrContent("Something went wrong");
            setLoading(false);
            setError(true);
        }
    }

    const handleClick = () => {
        isValid();
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <Material name="shield-key" size={80} color={'#FAA41E'} />
                <Text style={intStyles.titleTxt}>Forgot{'\n'}Password</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require('../src/assets/Security.png')} style={intStyles.image} />
            </View>
            <View style={intStyles.messageContainer}>
                <Text style={intStyles.messageTxt}>Please enter your registered Email address to receive a verification code.</Text>
            </View>
            <View style={intStyles.inputContainer}>
                <View style={{ ...intStyles.formInput, ...{ borderColor: errors.emailBColor } }}>
                    <TextInput placeholder={"E-Mail"} onChangeText={(value) => handleChange(value)} placeholderTextColor="#A5A5A5" autoCapitalize="none" keyboardType="email-address" maxLength={70} style={intStyles.inputText} />
                </View>
                {errors.emailErr != "" ? <Text style={intStyles.errTxt}>{errors.emailErr}</Text> : null}
            </View>
            <View style={intStyles.btnContainer}>
                <Button onPress={handleClick} title={"Send"} />
            </View>
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
            {loading ? <AppLoader /> : null}
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
    btnContainer: {
        width: "100%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
    },

    inputContainer: {
        width: "100%",
        height: "10%",
        marginTop: 10
    },

    formInput: {
        flexDirection: "row",
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

    errTxt: {
        color: "#f00",
        fontSize: 10,
        marginLeft: 20
    },

    messageTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        textAlign: "center"
    },

    messageContainer: {
        width: "100%",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10
    },

    image: {
        resizeMode: "contain",
        width: "100%",
        height: "100%"
    },

    imageContainer: {
        width: "100%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
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
});

export default FogPass;