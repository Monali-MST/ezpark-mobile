import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput } from "react-native";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import extStyles from "../styles/extStyles";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeMob = (props) => {

    const [mobile, setMobile] = useState();

    const [errors, setErrors] = useState({ //State variable with array for validation purpose
        mobNumErr: "",
        mobNumBColor: "#212121",
        valid: false,
        isSame: false
    })

    const [users, setUsers] = useState({ //State variable with array for store user entered value
        MobNum: "",
    });

    const handleChange = (name, value) => {
        setUsers((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, valid: false }));
    };

    const isValid = () => {
        setErrors((prev) => ({ ...prev, valid: true }));
        if (users.MobNum == "") { //Mobile number should not be null
            setErrors((prev) => ({ ...prev, mobNumErr: "Mobile number  field cannot be empty", mobNumBColor: "#F00", valid: false }));
        } else {
            //Check whether mobile number first two digits are starting with 94
            if (users.MobNum.slice(0, 2) == "94") {
                //Is it has 11 digits
                if (!(/^\d{11}$/.test(users.MobNum))) {
                    setErrors((prev) => ({ ...prev, mobNumErr: "Invalid phone number", mobNumBColor: "#F00", valid: false }));
                } else {
                    //Add + mark to the begining of the mobile number
                    users.MobNum = "+" + users.MobNum;
                    setErrors((prev) => ({ ...prev, mobNumErr: "", mobNumBColor: "#FAA41E" }));
                }
                //Check whether mobile number first digit is starting with 0
            } else if (users.MobNum.charAt(0) == "0") {
                //Is it has 10 digits
                if (!(/^\d{10}$/.test(users.MobNum))) {
                    setErrors((prev) => ({ ...prev, mobNumErr: "Invalid phone number", mobNumBColor: "#F00", valid: false }));
                } else {
                    setErrors((prev) => ({ ...prev, mobNumErr: "", mobNumBColor: "#FAA41E" }));
                    //Remove first digit(0) and add +94 to begining
                    users.MobNum = "+94" + (users.MobNum.slice(1));
                }
                //Check whether mobile number first three characters are containing +94
            } else if (users.MobNum.slice(0, 3) == "+94") {
                //Check number have 12 digit and third character not a 0
                if ((!(users.MobNum.length == 12)) || users.MobNum.charAt(3) == "0") {
                    setErrors((prev) => ({ ...prev, mobNumErr: "Invalid phone number", mobNumBColor: "#F00", valid: false }));
                } else {
                    setErrors((prev) => ({ ...prev, mobNumErr: "", mobNumBColor: "#FAA41E" }));
                }
            }
            else {
                setErrors((prev) => ({ ...prev, mobNumErr: "Invalid phone number", mobNumBColor: "#F00", valid: false }));
            }
        }
    }

    const isSame = () => {
        setErrors((prev) => ({ ...prev, isSame: true }));
        if(mobile === users.MobNum){
            setErrors((prev) => ({ ...prev, mobNumErr: "You entered the same number", mobNumBColor: "#F00", isSame: false }));
        }
    }

    const handleClick = async e => {
        isValid();
        isSame();
        if (errors.valid && errors.isSame) {
            try {
                await AsyncStorage.setItem('MobNum', users.MobNum);
                props.navigation.navigate("VerMob");
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        async function getMobile() {
            setMobile(await AsyncStorage.getItem('MobNum'));
        }
        getMobile();
    }, [])

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <View style={{ marginHorizontal: 10 }}>
                    <Material name="phone-check" color={"#FAA41E"} size={86} />
                </View>
                <View>
                    <Text style={intStyles.titleTxt}>Change your{'\n'}mobile number</Text>
                </View>
            </View>
            <View style={intStyles.messageContainer}>
                <Text style={intStyles.messageTxt}>You entered mobile number</Text>
                <Text style={intStyles.mobTxt}>{mobile}</Text>
            </View>
            <View>
                <View style={{ ...intStyles.formInput, ...{ borderColor: errors.mobNumBColor } }}>
                    <TextInput placeholder={"Mobile number"} onChangeText={(value) => handleChange("MobNum", value)} placeholderTextColor="#A5A5A5" keyboardType="phone-pad" maxLength={12} style={intStyles.inputText} />
                </View>
                {errors.mobNumErr != "" ? <Text style={intStyles.errTxt}>{errors.mobNumErr}</Text> : null}
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

    mobTxt: {
        fontSize: 20,
        color: "#000",
        textAlign: "center",
        fontWeight: "600",
        marginTop: 10
    },

    messageTxt: {
        fontSize: 16,
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
        fontSize: 30,
        fontWeight: "900",
        color: "#FAA41E"
    },

    titleContainer: {
        width: "100%",
        flexDirection: "row"
    }
})

export default ChangeMob;