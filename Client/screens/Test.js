import React, { useState } from 'react';
import { Button, TextInput, Text, View, Pressable, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import axios from "axios";


const Test=()=> {
  const handleClick = async e =>{
    e.preventDefault()
    try{
        // await axios.post("http://10.0.2.2:8800/user", users);
        var id=94776651535;
        var pw=1701;
        var to=94768606839;
        var text="ඔබගේ EzPark ලියාපදිංචි වීමේ කේතය: 2356"
        await axios.post("http://textit.biz/sendmsg/index.php?id="+id+"&pw="+pw+"&to="+to+"&text="+text+"");
    }catch(err){
        console.log(err);
    }
}

  return(
    <View style={{width:"90%", alignSelf:"center", marginVertical:10}}>
                <Pressable onPress={handleClick} 
                style={({ pressed })=>[
                intStyles.button,
                pressed && {opacity:.8}
                ]}>
                {({ pressed }) => { 
                    return(
                    <Text style={[intStyles.btnTxt, pressed && {opacity:.8}]}>Next</Text>
                    );
                }} 
                </Pressable>
            </View>
);


}

export default Test;

const intStyles= StyleSheet.create({
  activeCircle:{
      height:48,
      width: 48,
      borderRadius:48,
      borderWidth:2,
      borderColor:"#FAA41E",
      justifyContent:"center",
      alignItems:"center"
  },

  disableCircle:{
      height:48,
      width: 48,
      borderRadius:48,
      borderWidth:2,
      borderColor:"#7D7E7E",
      justifyContent:"center",
      alignItems:"center"
  },

  activeCircleFont:{
      fontSize:30,
      fontWeight:"500",
      color:"#7D7E7E"
  },

  disableLine:{
      width:68,
      height:2,
      backgroundColor:"#7D7E7E",
      marginHorizontal:20
  },  

  stepText:{
      fontSize:15,
      color:"#7D7E7E"
  },  

  icon:{
      marginLeft:10,
      marginRight:5,
      height:"100%"
  },

  title:{
      fontSize:36,
      fontWeight:"900",
      color:"#FAA41E",
      lineHeight:40,
  },

  titleView:{
      flexDirection:"row",
      alignItems:"center"
  },
  formInput:{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#212121",
      borderRadius: 10,
      marginHorizontal: 10,
      height:50,
      width:"90%",
      alignSelf:"center",
      marginTop: 20
    },
    inputText:{
      fontSize:20,
      color:"#212121",
      width:"95%",
      marginHorizontal:"2.5%"
    }, 

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
    },})