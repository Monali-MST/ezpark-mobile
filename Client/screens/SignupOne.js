import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { server } from '../Service/server_con'
import extStyles from "../styles/extStyles";
import Foundatin from "react-native-vector-icons/Foundation";
import axios from "axios";
import AsyncStore from "@react-native-async-storage/async-storage";
import Button from "./../Components/Button";
 
const SignupOne = props => {

    const [errors, setErrors] = useState({ //State variable with array for validation purpose
        fNameEmptyErr: "",
        fnameBColor: "#212121",
        addFLineErr: "",
        addFLineBColor: "#212121",
        addSLineErr: "",
        addSLineBColor: "#212121",
        cityErr: "",
        cityBColor: "#212121",
        pCodeErr: "",
        pCodeBColor: "#212121",
        mobNumErr: "",
        mobNumBColor: "#212121",
        fixedNumErr: "",
        fixedNumBColor: "#212121",
        nicErr: "",
        nicBColor: "#212121",
        emailErr: "",
        emailBColor: "#212121",
        pWordErr: "",
        pWordBColor: "#212121",
        conPWordErr: "",
        conPWordBColor: "#212121",
        valid: false,
        emailValid: false
    })

    const [users, setUsers] = useState({ //State variable with array for store user entered value
        fNameEmptyErr: "",
        Fname: "",
        Lname: "",
        AddFLine: "",
        AddSLine: "",
        Street: "",
        City: "",
        PCode: "",
        MobNum: "",
        FixedNum: "",
        Nic: "",
        Email: "",
        Pword: "",
        conPWord: ""
    });

    //Store value to users state variable when customer typing in relevant text field
    const handleChange = (name, value) => {
        setUsers((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, valid: false }));
    };

    //Check whether user entered E-mail alreday registered one or not
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

    //Validate user signup form
    const isValid = () => {
        //Validate first name (First name should not be null)
        setErrors((prev) => ({ ...prev, valid: true }));
        if (users.Fname == "") {
            setErrors((prev) => ({ ...prev, fNameEmptyErr: "First name field cannot be empty", fnameBColor: "#F00", valid: false }));
        } else {
            setErrors((prev) => ({ ...prev, fNameEmptyErr: "", fnameBColor: "#FAA41E" }));
        }

        //Validate first line of the address (First Line should not be null)
        if (users.AddFLine == "") {
            setErrors((prev) => ({ ...prev, addFLineErr: "First line of address field cannot be empty", addFLineBColor: "#F00", valid: false }));
        } else {
            setErrors((prev) => ({ ...prev, addFLineErr: "", addFLineBColor: "#FAA41E" }));
        }

        //Validate second line of the address (Second Line should not be null)
        if (users.AddSLine == "") {
            setErrors((prev) => ({ ...prev, addSLineErr: "Second line of address field cannot be empty", addSLineBColor: "#F00", valid: false }));
        } else {
            setErrors((prev) => ({ ...prev, addSLineErr: "", addSLineBColor: "#FAA41E" }));
        }

        //Validate city of the address (City should not be null)
        if (users.City == "") {
            setErrors((prev) => ({ ...prev, cityErr: "City field cannot be empty", cityBColor: "#F00", valid: false }));
        } else {
            setErrors((prev) => ({ ...prev, cityErr: "", cityBColor: "#FAA41E" }));
        }

        //Validate postal code of the address (Postal code should not be null)
        if (users.PCode == "") {
            setErrors((prev) => ({ ...prev, pCodeErr: "Postal code field cannot be empty", pCodeBColor: "#F00", valid: false }));
        } else {
            setErrors((prev) => ({ ...prev, pCodeErr: "", pCodeBColor: "#FAA41E" }));
        }

        //Validate mobile number (0771234567, 94771234567, +94771234567)
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

        //Validate fixed number
        if (users.FixedNum != "") {
            if (users.FixedNum.slice(0, 2) == "94") {
                if (!(/^\d{11}$/.test(users.FixedNum))) {
                    setErrors((prev) => ({ ...prev, fixedNumErr: "Invalid phone number", fixedNumBColor: "#F00", valid: false }));
                } else {
                    users.FixedNum = "+" + users.FixedNum;
                    setErrors((prev) => ({ ...prev, fixedNumErr: "", fixedNumBColor: "#FAA41E" }));
                }
            } else if (users.FixedNum.charAt(0) == "0") {
                if (!(/^\d{10}$/.test(users.FixedNum))) {
                    setErrors((prev) => ({ ...prev, fixedNumErr: "Invalid phone number", fixedNumBColor: "#F00", valid: false }));
                } else {
                    setErrors((prev) => ({ ...prev, fixedNumErr: "", fixedNumBColor: "#FAA41E" }));
                    users.FixedNum = "+94" + (users.FixedNum.slice(1));
                }
            } else if (users.FixedNum.slice(0, 3) == "+94") {
                if ((!(users.FixedNum.length == 12)) || users.FixedNum.charAt(3) == "0") {
                    setErrors((prev) => ({ ...prev, fixedNumErr: "Invalid phone number", fixedNumBColor: "#F00", valid: false }));
                } else {
                    setErrors((prev) => ({ ...prev, fixedNumErr: "", fixedNumBColor: "#FAA41E" }));
                }
            }
            else {
                setErrors((prev) => ({ ...prev, fixedNumErr: "Invalid phone number", fixedNumBColor: "#F00", valid: false }));
            }
        } else {
            setErrors((prev) => ({ ...prev, fixedNumErr: "", fixedNumBColor: "#212121" }));
        }

        //Validate NIC number(Old type or New type)
        if (users.Nic == "") {
            setErrors((prev) => ({ ...prev, nicErr: "NIC field cannot be empty", nicBColor: "#F00", valid: false }));
        } else if ((/^\d{12}$/.test(users.Nic))) {
            setErrors((prev) => ({ ...prev, nicErr: "", nicBColor: "#FAA41E" }));
        } else if (users.Nic.length == 10) {
            if (!(users.Nic.charAt(9) == "V" || users.Nic.charAt(9) == "v")) {
                setErrors((prev) => ({ ...prev, nicErr: "Invalid NIC", nicBColor: "#F00", valid: false }));
            } else {
                setErrors((prev) => ({ ...prev, nicErr: "", nicBColor: "#FAA41E" }));
            }
        } else {
            setErrors((prev) => ({ ...prev, nicErr: "Invalid NIC", nicBColor: "#F00", valid: false }));
        }

        if (users.Email == "") {
            setErrors((prev) => ({ ...prev, emailErr: "E-mail field cannot be empty", emailBColor: "#F00", valid: false }));
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users.Email))) {
            setErrors((prev) => ({ ...prev, emailErr: "Invalid E-Mail", emailBColor: "#F00", valid: false }));
        } else if (errors.emailValid == true) {
            setErrors((prev) => ({ ...prev, emailErr: "", emailBColor: "#FAA41E" }));
        }

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
        if (errors.valid && errors.emailValid) {
            try {
                //Store user entered values in Async Storage
                await AsyncStore.multiSet([['Fname', users.Fname], ['Lname', users.Lname], ['AddFLine', users.AddFLine], ['AddSLine', users.AddSLine], ['Street', users.Street], ['City', users.City], ['PCode', users.PCode], ['MobNum', users.MobNum], ['FixedNum', users.FixedNum], ['Nic', users.Nic], ['Email', users.Email], ['Pword', users.Pword]]);
                props.navigation.navigate("Vehicle");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Foundatin name="address-book" size={82} color="#FAA41E" style={intStyles.icon} />
                <Text style={[intStyles.title]}>Sign Up</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeCircle}>
                        <Text style={intStyles.activeCircleFont}>1</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.disableLine} />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.disableCircle}>
                        <Text style={intStyles.activeCircleFont}>2</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.disableLine} />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.disableCircle}>
                        <Text style={intStyles.activeCircleFont}>3</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={intStyles.stepText}>
                        Basic Info
                    </Text>
                </View>
                <View style={{ flex: 3, alignItems: "center" }}>
                    <Text style={intStyles.stepText}>
                        Vehicles Details
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={intStyles.stepText}>
                        Complete
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ ...intStyles.formInput, ...{ marginTop: 15, borderColor: errors.fnameBColor } }}>
                        <TextInput placeholder="First Name" onChangeText={(value) => handleChange("Fname", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    {errors.fNameEmptyErr != "" ? <Text style={intStyles.errTxt}>{errors.fNameEmptyErr}</Text> : null}

                    <View style={intStyles.formInput}>
                        <TextInput placeholder="Last Name" onChangeText={(value) => handleChange("Lname", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.addFLineBColor } }}>
                        <TextInput placeholder={"Address (First Line)"} onChangeText={(value) => handleChange("AddFLine", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    {errors.addFLineErr != "" ? <Text style={intStyles.errTxt}>{errors.addFLineErr}</Text> : null}

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.addSLineBColor } }}>
                        <TextInput placeholder={"Address (Second Line)"} onChangeText={(value) => handleChange("AddSLine", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    {errors.addSLineErr != "" ? <Text style={intStyles.errTxt}>{errors.addSLineErr}</Text> : null}

                    <View style={intStyles.formInput}>
                        <TextInput placeholder={"Street"} onChangeText={(value) => handleChange("Street", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>

                    <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }}>
                        <View style={{ width: "49%" }}>
                            <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start", borderColor: errors.cityBColor } }}>
                                <TextInput placeholder={"City"} onChangeText={(value) => handleChange("City", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                            </View>
                            {errors.cityErr != "" ? <Text style={{ ...intStyles.errTxt, ...{ marginLeft: 0 } }}>{errors.cityErr}</Text> : null}
                        </View>

                        <View style={{ width: "49%", marginLeft: 5 }}>
                            <View style={{ ...intStyles.formInput, ...{ width: "100%", marginHorizontal: 0, borderColor: errors.pCodeBColor } }}>
                                <TextInput placeholder={"Postal Code"} onChangeText={(value) => handleChange("PCode", value)} placeholderTextColor="#A5A5A5" keyboardType="numeric" maxLength={5} style={intStyles.inputText} />
                            </View>
                            {errors.pCodeErr != "" ? <Text style={{ ...intStyles.errTxt, ...{ marginLeft: 0 } }}>{errors.pCodeErr}</Text> : null}
                        </View>
                    </View>

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.mobNumBColor } }}>
                        <TextInput placeholder={"Mobile number"} onChangeText={(value) => handleChange("MobNum", value)} placeholderTextColor="#A5A5A5" keyboardType="phone-pad" maxLength={12} style={intStyles.inputText} />
                    </View>
                    {errors.mobNumErr != "" ? <Text style={intStyles.errTxt}>{errors.mobNumErr}</Text> : null}

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.fixedNumBColor } }}>
                        <TextInput placeholder={"Fixed Line (Optional)"} onChangeText={(value) => handleChange("FixedNum", value)} placeholderTextColor="#A5A5A5" keyboardType="phone-pad" maxLength={12} style={intStyles.inputText} />
                    </View>
                    {errors.fixedNumErr != "" ? <Text style={intStyles.errTxt}>{errors.fixedNumErr}</Text> : null}

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.nicBColor } }}>
                        <TextInput placeholder={"NIC"} onChangeText={(value) => handleChange("Nic", value)} placeholderTextColor="#A5A5A5" maxLength={12} style={intStyles.inputText} />
                    </View>
                    {errors.nicErr != "" ? <Text style={intStyles.errTxt}>{errors.nicErr}</Text> : null}

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.emailBColor } }}>
                        <TextInput placeholder={"E-Mail"} onChangeText={(value) => handleEmail("Email", value)} placeholderTextColor="#A5A5A5" autoCapitalize="none" keyboardType="email-address" maxLength={70} style={intStyles.inputText} />
                    </View>
                    {errors.emailErr != "" ? <Text style={intStyles.errTxt}>{errors.emailErr}</Text> : null}

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.pWordBColor } }}>
                        <TextInput placeholder={"Password"} onChangeText={(value) => handleChange("Pword", value)} placeholderTextColor="#A5A5A5" autoCapitalize="none" style={intStyles.inputText} secureTextEntry={true} />
                    </View>
                    {errors.pWordErr != "" ? <Text style={intStyles.errTxt}>{errors.pWordErr}</Text> : null}

                    <View style={{ ...intStyles.formInput, ...{ borderColor: errors.conPWordBColor } }}>
                        <TextInput placeholder={"Re-enter password"} placeholderTextColor="#A5A5A5" autoCapitalize="none" style={intStyles.inputText} onChangeText={(value) => handleChange("conPWord", value)} secureTextEntry={true} />
                    </View>
                    {errors.conPWordErr != "" ? <Text style={intStyles.errTxt}>{errors.conPWordErr}</Text> : null}
                </View>
            </ScrollView>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "500", fontSize: 16, color: "#A5A5A5", marginTop: 10 }}>Already have an account?
                    <Text onPress={() => props.navigation.navigate('Login')} style={{ color: "#FAA41E" }} > Sign in</Text>
                </Text>
            </View>
            <View style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}>
                <Button title={"Next"} onPress={handleClick} />
            </View>
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
    activeCircle: {
        height: 48,
        width: 48,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: "#FAA41E",
        justifyContent: "center",
        alignItems: "center"
    },

    disableCircle: {
        height: 48,
        width: 48,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: "#7D7E7E",
        justifyContent: "center",
        alignItems: "center"
    },

    activeCircleFont: {
        fontSize: 30,
        fontWeight: "500",
        color: "#7D7E7E"
    },

    disableLine: {
        width: 68,
        height: 2,
        backgroundColor: "#7D7E7E",
        marginHorizontal: 20
    },

    stepText: {
        fontSize: 15,
        color: "#7D7E7E"
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
        marginTop: 10
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
    }
});

export default SignupOne;