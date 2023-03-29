import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput ,Pressable, Alert, BackHandler} from 'react-native';
import extStyles from '../styles/extStyles';
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from '../Components/Button';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpMob = props => {
  const [OtpVal, setOtpVal] = useState(''); //State variable for the get user entered OTP value
  const [MobNo, setMobNo] = useState(''); //State variable for the get user entered Email
  
  const handleChange = (text)=> {
    setOtpVal(text); //Set OTP value to OtpVal state variable
  }

  useEffect(() => {
    async function getMobNo(){
      //Get user entered Email from Asyncstorage and set it to Email state varible 
      setMobNo(await AsyncStorage.getItem('MobNum'));
    }
    getMobNo();
  }, []);

  const OtpValidation = async e =>{
    genVal=await EncryptedStorage.getItem('OTP');
    if(OtpVal==genVal){
      EncryptedStorage.removeItem('OTP'); 
      props.navigation.reset({
        index: 0,
        routes: [{name: 'VerEmail'}]
      });
    }else{
      Alert.alert("Invalid OTP");
    }
  }
  return (
    <SafeAreaView style={extStyles.body}>
      <View style={intStyles.titleView}>
        <Material name="shield-check-outline" size={82} color="#FAA41E" style={intStyles.icon}/>
        <Text style={[intStyles.title]}>Verification{'\n'}Code</Text>
      </View>
      <View>
        <Text style={{fontSize:16, marginLeft:10}}>Please type the verification code sent{'\n'} to {MobNo.substring(0,3)} {MobNo.substring(3,5)} {MobNo.substring(5,8)} {MobNo.substring(8,12)}</Text>
      </View>
      <View style={[intStyles.formInput]}>
        <TextInput placeholderTextColor="#A5A5A5" style={intStyles.inputText} value={OtpVal} onChangeText={handleChange} maxLength={4} keyboardType={"numeric"}/>
      </View>
      <View style={{alignItems:"center"}}>
      <Text style={{fontWeight:"bold", fontSize:16, color:"#A5A5A5", marginTop:10}}>Did not receive?
        <Text onPress={{}} style={{color:"#FAA41E"}} > Resend</Text>
      </Text>
      </View>
      <View style={{width:"90%", alignSelf:"center", marginVertical:10}}>
        <Button title={"Verify"} onPress={OtpValidation}/>
      </View>
    </SafeAreaView>
  );
};

export default OtpMob;

const intStyles= StyleSheet.create({
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
      marginVertical:5,
      alignItems:"center"
  },

  inputText:{
    fontSize:36,
    color:"#212121",
    width:"95%",
    marginHorizontal:"2.5%",
  }, 

  formInput:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderWidth: 4,
    borderColor: "#FAA41E",
    borderRadius: 10,
    marginHorizontal: 10,
    height:65,
    width:100,
    alignSelf:"center",
    marginTop: 20
  },
});