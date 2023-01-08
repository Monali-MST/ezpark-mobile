import React from "react";
import { Text, StyleSheet, View, TextInput, Image, SafeAreaView, Alert, Pressable, TouchableOpacity } from "react-native";
import extStyles from "../styles/extStyles";
import Feather from "react-native-vector-icons/Feather";


const Login = props => {
  return(
    <SafeAreaView style={[extStyles.body]}>
      <View style={{flex:2, justifyContent:"flex-end"}}>
        <Image source={require("../src/assets/logo_trans.png")} style={[intStyles.logo]}/>
      </View>
      <View style={{flex:4}}>
        <View style={[intStyles.formInput]}>
          <Feather name="user" size={25} color="#A5A5A5" style={intStyles.icon}/>
          <TextInput placeholder="User Name" placeholderTextColor="#A5A5A5" style={intStyles.inputText} keyboardType={"email-address"}/>
        </View>
        <View style={[intStyles.formInput]}>
          <Feather name="key" size={25} color="#A5A5A5" style={intStyles.icon}/>
          <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
        </View>
        <View style={{width:"80%", alignSelf:"center"}}>
          <TouchableOpacity onPress={() => Alert.alert('This is forgot passwrod')} activeOpacity={0.8}>
            <Text style={{...extStyles.txtColor2,...{fontWeight:"500"}}}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:"80%", alignSelf:"center", marginTop:64}}>
         <Pressable onPress={() => Alert.alert('This is sign in button')} 
         style={({ pressed })=>[
          intStyles.button,
          pressed && {opacity:.8}
         ]}>
          {({ pressed }) => { 
            return(
              <Text style={[intStyles.btnTxt, pressed && {opacity:.8}]}>Sign in</Text>
            );
          }} 
         </Pressable>
        </View>
    
        <View style={{alignItems:"center",marginTop:150}}>
          <Text style={{fontWeight:"500", fontSize:16, color:"#A5A5A5"}}>Don't have an account?
            <Text onPress={() => props.navigation.navigate('TandC')} style={{color:"#FAA41E"}} > Sign Up</Text>
          </Text>
        </View>
                
      </View>
    </SafeAreaView>
  )
}

const intStyles = StyleSheet.create({
  logo: {
    width:"80%",
    height:"85%",
    resizeMode:"contain",
    alignSelf:"center"
  },

  formInput:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#212121",
    height: 20,
    borderRadius: 50,
    marginTop:32,
    marginHorizontal: 10,
    height:50,
    width:"80%",
    alignSelf:"center"
  },
  inputText:{
    fontSize:20,
    color:"#212121",
    width:"80%"
  },  
  icon:{
    marginLeft:10
  },
  button:{
    height:63,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#FAA41E"
  },

  btnTxt:{
    color:"#000",
    fontSize:32,
    fontWeight:"bold"
  },
})
export default Login;