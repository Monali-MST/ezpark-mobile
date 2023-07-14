import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import extStyles from "../styles/extStyles";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
 
const Dashboard = props => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [showMax, setShowMax] = useState(true);

    const currentHour = moment.tz("Asia/Colombo").hour();

    let greeting;

    if (currentHour >= 0 && currentHour < 12) {
        greeting = 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }

    const [fetchedData, setFetchedData] = useState([]);
    const [badgeImage, setBadgeImage] = useState(require("../src/assets/blue.png"));

    const [badgeDetails, setBadgeDetails] = useState({
        gold: "",
        silver: "",
        bronze: "",
        blue: ""
    });

    const [showEmptyMsg, setShowEmptyMsg] = useState(false);

    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        const getData = async e => {
            const token = await AsyncStorage.getItem('AccessToken');
            const decoded = jwtDecode(token);
            let response = await axios.post(server + 'point', { "userName": decoded.userName });
            if (response.data == 100) {
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            } else {
                setFetchedData(response.data);
            }

            response = await axios.post(server + 'fetchReview');
            if(response.data == 100){
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }else if(response.data == 404){
                setReviewData([]);
                setShowEmptyMsg(true);
            }else{
                setShowEmptyMsg(false);
                setReviewData(response.data);
            }
        };
        setLoading(true);
        setShowMax(true);
        getData();
    }, []);

    const [point, setPoint] = useState([]);
    useEffect(() => {
        setPoint(fetchedData[0]);
        setBadgeDetails((prev) => ({ prev, gold: fetchedData[1], silver: fetchedData[2], bronze: fetchedData[3], blue: fetchedData[4] }));
    }, [fetchedData]);

    const [maxPoint, setMaxPoint] = useState();
    const [minPoint, setMinPoint] = useState();
    useEffect(() => {
        if (point) {
            switch (point.Badge) {
                case 1:
                    setBadgeImage(require("../src/assets/gold.png"));
                    setMaxPoint("Unlimited");
                    setMinPoint(badgeDetails.gold);
                    setShowMax(false);
                    break;
                case 2:
                    setBadgeImage(require("../src/assets/silver.png"));
                    setMaxPoint(badgeDetails.gold);
                    setMinPoint(badgeDetails.silver);
                    break;
                case 3:
                    setBadgeImage(require("../src/assets/bronze.png"));
                    setMaxPoint(badgeDetails.silver);
                    setMinPoint(badgeDetails.bronze);
                    break;
                case 4:
                    setBadgeImage(require("../src/assets/blue.png"));
                    setMaxPoint(badgeDetails.bronze);
                    break;
            }
        }
    }, [point]);

    useEffect(() => {
        if (maxPoint) {
            setLoading(false);
            if (point.UserPoints >= maxPoint.Minimum_Points && !(point.Badge==1)) {
                switch (point.Badge) {
                    case 4:
                        upgradeBadge(3);
                        break;
                    case 3:
                        upgradeBadge(2);
                        break;
                    case 2:
                        upgradeBadge(1);
                        break;
                }
            }else if(point.UserPoints < minPoint.Minimum_Points && !(point.Badge==4)){
                switch (point.Badge) {
                    case 3:
                        upgradeBadge(4);
                        break;
                    case 2:
                        upgradeBadge(3);
                        break;
                    case 1:
                        upgradeBadge(2);
                        break;
                }
            }
        }
    }, [maxPoint]);

    const upgradeBadge = async (badge) => {
        setLoading(true);
        const token = await AsyncStorage.getItem('AccessToken');
        const decoded = jwtDecode(token);

        const response = await axios.post(server + 'badgeUpgrade', { "badge": badge, "userName": decoded.userName });
        if (response.data == 100) {
            setErrTitle("Oops...!!");
            setErrContent("Something went wrong");
            setLoading(false);
            setError(true);
        } else {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.navBar}>
                <View style={{ width: "40%", height: "100%", justifyContent: "center", padding: 10 }}>
                    <Image source={badgeImage} style={intStyles.badge} />
                    <Text style={intStyles.navTxt}>{greeting}</Text>
                </View>
                <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                    <Image source={require("../src/assets/logo_no_txt.png")} style={intStyles.logo} />
                </View>
                <View style={{ width: "40%", alignItems: "center", justifyContent: "flex-end", padding: 10, flexDirection: "row" }}>
                    <Image source={require("../src/assets/coin.png")} style={intStyles.coin} />
                    {point && maxPoint ? <Text style={intStyles.navTxt}>{point.UserPoints}{showMax ? '/'+maxPoint.Minimum_Points : null}</Text> : null}
                </View>
            </View>
            <View style={intStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={intStyles.carousel}>
                        <Image source={require('../src/assets/Rectangle.png')} style={intStyles.carouselImg} />
                    </View>
                    <View style={intStyles.divider}>
                        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                            <Pressable onPress={() => props.navigation.navigate('DateTime')}>
                                <View style={intStyles.btn1}>
                                    <Material name="calendar-edit" color={"#FAA41E"} size={50} />
                                    <Text style={intStyles.btnTxt1}>Make a Booking</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                            <Pressable onPress={() => props.navigation.navigate('MyBookings')}>
                                <View style={intStyles.btn2}>
                                    <Material name="calendar-clock" color={"#FFF"} size={50} />
                                    <Text style={intStyles.btnTxt2}>My Bookings</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                            <Pressable onPress={() => props.navigation.navigate('History')}>
                                <View style={intStyles.btn1}>
                                    <Octicons name="history" color={"#FAA41E"} size={50} />
                                    <Text style={intStyles.btnTxt1}>Booking{'\n'}History</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View style={intStyles.divider}>
                        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                            <Pressable onPress={() => props.navigation.navigate('VehicleManage')}>
                                <View style={intStyles.btn2}>
                                    <FontAwesome5 name="car" color={"#FFF"} size={50} />
                                    <Text style={intStyles.btnTxt2}>My Vehicles Details</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                            <Pressable onPress={() => props.navigation.navigate('ContactUs')}>
                                <View style={intStyles.btn1}>
                                    <Feather name="phone-call" color={"#FAA41E"} size={50} />
                                    <Text style={intStyles.btnTxt1}>Contact{'\n'}Us</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                            <Pressable onPress={() => props.navigation.navigate('AboutUs')}>
                                <View style={intStyles.btn2}>
                                    <Feather name="info" color={"#FFF"} size={50} />
                                    <Text style={intStyles.btnTxt2}>About{'\n'}Us</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ width: "100%", padding: 10, alignItems: "center" }}>
                        <Text style={intStyles.reviewsHeading}>Reviews and Ratings</Text>
                    </View>

                    {showEmptyMsg ? 
                    <View style={{width: "100%", alignItems: "center"}}>
                        <Text style={intStyles.msgTxt}>No review and ratings available</Text>
                    </View>
                    : null}

                    {reviewData.map((item, index)=>(
                        <Review key={index} firstName={item.FirstName} LastName={item.LastName} rate={item.Rate} review={item.Review} userName={item.user_email}/>
                    ))}
                </ScrollView>
            </View>
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
        </SafeAreaView>
    )
}

