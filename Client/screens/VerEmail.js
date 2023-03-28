import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, Pressable } from "react-native";
import extStyles from '../styles/extStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Components/Button";
import emailjs from '@emailjs/browser';
import EncryptedStorage from 'react-native-encrypted-storage';

const VerEmail = props => {
    const [To_mail, setToMail] = useState('');
    const [F_name, setF_name] = useState('');
    const [L_name, setL_name] = useState('');
    const [OTP, setOTP] = useState('');

    var templateParams = {
        to_mail: To_mail,
        OTP: OTP,
        f_name: F_name,
        l_name: L_name,
    };

    useEffect(() => {
        async function getData() {
            setToMail(await AsyncStorage.getItem('Email'));
            setF_name(await AsyncStorage.getItem('Fname'));
            setL_name(await AsyncStorage.getItem('Lname'));
            setOTP(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

        }
        getData();
    }, []);

    const handleClick = async e => {
        await EncryptedStorage.setItem('OTP', OTP.toString());
        // console.log(await EncryptedStorage.getItem('OTP'));
        console.log(OTP);
        props.navigation.navigate('OtpEmail');

        // emailjs.send('service_r6g104n', 'template_iq1nsoh', templateParams, '8nD6AUE-CeWWCKKgo')
        // .then(function(response) {
        //     console.log(OTP);
        //     props.navigation.navigate('OtpEmail');
        // }, function(error) {
        //     console.log('FAILED...', error);
        // });
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