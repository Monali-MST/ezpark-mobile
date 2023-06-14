import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import extStyles from "../styles/extStyles";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { server } from "../Service/server_con";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import AppLoader from "../Components/AppLoader";


const MyBookings = (props) => {

    const [fetchedData, setFetchedData] = useState([]);

    const [currentBookings, setCurrentBookings] = useState([]);

    const [futureBookings, setFutureBookings] = useState([]);

    useEffect(()=>{
        async function getData(){
            const token = await AsyncStorage.getItem('AccessToken');
            const decoded = jwtDecode(token);
            try{
                const response = await axios.post(server+'fetchBookings',{"userName": decoded.userName});
                if(response.data!=404){
                    setFetchedData(response.data);
                }
                
            }catch(err){
                console.log(err);
            }
        }

        getData();

        const interval = setInterval(getData, 1000);

        return () => {
            clearInterval(interval);
          };
    },[])

    useEffect(()=>{
        fetchedData.forEach((item, index)=>{
            if((moment(item.Date).format('YYYY-MM-DD')>moment().format('YYYY-MM-DD'))||((moment(item.Date).format('YYYY-MM-DD')==moment().format('YYYY-MM-DD'))&&(item.StartTime>moment().format('HH:mm:ss')))){
                futureBookings[index]=item;
            }
        });
    },[fetchedData]);

    useEffect(()=>{
        fetchedData.forEach((item, index)=>{
            if((moment(item.Date).format('YYYY-MM-DD')==moment().format('YYYY-MM-DD'))&&(item.StartTime<=moment().format('HH:mm:ss') && moment().format('HH:mm:ss')<=item.EndTime)){
                currentBookings[index]=item;
            }
        });
    },[fetchedData]);

    useEffect(()=>{
            setFutureBookings([]);    
    },[]);


    if (!Array.isArray(fetchedData)) {
        return <AppLoader/>;
    }


    return(
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Material name="calendar-clock" color={"#FAA41E"} size={82} style={intStyles.icon} />
                <Text style={intStyles.title}>My{'\n'}Bookings</Text>
            </View>
            <View style={intStyles.scrollHeadingContainer}>
                <Text style={intStyles.scrollHeadingTxt}>Bookings now in operation</Text>
            </View>
            <View style={intStyles.scrollContainer}>
                <ScrollView>
                    {currentBookings.map((item, index) => (
                            <ProgressBooking key={index} date={moment(item.Date).format('YYYY-MM-DD')} StartTime={item.StartTime} EndTime={item.EndTime} VehicleNo={item.VehicleNo} Slot={item.Slot}/>
                    ))}
                </ScrollView>
            </View>
            <View style={intStyles.scrollHeadingContainer}>
                <Text style={intStyles.scrollHeadingTxt}>Future Bookings</Text>
            </View>
            <View style={intStyles.scrollContainer}>
                <ScrollView style={{paddingTop: 10, height: "100%"}}>
                {futureBookings.map((item, index) => (
                        <FutureBooking key={index} Date={moment(item.Date).format('YYYY-MM-DD')} StartTime={item.StartTime} EndTime={item.EndTime} VehicleNo={item.VehicleNo} Slot={item.Slot}/>
                ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const ProgressBooking = ({date, StartTime, EndTime, VehicleNo, Slot}) => {
    const formatTime = date+"T"+EndTime;
    const targetTime = new Date(formatTime); 
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    function calculateRemainingTime() {
    const currentTime = new Date();
    const difference = targetTime.getTime() - currentTime.getTime();

    // Check if the remaining time is less than or equal to 0
    if (difference <= 0) {
    // Stop the interval and return 0:0:0
    return { hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate the remaining time in hours, minutes, and seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    return(
        <View style={intStyles.detailsContainer}>
            <View style={{flexDirection: "row"}}>
                <View style={{width: "50%"}}>
                    <Text style={intStyles.slotTxt}>Slot <Text style={{color: "#000"}}>{Slot}</Text></Text>
                    <Text style={intStyles.vehicleNoTxt}>{VehicleNo}</Text>
                </View>
                <View  style={{width: "50%", alignItems:"flex-end"}}>
                    <Text style={intStyles.timerTitle}>Remaining Time</Text>
                    <Text style={intStyles.timer}> {remainingTime.hours.toString().padStart(2, '0')}:{remainingTime.minutes.toString().padStart(2, '0')}:{remainingTime.seconds.toString().padStart(2, '0')}</Text>
                </View>
            </View>
            <Text style={intStyles.dateTimeTxt}>{date} | {StartTime} to {EndTime}</Text>
            <View style={{flexDirection:"row", justifyContent: "flex-end"}}>
                <TouchableOpacity style={intStyles.btnReview}>
                    <Text style={intStyles.btnTxt}>Add Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={intStyles.extendBtn}>
                    <Text style={intStyles.extendBtnTxt}>Extend</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const FutureBooking = ({Date, StartTime, EndTime, VehicleNo, Slot}) => {
    return(
        <View style={intStyles.detailsContainer}>
            <Text style={intStyles.slotTxt}>Slot <Text style={{color: "#000"}}>{Slot}</Text></Text>
            <Text style={intStyles.vehicleNoTxt}>{VehicleNo}</Text>
            <Text style={intStyles.dateTimeTxt}>{Date} | {StartTime} to {EndTime}</Text>
            <TouchableOpacity style={intStyles.btn}>
                <Text style={intStyles.btnTxt}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const intStyles = StyleSheet.create({
    extendBtnTxt: {
        color: "#000",
        fontWeight: "800",
        fontSize: 16
    },  

    extendBtn: {
        width: 93,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#FAA41E",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    }, 

    btnReview: {
        width: 104,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#000",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },  

    timer:{
        fontSize: 25,
        fontWeight: "bold",
        color: "#000"
    },

    timerTitle:{
        fontSize: 14,
        fontWeight: "600",
        color: "#000"

    },

    btnTxt: {
        color: "#FFF",
        fontWeight: "800",
        fontSize: 16
    },  
    btn: {
        width: 93,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#000",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },  

    dateTimeTxt: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginTop: 3
    },

    vehicleNoTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000"
    },

    slotTxt: {
        fontSize: 24,
        fontWeight: "900",
        color: "#FAA41E"
    },

    detailsContainer: {
        width:"90%",
        alignSelf: "center",
        elevation: 8,
        backgroundColor: "#FFF",
        height: 125,
        marginBottom: 10,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },

    scrollContainer: {
        width: "100%",
        height: "42%",
    },

    scrollHeadingTxt: {
        fontSize: 14,
        color: "#000",
        fontWeight: "500",
    },

    scrollHeadingContainer: {
        height: "2.5%",
        width: "100%",
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
        marginTop:10,
        height: "11%"
    },
});

export default MyBookings;
