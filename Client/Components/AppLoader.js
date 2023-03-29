import React from "react";
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const AppLoader = () => {
    return(
        <View style={[StyleSheet.absoluteFillObject, intStyles.container]}>
            <LottieView source={require('../src/assets/loader.json')} autoPlay loop/>
        </View>
    )
}

const intStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        zIndex: 1
    },
})

export default AppLoader;