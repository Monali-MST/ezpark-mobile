import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import extStyles from "../styles/extStyles";
import AsyncStore from "@react-native-async-storage/async-storage";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

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
                <Text>Main Dashboard</Text>
            </View>
            <View style={intStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={intStyles.carousel}>

                    </View>
                    <View style={{flexDirection:"row", marginHorizontal: 10}}>
                        <Pressable onPress={() => props.navigation.navigate('DateTime')}>
                            <View style={intStyles.btn1}>
                                <Material name="calendar-edit" color={"#FAA41E"} size={50} />
                                <Text style={intStyles.btnTxt1}>Make a Booking</Text>
                            </View>
                        </Pressable>
                    </View>



                    <View style={{ width: 80, height: 40, backgroundColor: "#F8C", alignItems: "center", justifyContent: "center" }}>
                        <Text onPress={() => Logout()}>Logout</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({
    navBar: {
        height: "10%",
        backgroundColor: "#0F0"
    },

    container: {
        height: "90%",
    },

    btn1: {
        height: 118,
        width: 114,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
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
        borderWidth: 1,
    }
})

export default Dashboard;