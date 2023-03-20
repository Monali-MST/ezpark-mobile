import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import extStyles from "../styles/extStyles";
import Foundatin from "react-native-vector-icons/Foundation";
import axios from "axios";
import AsyncStore from "@react-native-async-storage/async-storage";
import Button from "./../Components/Button";

const SignupOne = props => {

    const [users, setUsers] = useState({
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
    });


    const handleChange = (name, value) => {
        setUsers((prev) => ({ ...prev, [name]: value }));
    };

    //console.log(users);

    const handleClick = async e => {
        try {
            //await axios.post("http://10.0.2.2:8800/user", users);
            await AsyncStore.multiSet([['Fname', users.Fname], ['Lname', users.Lname], ['AddFLine', users.AddFLine], ['AddSLine', users.AddSLine], ['Street', users.Street], ['City', users.City], ['PCode', users.PCode], ['MobNum', users.MobNum], ['FixedNum', users.FixedNum], ['Nic', users.Nic], ['Email', users.Email], ['Pword', users.Pword]]);
            props.navigation.navigate("Vehicle");
        } catch (err) {
            console.log(err);
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
                    <View style={{ ...intStyles.formInput, ...{ marginTop: 15 } }}>
                        <TextInput placeholder="First Name" onChangeText={(value) => handleChange("Fname", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder="Last Name" onChangeText={(value) => handleChange("Lname", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Address (First Line)"} onChangeText={(value) => handleChange("AddFLine", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Address (Second Line)"} onChangeText={(value) => handleChange("AddSLine", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Street"} onChangeText={(value) => handleChange("Street", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }}>
                        <View style={{ width: "49%" }}>
                            <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start" } }}>
                                <TextInput placeholder={"City"} onChangeText={(value) => handleChange("City", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                            </View>
                        </View>
                        <View style={{ width: "49%", marginLeft: 5 }}>
                            <View style={{ ...intStyles.formInput, ...{ width: "100%", marginHorizontal: 0 } }}>
                                <TextInput placeholder={"Postal Code"} onChangeText={(value) => handleChange("PCode", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                            </View>
                        </View>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Mobile number"} onChangeText={(value) => handleChange("MobNum", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Fixed Line (Optional)"} onChangeText={(value) => handleChange("FixedNum", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"NIC"} onChangeText={(value) => handleChange("Nic", value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"E-Mail"} onChangeText={(value) => handleChange("Email", value)} placeholderTextColor="#A5A5A5" autoCapitalize="none" style={intStyles.inputText} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Password"} onChangeText={(value) => handleChange("Pword", value)} placeholderTextColor="#A5A5A5" autoCapitalize="none" style={intStyles.inputText} secureTextEntry={true} />
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Re-enter password"} placeholderTextColor="#A5A5A5" autoCapitalize="none" style={intStyles.inputText} secureTextEntry={true} />
                    </View>
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
        marginTop: 20
    },
    inputText: {
        fontSize: 20,
        color: "#212121",
        width: "95%",
        marginHorizontal: "2.5%"
    },

});

export default SignupOne;