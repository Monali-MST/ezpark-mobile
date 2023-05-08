import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Splash = props => {

    const AnimatedImage = Animatable.createAnimatableComponent(Image);

    useEffect(() => {
        setTimeout(() => {
           initialRoute();
        }, 5000);
    })

    const initialRoute = async e => {
        const getToken = await AsyncStorage.getItem('AccessToken');
        if(!getToken){
            props.navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        }else{
            props.navigation.reset({
                index: 0,
                routes: [{name: 'Dashboard'}]
            });
        }
    }

    return(
        <SafeAreaView style={intStyles.body}>
            {/* <Animatable.Text animation="zoomIn" duration={5000} style={intStyles.text}><Text style={{color:"#000"}}>Ez</Text>Park</Animatable.Text> */}
            <AnimatedImage
                source={require('./../src/assets/logo_trans.png')}
                animation='zoomIn'
                duration={5000}
                style={intStyles.image}
            />
        </SafeAreaView>   
    )
}

const intStyles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },

    text: {
        color: "#FAA41E",
        fontSize: 70,
        fontWeight: "500"
    },

    image:{
        width: '50%',
        height: '50%',
        resizeMode: 'contain'

    }
})

export default Splash;