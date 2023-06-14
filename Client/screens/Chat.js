import React from "react";
import {SafeAreaView, View, Text, StyleSheet} from "react-native";
import extStyles from "../styles/extStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Chat = props => {
    return(
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.container}>
                <Text style={intStyles.heading}>Comming Soon</Text>
                <Ionicons name="chatbubbles-outline" color={"#FFF"} size={150} />
            </View>
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({
    heading:{
        fontSize: 70,
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FAA41E",
        alignItems: "center",
        justifyContent: "center"
    },
})

export default Chat;