const Review = ({firstName, LastName, rate, review, userName}) => {

    const [star, setStar] = useState({
        star1:"#DCDCDC",
        star2:"#DCDCDC",
        star3:"#DCDCDC",
        star4:"#DCDCDC",
        star5:"#DCDCDC"
    })

    useEffect(()=>{
        switch(rate){
            case 5:
                setStar((prev)=>({...prev, star1:"#FFE600", star2:"#FFE600", star3:"#FFE600", star4:"#FFE600", star5:"#FFE600"}));
                break;
            case 4:
                setStar((prev)=>({...prev, star1:"#FFE600", star2:"#FFE600", star3:"#FFE600", star4:"#FFE600", star5:"#DCDCDC"}));
                break;
            case 3:
                setStar((prev)=>({...prev, star1:"#FFE600", star2:"#FFE600", star3:"#FFE600", star4:"#DCDCDC", star5:"#DCDCDC"}));
                break;
            case 2:
                setStar((prev)=>({...prev, star1:"#FFE600", star2:"#FFE600", star3:"#DCDCDC", star4:"#DCDCDC", star5:"#DCDCDC"}));
                break;
            case 1:
                setStar((prev)=>({...prev, star1:"#FFE600", star2:"#DCDCDC", star3:"#DCDCDC", star4:"#DCDCDC", star5:"#DCDCDC"}));
                break;
        }
    },[])
    

    return(
        <View style={intStyles.reviewContainer}>
            <View style={intStyles.topDivider}>
                {/* <View style={intStyles.imageContainer}>
                    <View style={intStyles.profileImgContainer}>
                        <Image source={require("../src/assets/sample_profile.jpg")} style={intStyles.profileImg}/>
                    </View>
                </View> */}
                <View style={intStyles.ratingsContainer}>
                    <Text style={intStyles.nameTxt}>{firstName} {LastName}</Text>
                    <View style={{flexDirection:"row"}}>
                        <Ionicons name="ios-star-sharp" size={15} color={star.star1} />
                        <Ionicons name="ios-star-sharp" size={15} color={star.star2} />
                        <Ionicons name="ios-star-sharp" size={15} color={star.star3} />
                        <Ionicons name="ios-star-sharp" size={15} color={star.star4} />
                        <Ionicons name="ios-star-sharp" size={15} color={star.star5} />
                        <Text style={intStyles.rateTxt}>{rate}/5</Text>
                    </View>
                </View>
            </View>
            <Text style={intStyles.reviewTxt}>
                {review}
            </Text>
        </View>
    );
}

const intStyles = StyleSheet.create({
    msgTxt: {
        alignSelf: "center",
        fontSize: 12,
        fontWeight: "500"
    },

    profileImg: {
        resizeMode: "contain",
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    rateTxt: {
        fontSize: 11,
         marginHorizontal: 3,
         fontWeight: "500",
         color: "#9F9F9D"
    },

    nameTxt: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000"
    },

    profileImgContainer:{
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    reviewTxt:{
        color: "#000",
        fontSize: 10,
        textAlign: "justify",
        margin: 5
    },

    ratingsContainer: {
        width: "88%",
        height: "100%",
        padding: 2
    },

    imageContainer: {
        width: "12%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    topDivider: {
        width: "100%",
        height: 40,
        flexDirection: "row"
    },  
    reviewContainer: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: "#FFF",
        elevation: 5,
        marginBottom: 10
    },
    reviewsHeading: {
        fontSize: 14,
        color: "#000",
        fontWeight: "400"
    },

    coin: {
        resizeMode: "contain",
        height: 20,
        width: 20,
        marginRight: 5
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

    logoutBtn: {
        width: 80,
        height: 40,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginVertical: 10,
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