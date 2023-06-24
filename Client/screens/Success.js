import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet} from "react-native";
import extStyles from "../styles/extStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "../Components/Button";

const Success = props => {

    const handleClick=()=>{
        //Prevent go back
        props.navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View>
                <Image source={require("./../src/assets/Verified-rafiki.png")} style={intStyles.mainImage}/>
            </View>
            <View style={intStyles.middleBox}>
                <Text style={intStyles.congratsText}>All are good!</Text>
                <Text style={intStyles.paraText}>You have successfully changed the password.</Text>
                <Ionicons name="checkmark-circle-sharp" size={150} color={'#38BF2D'} style={intStyles.verifyIcon}/>
            </View>
            <View style={{width:"90%", alignSelf:"center", marginVertical:20}}>
                <Button title={"Go to Sign In"} onPress={handleClick}/>
            </View>
        </SafeAreaView>
    );
}

const intStyles=StyleSheet.create({
    mainImage:{
        width:300,
        height:300,
        alignSelf:"center",
        marginVertical:20
    },
    
    middleBox:{
        width:300,
        height: 320,
        borderWidth: 3,
        borderColor: "#FAA41E",
        borderRadius: 16,
        alignSelf: "center",
    },
    congratsText:{
        fontFamily:"Kavoon-Regular",
        fontSize:32,
        color:"#263238",
        marginTop:20,
        alignSelf:"center",
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: {width: 2, height: 4},
        textShadowRadius: 10
    },
    paraText:{
        fontSize:24,
        color:"#FAA41E",
        fontWeight:"900",
        textAlign:"center",
        marginTop: 20
    },
    verifyIcon:{
        alignSelf:"center"
    },
});

export default Success;