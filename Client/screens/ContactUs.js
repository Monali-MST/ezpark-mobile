import React from "react";
import {SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import extStyles from "../styles/extStyles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

const ContactUs = props => {
    return(
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Feather name="phone-call" color={"#FAA41E"} size={75} style={intStyles.icon} />
                <Text style={intStyles.title}>Contact Us</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require("../src/assets/Contact_us.png")} style={intStyles.image}/>
            </View>
            <View style={{marginTop: 10, width: "100%"}}>
                <View style={intStyles.iconContainer}>
                    <Ionicons name="location-sharp" color={"#FAA41E"} size={40} />
                </View>
                <View style={intStyles.textContainer}>
                    <Text style={intStyles.text}>Level 26,{'\n'}East Tower,{'\n'}World Trade Centre,{'\n'}Echelon Square{'\n'}Colombo 01,{'\n'}Sri Lanka</Text>
                </View>
            </View>
            <View style={{marginTop: 10, width: "100%"}}>
                <View style={intStyles.iconContainer}>
                    <FontAwesome5 name="phone-alt" color={"#FAA41E"} size={30} />
                </View>
                <View style={intStyles.textContainer}>
                    <Text style={intStyles.text}>+94 37 55 66 444</Text>
                </View>
            </View>
            <View style={{marginTop: 10, width: "100%"}}>
                <View style={intStyles.iconContainer}>
                    <Ionicons name="mail" color={"#FAA41E"} size={35} />
                </View>
                <View style={intStyles.textContainer}>
                    <Text style={intStyles.text}>+94 37 55 66 444</Text>
                </View>
            </View>
            <View style={{marginTop: 10, width: "100%"}}>
                <View style={intStyles.iconContainer}>
                    <Material name="web" color={"#FAA41E"} size={35} />
                </View>
                <View style={intStyles.textContainer}>
                    <Text style={intStyles.text}>+94 37 55 66 444</Text>
                </View>
            </View>
            <TouchableOpacity style={intStyles.btn} onPress={()=>props.navigation.navigate("Chat")}>
                <Ionicons name="md-chatbubbles-outline" color={"#000"} size={35} />
                <Text style={intStyles.btnText}>Chat with Us</Text>
            </TouchableOpacity>
            
            
        </SafeAreaView>
    );
};

const intStyles = StyleSheet.create({
    btnText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#000",
        marginHorizontal: 10
    },

    btn: {
        width: "70%",
        height: 55,
        alignSelf: "center",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#FAA41E",
        marginTop: 20,
    },

    text: {
        fontSize: 15,
        fontWeight: "700",
        color: "#000",
        textAlign: "center"
    },

    textContainer:{
        justifyContent: "center",
        alignItems: "center"
    },

    iconContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        resizeMode: "center",
        width: "100%",
        height: "100%"
    },

    imageContainer:{
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
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

export default ContactUs;