import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import extStyles from "../styles/extStyles";
import AsyncStore from "@react-native-async-storage/async-storage";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const Dashboard = props => {
    const Logout = async e => {
        await AsyncStore.removeItem('AccessToken');
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.navBar}>
                <Pressable style={intStyles.logoutBtn}>
                    <Text onPress={() => Logout()} style={{fontSize: 15, fontWeight: "800", color: "#FFF"}}>Logout</Text>
                </Pressable>
            </View>
            <View style={intStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={intStyles.carousel}>
                        <Image source={require('../src/assets/Rectangle.png')} style={intStyles.carouselImg}/>
                    </View>
                    <View style={intStyles.divider}>
                        <View style={{flexDirection:"row", marginHorizontal: 5}}>
                            <Pressable onPress={() => props.navigation.navigate('DateTime')}>
                                <View style={intStyles.btn1}>
                                    <Material name="calendar-edit" color={"#FAA41E"} size={50} />
                                    <Text style={intStyles.btnTxt1}>Make a Booking</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{flexDirection:"row", marginHorizontal: 5}}>
                            <Pressable onPress={() => props.navigation.navigate('MyBookings')}>
                                <View style={intStyles.btn2}>
                                    <Material name="calendar-clock" color={"#FFF"} size={50} />
                                    <Text style={intStyles.btnTxt2}>My Bookings</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{flexDirection:"row", marginHorizontal: 5}}>
                            <Pressable onPress={() => props.navigation.navigate('History')}>
                                <View style={intStyles.btn1}>
                                    <Octicons name="history" color={"#FAA41E"} size={50} />
                                    <Text style={intStyles.btnTxt1}>Booking{'\n'}History</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({
    carouselImg: {
        resizeMode: "contain",
        width: "100%",
        height: "100%"
    },

    logoutBtn:{
        width: 80,
        height: 40,
        backgroundColor: "#000", 
        alignItems: "center",
        justifyContent: "center",
        alignSelf:"flex-end",
        marginVertical:10,
        borderRadius: 10,
        marginRight: 10
    },

    divider: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 5,
        justifyContent: "center"
    },
    navBar: {
        height: "10%",
        backgroundColor: "#FFF",
        elevation: 10
    },

    container: {
        height: "90%",
    },

    btn2: {
        height: 118,
        width: 114,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAA41E",
        elevation: 5,
        marginBottom: 10
    },

    btnTxt2: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "600",
    },

    btn1: {
        height: 118,
        width: 114,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        elevation: 5,
        marginBottom: 10
    },

    btnTxt1: {
        color: "#FAA41E",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "600"
    },

    carousel: {
        width: "100%",
        height: 219,
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: "#FFF",
        elevation: 5
    }
})

export default Dashboard;