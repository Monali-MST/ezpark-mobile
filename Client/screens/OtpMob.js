import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, Pressable, Alert, Button} from 'react-native';
import extStyles from '../styles/extStyles';
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const OtpMob = props => {
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+94776651535')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>

  // return (
  //   <SafeAreaView style={extStyles.body}>
  //     <View style={intStyles.titleView}>
  //       <Material name="shield-check-outline" size={82} color="#FAA41E" style={intStyles.icon}/>
  //       <Text style={[intStyles.title]}>Verification{'\n'}Code</Text>
  //     </View>
  //     <View>
  //       <Text style={{fontSize:16, marginLeft:10}}>Please type the verification code sent{'\n'} to +94 77 ** ** 535</Text>
  //     </View>
  //     <View style={[intStyles.formInput]}>
  //       <TextInput placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
  //     </View>
  //     <View style={{alignItems:"center"}}>
  //     <Text style={{fontWeight:"bold", fontSize:16, color:"#A5A5A5", marginTop:10}}>Did not receive?
  //       <Text onPress={{}} style={{color:"#FAA41E"}} > Resend</Text>
  //     </Text>
  //     </View>
  //     <View style={{width:"90%", alignSelf:"center", marginVertical:10}}>
  //       <Pressable onPress={{}} 
  //       style={({ pressed })=>[
  //       intStyles.button,
  //       pressed && {opacity:.8}
  //       ]}>
  //       {({ pressed }) => { 
  //           return(
  //           <Text style={[intStyles.btnTxt, pressed && {opacity:.8}]}>Verify</Text>
  //           );
  //       }} 
  //       </Pressable>
  //   </View>
  //   </SafeAreaView>
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
    fontSize:20,
    color:"#212121",
    width:"95%",
    marginHorizontal:"2.5%"
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
    width:200,
    alignSelf:"center",
    marginTop: 20
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
  },
});