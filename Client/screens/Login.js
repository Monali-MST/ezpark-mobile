//Login screen
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Image, SafeAreaView, Alert, Pressable, TouchableOpacity } from "react-native";
import extStyles from "../styles/extStyles";
import Feather from "react-native-vector-icons/Feather";
import ErrorMessage from "../Components/ErrorMessage";
import { server } from "../Service/server_con";
import axios from "axios";
import { setErrTitle, setErrContent } from "./../Global/Variable";
import AppLoader from "../Components/AppLoader";
import AsyncStore from "@react-native-async-storage/async-storage";

const Login = (props) => {

  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    userName: "",
    password: ""
  })

  const [empty, setEmpty] = useState({
    showError: false,
    message: ''
  });

  const [error, setError] = useState(false);

  const handleChange = (name, value) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setEmpty((prev) => ({ ...prev, showError: false }));
  }

  const setToken = async (token) =>{
    await AsyncStore.setItem('AccessToken', token);
    console.log(await AsyncStore.getItem('AccessToken'));
    return;
  }

  useEffect(() => {
    setError(false);
    setEmpty({ showError: false });
    setLoading(false);
  }, [])

  const handleClick = async e => {
    if (credentials.userName == "" && credentials.password == "") {
      setEmpty((prev) => ({ ...prev, showError: true, message: "Please enter user name and password" }));
    } else if (credentials.userName == "" && credentials.password != "") {
      setEmpty((prev) => ({ ...prev, showError: true, message: "User name field cannot be empty" }));
    } else if (credentials.userName != "" && credentials.password == "") {
      setEmpty((prev) => ({ ...prev, showError: true, message: "Password field cannot be empty" }));
    } else {
      setLoading(true);
      await axios.post(server + "userLogin", credentials)
        .then(res => {
          if (res.data == 200) {
            setErrTitle("Oops...!!");
            setErrContent("User not registered with us");
            setLoading(false);
            setError(true);
          } else if (res.data == 100) {
            setErrTitle("Oops...!!");
            setErrContent("Username and password combination is incorrect");
            setLoading(false);
            setError(true);
          } else {
            setToken(res.data);
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Dashboard'}]
          });
          }
        }).catch(err => { console.log(err) })
    }
  }


  return (
    <SafeAreaView style={[extStyles.body]}>
      <View style={{ flex: 2, justifyContent: "flex-end" }}>
        <Image source={require("../src/assets/logo_trans.png")} style={[intStyles.logo]} />
      </View>
      <View style={{ flex: 4 }}>
        <View style={[intStyles.formInput]}>
          <Feather name="user" size={25} color="#A5A5A5" style={intStyles.icon} />
          <TextInput placeholder="User Name" placeholderTextColor="#A5A5A5" style={intStyles.inputText} keyboardType={"email-address"} onChangeText={(value) => handleChange("userName", value)} />
        </View>
        <View style={[intStyles.formInput]}>
          <Feather name="key" size={25} color="#A5A5A5" style={intStyles.icon} />
          <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="#A5A5A5" style={intStyles.inputText} onChangeText={(value) => handleChange("password", value)} />
        </View>
        <View style={{ width: "80%", alignSelf: "center" }}>
          <TouchableOpacity onPress={() => Alert.alert('This is forgot passwrod')} activeOpacity={0.8}>
            <Text style={{ ...extStyles.txtColor2, ...{ fontWeight: "500" } }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={intStyles.errContanier}>
          {empty.showError ? <Text style={intStyles.errTxt}>{empty.message}</Text> : null}
        </View>

        {/* Navigate to main dashboard(Sign in) */}
        <View style={{ width: "80%", alignSelf: "center" }}>
          <Pressable onPress={() => handleClick()}
            style={({ pressed }) => [
              intStyles.button,
              pressed && { opacity: .8 }
            ]}>
            {({ pressed }) => {
              return (
                <Text style={[intStyles.btnTxt, pressed && { opacity: .8 }]}>Sign in</Text>
              );
            }}
          </Pressable>
        </View>

        {/* Navigate to signup process */}
        <View style={{ alignItems: "center", marginTop: 150 }}>
          <Text style={{ fontWeight: "500", fontSize: 16, color: "#A5A5A5" }}>Don't have an account?
            <Text onPress={() => props.navigation.navigate('TandC')} style={{ color: "#FAA41E" }} > Sign Up</Text>
          </Text>
        </View>
      </View>
      {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
      {loading ? <AppLoader/> : null}
    </SafeAreaView>
  )
}

const intStyles = StyleSheet.create({
  logo: {
    width: "80%",
    height: "85%",
    resizeMode: "contain",
    alignSelf: "center"
  },

  formInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#212121",
    height: 20,
    borderRadius: 50,
    marginTop: 32,
    marginHorizontal: 10,
    height: 50,
    width: "80%",
    alignSelf: "center"
  },
  inputText: {
    fontSize: 20,
    color: "#212121",
    width: "80%"
  },
  icon: {
    marginLeft: 10
  },
  button: {
    height: 63,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAA41E"
  },

  btnTxt: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold"
  },

  errContanier: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    height: 84,
    justifyContent: "flex-end"
  },

  errTxt: {
    color: "#F00",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10
  }
})
export default Login;