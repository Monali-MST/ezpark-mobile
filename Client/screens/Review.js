import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import extStyles from "../styles/extStyles";
import { server } from "../Service/server_con";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Review = (props) => {
    return(
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <MaterialIcons name="rate-review" size={80} color={"#FAA41E"}/>
                <Text style={intStyles.titleTxt}>Feedback</Text>
            </View>
            <View style={intStyles.headingContainer}>
                <Text style={intStyles.heading}>Enjoynig EzPark?</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require('../src/assets/hidden_person.png')} style={intStyles.image}/>
            </View>
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
    image: {
        resizeMode: "contain",
        height: "100%",
        width: "100%"
    },

    imageContainer: {
        width: "100%",
        height: 220,
        paddingHorizontal: 10,
        alignItems:"center",
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