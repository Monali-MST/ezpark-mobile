import React from "react";
import {Pressable, Text, StyleSheet} from "react-native";

const Button = ({ title, onPress }) => {
    return(
        <Pressable onPress={onPress} 
                style={({ pressed })=>[
                intStyles.button,
                pressed && {opacity:.8}
                ]}>
                {({ pressed }) => { 
                    return(
                    <Text style={[intStyles.btnTxt, pressed && {opacity:.8}]}>{title}</Text>
                    );
                }} 
         </Pressable>
    );
};

const intStyles= StyleSheet.create({
    button:{
        height:54,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FAA41E"
      },
    
      btnTxt:{
        color:"#000",
        fontSize:20,
        fontWeight:"bold"
      },
})

export default Button;