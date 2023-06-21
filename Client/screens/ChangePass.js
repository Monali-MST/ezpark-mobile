import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image } from 'react-native';
import Button from "../Components/Button";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from "../Global/Variable";
import extStyles from "../styles/extStyles";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { server } from "../Service/server_con";
import { Base64 } from "js-base64";

const ChangePass = props => {

    const [loading, setLoading] = useState(false); //State variable for the loading screen
    const [error, setError] = useState(false);

    const [Email, setEmail] = useState(props.route.params.Email);

    const [errors, setErrors] = useState({
        pWordErr: "",
        pWordBColor: "#212121",
        conPWordErr: "",
        conPWordBColor: "#212121",
        valid: false,
    })

    const [users, setUsers] = useState({
        Pword: "",
        conPWord: ""
    });

    const handleChange = (name, value) => {
        setUsers((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, valid: false }));
    };

    const isValid = () => {
        setErrors((prev) => ({ ...prev, valid: true }));
        //Validate password
        if (users.Pword == "") { //Password field should not be null
            setErrors((prev) => ({ ...prev, valid: false, pWordErr: "Password field cannot be empty", pWordBColor: "#F00", }));
        } else if (users.Pword.length < 8) { //Password must contain minimum 8 characters
            setErrors((prev) => ({ ...prev, valid: false, pWordErr: "Password must contains minimum 8 characters", pWordBColor: "#F00", }));
        } else if (users.conPWord == "") { //Confirm password field should not be null
            setErrors((prev) => ({ ...prev, valid: false, conPWordErr: "Confirm password field cannot be empty", conPWordBColor: "#F00", }));
        } else if (users.Pword != users.conPWord) { //Check whether Password and Confirmation password are not equal
            setErrors((prev) => ({ ...prev, valid: false, conPWordErr: "Password mismatched. Please check again", conPWordBColor: "#F00", }));
            setErrors((prev) => ({ ...prev, pWordErr: "", pWordBColor: "#F00" }));
        } else {
            setErrors((prev) => ({ ...prev, pWordErr: "", pWordBColor: "#FAA41E" }));
            setErrors((prev) => ({ ...prev, conPWordErr: "", conPWordBColor: "#FAA41E" }));
        }
    }


    const handleClick = async e => {
        isValid();
        if (errors.valid) {
            setLoading(true);
            const encode = Base64.encode(users.Pword);
            await axios.post(server + 'changePassword', { "Password": encode, "Email": Email })
                .then((res) => {
                    if (res.data === 200) {
                        props.navigation.reset({
                            index: 0,
                            routes: [{name: 'Success'}]
                        });
                        setLoading(false);
                    } else {
                        setErrTitle("Oops...!!");
                        setErrContent("Something went wrong");
                        setLoading(false);
                        setError(true);
                    }
                }).catch((err) => {
                    setErrTitle("Oops...!!");
                    setErrContent("Something went wrong");
                    setLoading(false);
                    setError(true);
                })
        }
    };


    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Material name="key-chain-variant" size={82} color="#FAA41E" style={intStyles.icon} />
                <Text style={[intStyles.title]}>Create New{'\n'}Password</Text>
            </View>
            <View style={intStyles.imgContainer}>
                <Image source={require('../src/assets/reset_pass.png')} style={intStyles.image} />
            </View>
            <View style={intStyles.inputContainer}>
                <View style={{ ...intStyles.formInput, ...{ borderColor: errors.pWordBColor } }}>
                    <TextInput placeholder={"Password"} onChangeText={(value) => handleChange("Pword", value)} placeholderTextColor="#A5A5A5" autoCapitalize="none" style={intStyles.inputText} secureTextEntry={true} />
                </View>
                {errors.pWordErr != "" ? <Text style={intStyles.errTxt}>{errors.pWordErr}</Text> : null}

                <View style={{ ...intStyles.formInput, ...{ borderColor: errors.conPWordBColor } }}>
                    <TextInput placeholder={"Re-enter password"} placeholderTextColor="#A5A5A5" autoCapitalize="none" style={intStyles.inputText} onChangeText={(value) => handleChange("conPWord", value)} secureTextEntry={true} />
                </View>
                {errors.conPWordErr != "" ? <Text style={intStyles.errTxt}>{errors.conPWordErr}</Text> : null}
            </View>
            <View style={intStyles.btnContainer}>
                <Button title={"Change"} onPress={handleClick} />
            </View>
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
        </SafeAreaView>
    )
}

const intStyles = StyleSheet.create({
    btnContainer: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 60
    },
    inputContainer: {
        marginTop: 10
    },
    image: {
        resizeMode: "center",
        height: "100%",
        width: "100%"
    },

    imgContainer: {
        width: "100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center"
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
        marginTop: 20
    },

    inputText: {
        fontSize: 20,
        color: "#212121",
        width: "95%",
        marginHorizontal: "2.5%"
    },

    errTxt: {
        color: "#f00",
        fontSize: 10,
        marginLeft: 20
    },
    icon: {
        marginLeft: 10,
        marginRight: 5,
        height: "100%"
    },

    title: {
        fontSize: 36,
        fontWeight: "900",
        color: "#FAA41E",
        lineHeight: 40,
    },

    titleView: {
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center"
    },
});

export default ChangePass;