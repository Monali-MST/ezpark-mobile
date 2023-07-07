import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, Alert, Modal, TouchableOpacity } from "react-native";
import extStyles from "../styles/extStyles";
import { server } from "../Service/server_con";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../Components/Button";
import axios from "axios";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const Review = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [showPopup, setShowPopUp] = useState(false);

    const [point, setPoint] = useState();

    const data = props.route.params;

    const [starColor, setStarColor] = useState({
        star1: "#DCDCDC",
        star2: "#DCDCDC",
        star3: "#DCDCDC",
        star4: "#DCDCDC",
        star5: "#DCDCDC",
    });

    const [rate, setRate] = useState(0);

    const [showError, setShowError] = useState(false);

    const handleStars = (star) => {
        setShowError(false);
        switch (star) {
            case "star1":
                setStarColor((prev) => ({ ...prev, star1: "#FFE600", star2: "#DCDCDC", star3: "#DCDCDC", star4: "#DCDCDC", star5: "#DCDCDC" }));
                setRate(1);
                break;
            case "star2":
                setStarColor((prev) => ({ ...prev, star1: "#FFE600", star2: "#FFE600", star3: "#DCDCDC", star4: "#DCDCDC", star5: "#DCDCDC" }));
                setRate(2);
                break;
            case "star3":
                setStarColor((prev) => ({ ...prev, star1: "#FFE600", star2: "#FFE600", star3: "#FFE600", star4: "#DCDCDC", star5: "#DCDCDC" }));
                setRate(3);
                break;
            case "star4":
                setStarColor((prev) => ({ ...prev, star1: "#FFE600", star2: "#FFE600", star3: "#FFE600", star4: "#FFE600", star5: "#DCDCDC" }));
                setRate(4);
                break;
            case "star5":
                setStarColor((prev) => ({ ...prev, star1: "#FFE600", star2: "#FFE600", star3: "#FFE600", star4: "#FFE600", star5: "#FFE600" }));
                setRate(5);
                break;
            default:
                setStarColor((prev) => ({ ...prev, star1: "#DCDCDC", star2: "#DCDCDC", star3: "#DCDCDC", star4: "#DCDCDC", star5: "#DCDCDC" }));
                setRate(0);
        }
    }

    const [review, setReview] = useState('');

    const handleChangeText = (value) => {
        setReview(value);
    };

    const characterCount = review.length;

    const handleSubmit = async e => {
        if (rate == 0) {
            setShowError(true);
        } else {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem('AccessToken');
                const decoded = jwtDecode(token);
                const values = { "review": review, "rate": rate, "bookingId": data.bookignID, "userName": decoded.userName }
                const response = await axios.post(server + 'review', values);
                if (response.data[0] == 200) {
                    setPoint(response.data[1])
                    setLoading(false);
                    setShowPopUp(true);
                } else {
                    setErrTitle("Oops...!!");
                    setErrContent("Something went wrong");
                    setLoading(false);
                    setError(true);
                }
            } catch (err) {
                console.log(err)
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }
        }
    };

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <MaterialIcons name="rate-review" size={80} color={"#FAA41E"} />
                <Text style={intStyles.titleTxt}>Feedback</Text>
            </View>
            <View style={intStyles.headingContainer}>
                <Text style={intStyles.heading}>Enjoynig EzPark?</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require('../src/assets/hidden_person.png')} style={intStyles.image} />
            </View>
            <View style={intStyles.startContainer}>
                <Ionicons name="ios-star-sharp" size={40} color={starColor.star1} style={intStyles.star} onPress={() => handleStars("star1")} />
                <Ionicons name="ios-star-sharp" size={40} color={starColor.star2} style={intStyles.star} onPress={() => handleStars("star2")} />
                <Ionicons name="ios-star-sharp" size={40} color={starColor.star3} style={intStyles.star} onPress={() => handleStars("star3")} />
                <Ionicons name="ios-star-sharp" size={40} color={starColor.star4} style={intStyles.star} onPress={() => handleStars("star4")} />
                <Ionicons name="ios-star-sharp" size={40} color={starColor.star5} style={intStyles.star} onPress={() => handleStars("star5")} />
            </View>
            <View style={intStyles.inputContainer}>
                <TextInput value={review} onChangeText={handleChangeText} style={intStyles.input} multiline numberOfLines={4} maxLength={250} placeholder="Write a review..." textAlignVertical="top" />
            </View>
            <Text style={intStyles.characterCount}>
                {characterCount}/250
            </Text>
            <View style={intStyles.messageContainer}>
                <Text style={intStyles.message}>
                    Your feedback keep our small team motivated to make EzPark even better :)
                </Text>
            </View>
            <View style={intStyles.errorContainer}>
                {showError ? <Text style={intStyles.errTxt}>Please give your ratings first</Text> : null}
            </View>
            <View style={intStyles.btnContainer}>
                <Button onPress={handleSubmit} title={"Submit"} />
            </View>
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
            {showPopup ? <Popup props={props} point={point} /> : null}
        </SafeAreaView>
    );
}

const Popup = ({ point, props }) => {
    return (
        <View style={intStyles.container}>
            <Modal visible={true} animationType="fade" transparent={true}>
                <View style={intStyles.modalContainer}>
                    <View style={intStyles.modalContent}>
                        <View style={{ width: "40%" }}>
                            <Image source={require("./../src/assets/coin.png")} style={intStyles.modalImage} />
                        </View>
                        <View style={{ width: "60%" }}>
                            <Text style={intStyles.modalHeading}>Thank You</Text>
                            <Text style={intStyles.moadalSubTxt}>You have earned<Text style={{ color: "#FAA41E", fontSize: 35 }}>{'\n'}{point}</Text>{'\n'}point</Text>
                            <TouchableOpacity style={intStyles.changeBtn} onPress={() => props.navigation.navigate("MyBookings")}>
                                <Text style={intStyles.changeBtnTxt}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const intStyles = StyleSheet.create({
    message: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
        textAlign: "center"
    },

    messageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10
    },

    errTxt: {
        color: "#F00",
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10
    },

    errorContainer: {
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 50
    },

    changeBtnTxt: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "700",
        color: "#000"
    },

    changeBtn: {
        width: 150,
        height: 40,
        backgroundColor: "#FAA41E",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    moadalSubTxt: {
        fontSize: 21,
        color: "#000",
        fontWeight: "700",
        textAlign: "center"
    },

    modalHeading: {
        fontSize: 25,
        color: "#FAA41E",
        fontWeight: "700",
        textAlign: "center"
    },

    modalImage: {
        resizeMode: "contain",
        height: "100%",
        width: "100%"
    },

    container: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    modalContent: {
        width: "80%",
        height: "30%",
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        flexDirection: "row"
    },
    btnContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
    },

    characterCount: {
        alignSelf: 'flex-end',
        color: 'gray',
        marginRight: 20
    },

    input: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        height: "90%",
        fontSize: 18,
        fontWeight: "400",
        color: "#000",
        elevation: 10,
    },

    inputContainer: {
        width: "100%",
        height: 150,
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: "center",
    },

    star: {
        marginHorizontal: 5
    },

    startContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },

    image: {
        resizeMode: "contain",
        height: "100%",
        width: "100%"
    },

    imageContainer: {
        width: "100%",
        height: 190,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },

    heading: {
        fontSize: 36,
        color: "#000",
        fontWeight: "500"
    },

    headingContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },

    titleTxt: {
        fontSize: 36,
        fontWeight: "900",
        color: "#FAA41E",
        lineHeight: 40,
        marginHorizontal: 10
    },

    titleContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 10
    }
});

export default Review;