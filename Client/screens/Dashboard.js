import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import extStyles from "../styles/extStyles";
import AsyncStore from "@react-native-async-storage/async-storage";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import moment, { max } from 'moment-timezone';
import { server } from "../Service/server_con";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';

const Dashboard = props => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const currentHour = moment.tz("Asia/Colombo").hour();

    let greeting;

    if (currentHour >= 0 && currentHour < 12) {
        greeting = 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }

    const Logout = async e => {
        await AsyncStore.removeItem('AccessToken');
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    }

    const [fetchedData, setFetchedData] = useState([]);
    const [badgeImage, setBadgeImage] = useState(require("../src/assets/bronze.png"));

    const [badgeDetails, setBadgeDetails] = useState({
        gold: "",
        silver: "",
        bronze: ""
    });

    useEffect(()=>{
        const getData = async e => {
            const token = await AsyncStorage.getItem('AccessToken');
            const decoded = jwtDecode(token);
            const response = await axios.post(server + 'point', {"userName": decoded.userName });
            if(response.data==100){
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }else{
                setFetchedData(response.data);
            }
        };
        setLoading(true);
        getData();
    },[])

    const [point, setPoint] = useState([]);
    useEffect(()=>{
        setPoint(fetchedData[0]);
        setBadgeDetails((prev)=>({prev, gold: fetchedData[1], silver: fetchedData[2], bronze: fetchedData[3]}));
    },[fetchedData]);

    const [maxPoint, setMaxPoint] = useState();
    useEffect(()=>{
        if(point){
            switch(point.Badge){
                case 1:
                    setBadgeImage(require("../src/assets/gold.png"));
                    setMaxPoint(badgeDetails.gold);
                    break;
                case 2:
                    setBadgeImage(require("../src/assets/silver.png"));
                    setMaxPoint(badgeDetails.silver);
                    break;
                case 3:
                    setBadgeImage(require("../src/assets/bronze.png"));
                    setMaxPoint(badgeDetails.bronze);
                    break;
            }
        }  
    },[point]);

    useEffect(()=>{
        if(maxPoint){
            setLoading(false);
            if(point.UserPoints>maxPoint.Minimum_Points){
                console.log(point.Badge);
                switch(point.Badge){
                    case 3:
                        upgradeBadge(2);
                        break;
                    case 2:
                        upgradeBadge(1);
                        break;
                }
            }
        }
    },[maxPoint]);

    const upgradeBadge = async (badge) => {
        setLoading(true);
        const token = await AsyncStorage.getItem('AccessToken');
        const decoded = jwtDecode(token);

        const response = await axios.post(server + 'badgeUpgrade', {"badge":badge, "userName":decoded.userName});
        if(response.data==100){
            setErrTitle("Oops...!!");
            setErrContent("Something went wrong");
            setLoading(false);
            setError(true);
        }else{
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.navBar}>
                <View style={{width: "40%", height: "100%", justifyContent: "center", padding: 10}}>
                    <Image source={badgeImage} style={intStyles.badge} />       
                    <Text style={intStyles.navTxt}>{greeting}</Text> 
                </View>     
                <View style={{width: "20%", justifyContent: "center", alignItems: "center"}}>
                    <Image source={require("../src/assets/logo_no_txt.png")} style={intStyles.logo}/>
                </View>         
                <View style={{width: "40%", alignItems: "center", justifyContent: "flex-end", padding: 10, flexDirection: "row"}}>
                    <Image source={require("../src/assets/coin.png")} style={intStyles.coin} />
                    {point && maxPoint ? <Text style={intStyles.navTxt}>{point.UserPoints}/{maxPoint.Minimum_Points}</Text> : null}
                    {/* <Pressable style={intStyles.logoutBtn}>
                        <Text onPress={() => Logout()} style={{fontSize: 15, fontWeight: "800", color: "#FFF"}}>Logout</Text>
                    </Pressable> */}
                </View> 
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
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({
    coin: {
        resizeMode: "contain",
        height: 20,
        width: 20
    },

    navTxt: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000"
    },

    logo: {
        resizeMode: "contain",
        width: "70%",
        height: "70%"
    },

    badge: {
        resizeMode: "contain",
        width: 40,
        height: 40
    },

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
        height: 70,
        backgroundColor: "#FFF",
        elevation: 10,
        flexDirection: "row"
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