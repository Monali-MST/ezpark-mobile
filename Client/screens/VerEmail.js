import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, Pressable } from "react-native";
import extStyles from '../styles/extStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Components/Button";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';
import axios from "axios";
import AppLoader from "../Components/AppLoader";
import { server } from '../Service/server_con';

const VerEmail = props => {
    //State variable for collecting data
    const [To_mail, setToMail] = useState('');
    const [F_name, setF_name] = useState('');
    const [L_name, setL_name] = useState('');
    const [OTP, setOTP] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            setToMail(await AsyncStorage.getItem('Email')); //Get user entered E-mail from Async Storage
            setF_name(await AsyncStorage.getItem('Fname')); //Get user entered first name from Async Storage
            setL_name(await AsyncStorage.getItem('Lname')); //Get user entered last name from Async Storage
            setOTP(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000); //Generate four digits random number

        }
        getData();
    }, []);

    const handleClick = async e => {
        setLoading(true);//Enable loading lottie
        await axios.post(server + 'sendOtpMail', {"Email": To_mail, "FirstName": F_name, "LastName":L_name})
        .then((res) => {
            if(res.data==200){
                props.navigation.reset({
                    index: 0,
                    routes: [{name: 'OtpEmail'}]
                });
            }else{
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        })
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View>
                <Image source={require("../src/assets/Verified-bro.png")} style={intStyles.mainImage} />
            </View>
            <View style={intStyles.middleBox}>
                <Text style={intStyles.verifiedText}>Verified!</Text>
                <Ionicons name="checkmark-circle-sharp" size={150} color={'#38BF2D'} style={intStyles.VerifyIcon} />
            </View>
            <View style={{ width: "90%", alignSelf: "center", marginVertical: 50 }}>
                <Button title={"Verify E-Mail"} onPress={handleClick}/>
            </View>
            {loading ? <AppLoader/> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null }
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({
    mainImage: {
        width: 250,
        height: 250,
        alignSelf: "center",
        marginVertical: 30
    },
    middleBox: {
        borderWidth: 3,
        borderColor: "#FAA41E",
        borderRadius: 16,
        height: 280,
        width: 300,
        alignSelf: "center",
    },
    verifiedText: {
        fontFamily: "Kavoon-Regular",
        fontSize: 48,
        color: "#263238",
        marginTop: 30,
        alignSelf: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 10
    },
    VerifyIcon: {
        alignSelf: "center"
    },
})

export default VerEmail;