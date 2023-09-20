import React from "react";
import {SafeAreaView, StyleSheet, View, Text, Image} from "react-native";
import extStyles from "../styles/extStyles";
import Feather from "react-native-vector-icons/Feather";
import Button from "../Components/Button";
import AsyncStore from "@react-native-async-storage/async-storage";

const AboutUs = props => {
    const Logout = async e => {
        await AsyncStore.removeItem('AccessToken');
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    }
    
    return(
        <SafeAreaView style={extStyles.body}>
             <View style={intStyles.titleView}>
                <Feather name="info" color={"#FAA41E"} size={75} style={intStyles.icon} />
                <Text style={intStyles.title}>About Us</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require("../src/assets/logo_trans.png")} style={intStyles.image}/>
            </View>
            <View style={intStyles.paraContainer}>
                <Text style={intStyles.paraText}>
                    <Text style={{fontWeight: "bold", fontSize: 22}}>EzPark</Text> is a parking management system which facilitates the customers by providing a platform reserve slots prior parking. Customers can pay online and extend the time of booking at any time.
                </Text>
                <Text style={intStyles.paraText}>
                    <Text style={{fontWeight: "bold", fontSize: 22}}>EzPark</Text> also has a point system which upgrades your account with additional benefits.
    Moreover, if the booking needs to be cancelled a refund will be provided under the terms and conditions.
                </Text>
            </View>
            <View style={intStyles.btnContainer}>
                <Button title={"Sign Out"} onPress={Logout}/>
            </View>
        </SafeAreaView>
    );
};

const intStyles = StyleSheet.create({
    btnContainer: {
        marginTop: 50,
        width: "100%",
        paddingHorizontal: 40,
        alignItems: "center",
        justifyContent: "center"
    },

    paraText: {
        fontSize: 20,
        fontWeight: "400",
        color: "#000",
        textAlign: "center"
    },

    paraContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20
    },

    image: {
        resizeMode: "contain",
        width: "100%",
        height: "100%"
    },

    imageContainer: {
        width: "100%",
        height: 220,
        alignItems: "center",
        justifyContent: "center"
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

export default AboutUs;