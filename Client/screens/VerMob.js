import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import Foundatin from "react-native-vector-icons/Foundation";
import Ant from "react-native-vector-icons/AntDesign";
import Button from "../Components/Button";
import extStyles from '../styles/extStyles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from 'react-native-encrypted-storage';

const VerMob = props => {
    const handleClick = async e => {
        try {
            console.log(await AsyncStorage.getItem('MobNum'));
            var id = 94776651535;
            var pw = 1701;
            var to = await AsyncStorage.getItem('MobNum');
            var code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            await EncryptedStorage.setItem('OTP', code.toString());
            console.log(await EncryptedStorage.getItem('OTP'));
            var text = "Your EzPark verification code: ";
            //await axios.post("https://cloud.websms.lk/smsAPI?sendsms&apikey=hB8Y73E2OTVPBfEGhfBk9ddi95MOFDf7&apitoken=sxX51677694785&type=sms&from=EzPark&to=0776651535&text=My+first+text");
            props.navigation.navigate('OtpMob');
            // props.navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'OtpMob' }]
            // });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Foundatin name="address-book" size={82} color="#FAA41E" style={intStyles.icon} />
                <Text style={[intStyles.title]}>Sign Up</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeCircle}>
                        <Ant name="check" size={32} color="#FAA41E" />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeLine} />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeCircle}>
                        <Ant name="check" size={32} color="#FAA41E" />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeLine} />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeCircle}>
                        <Ant name="check" size={32} color="#FAA41E" />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={intStyles.stepText}>
                        Basic Info
                    </Text>
                </View>
                <View style={{ flex: 3, alignItems: "center" }}>
                    <Text style={intStyles.stepText}>
                        Vehicles Details
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={intStyles.stepText}>
                        Complete
                    </Text>
                </View>
            </View>
            <View>
                <Text style={intStyles.success}>Success!</Text>
            </View>
            <Image source={require("../src/assets/CelebrationRafiki.png")} style={intStyles.mainImage} />
            <View style={{ width: "90%", alignSelf: "center" }}>
                <Button title={"Verify Mobile Number"} onPress={handleClick}/>
            </View>
        </SafeAreaView>
    )
}

export default VerMob;

const intStyles = StyleSheet.create({
    activeCircle: {
        height: 48,
        width: 48,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: "#FAA41E",
        justifyContent: "center",
        alignItems: "center"
    },

    activeCircleFont: {
        fontSize: 30,
        fontWeight: "500",
        color: "#7D7E7E"
    },


    activeLine: {
        width: 68,
        height: 4,
        backgroundColor: "#FAA41E",
        marginHorizontal: 20
    },

    stepText: {
        fontSize: 15,
        color: "#7D7E7E"
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

    success: {
        fontFamily: "Kavoon-Regular",
        fontSize: 48,
        color: "#263238",
        marginTop: 30,
        alignSelf: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 10
    },

    mainImage: {
        width: 400,
        height: 300,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 60
    },
});