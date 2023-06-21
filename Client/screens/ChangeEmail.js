import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, View, Text, TextInput} from "react-native";
import extStyles from "../styles/extStyles";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../Components/Button";
import axios from "axios";
import { server } from "../Service/server_con";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeEmail = (props) => {
    const [email,setEmail] = useState();

    const [errors, setErrors] = useState({ //State variable with array for validation purpose
        emailErr: "",
        emailBColor: "#212121",
        valid: false,
        emailValid: false,
        isSame: false
    })

    const [users, setUsers] = useState({ //State variable with array for store user entered value
        Email: "", 
    });

    const isValid = () => {
        setErrors((prev) => ({ ...prev, valid: true }));
        if (users.Email == "") {
            setErrors((prev) => ({ ...prev, emailErr: "E-mail field cannot be empty", emailBColor: "#F00", valid: false }));
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users.Email))) {
            setErrors((prev) => ({ ...prev, emailErr: "Invalid E-Mail", emailBColor: "#F00", valid: false }));
        } else if (errors.emailValid == true) {
            setErrors((prev) => ({ ...prev, emailErr: "", emailBColor: "#FAA41E" }));
        }
    }

    const isSame = () => {
        setErrors((prev) => ({...prev, isSame: true}));
        if(email === users.Email){
            setErrors((prev) => ({ ...prev, emailErr: "You entered the same Email", emailBColor: "#F00", isSame: false }));
        }
    }

    const handleEmail = async (name, value) => {
        setUsers((prev) => ({ ...prev, [name]: value }));
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            await axios.post(server + "emailValidation", { "Email": value })
                .then(res => {
                    if (res.data == 100) {
                        setErrors((prev) => ({ ...prev, emailErr: "", emailBColor: "#212121", emailValid: true }));
                    } else if (res.data == 200) {
                        {
                            setErrors((prev) => ({ ...prev, emailErr: "This E-Mail already registered", emailBColor: "#F00", emailValid: false }));
                        }
                    }
                }).catch(err => { console.log(err) })
        } else {
            setErrors((prev) => ({ ...prev, emailValid: false }));
        }
    };

    const handleClick = async e => {
        isValid();
        isSame();
        if (errors.valid && errors.emailValid && errors.isSame) {
            try {
                await AsyncStorage.setItem('Email', users.Email);
                props.navigation.navigate("VerEmail");
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(()=>{
        async function getEmail(){
            setEmail(await AsyncStorage.getItem('Email'));
        }

        getEmail();
    },[])

    return(
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <View style={{marginHorizontal:10}}>
                    <Material name="email-check" color={"#FAA41E"} size={86}/>
                </View>
                <View>
                    <Text style={intStyles.titleTxt}>Change your{'\n'}Email</Text>
                </View>
            </View>
            <View style={intStyles.messageContainer}>
                <Text style={intStyles.messageTxt}>You entered Email address</Text>
                <Text style={intStyles.emailTxt}>{email}</Text>
            </View>
            <View style={intStyles.inputContainer}>
                <View style={{ ...intStyles.formInput, ...{ borderColor: errors.emailBColor } }}>
                    <TextInput placeholder={"E-Mail"} onChangeText={(value) => handleEmail("Email", value)} placeholderTextColor="#A5A5A5" autoCapitalize="none" keyboardType="email-address" maxLength={70} style={intStyles.inputText} />
                </View>
                {errors.emailErr != "" ? <Text style={intStyles.errTxt}>{errors.emailErr}</Text> : null}
            </View>
            <View style={intStyles.btnContainer}>
             <Button title={"Change"} onPress={handleClick} />
            </View>
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({
    btnContainer: {
        marginTop: 100,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
    },

    errTxt: {
        color: "#f00",
        fontSize: 10,
        marginLeft: 20,
        alignSelf: "flex-start"
    },

    inputText: {
        fontSize: 20,
        color: "#212121",
        width: "95%",
        marginHorizontal: "2.5%"
    },

    formInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#212121",
        borderRadius: 10,
        marginHorizontal: 10,
        height: 50,
        width: "90%",
        alignSelf: "center",
        marginTop: 10
    },
    
    inputContainer: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },

    emailTxt: {
        fontSize: 16,
        color: "#000",
        textAlign: "center",
        fontWeight: "600",
        marginTop: 10
    },

    messageTxt: {
        fontSize: 12,
        color: "#000",
        fontWeight: "500",
        textAlign: "center"
    },

    messageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },

    titleTxt: {
        fontSize: 36,
        fontWeight: "900",
        color: "#FAA41E"
    },

    titleContainer: {
        width: "100%",
        flexDirection: "row"
    }
})

export default ChangeEmail;