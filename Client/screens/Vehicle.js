//Vehicle registering form

import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, ScrollView, TextInput, Pressable } from "react-native";
import extStyles from "../styles/extStyles";
import Foundatin from "react-native-vector-icons/Foundation";
import Ant from "react-native-vector-icons/AntDesign";
import Button from "../Components/Button";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStore from "@react-native-async-storage/async-storage";

const Vehicle = props => {

    //Select list values
    const data = [
        { label: '1', value: 'Car' },
        { label: '2', value: 'Van' },
        { label: '3', value: 'Lorry' },
        { label: '4', value: 'Cab' },
    ]

    //State variable for store user selected vehicle type
    const [selected, setSelected] = useState({
        Vehicle1: "",
        Vehicle2: "",
        Vehicle3: "",
        Vehicle4: "",
        Vehicle5: ""
    });

    //State variable for store user entered vehicle number
    const [vehicle, setVehicle] = useState({
        Vno1: "",
        Vno2: "",
        Vno3: "",
        Vno4: "",
        Vno5: ""
    });

    //State variable for form validation
    const [errors, setErrors] = useState({
        vNo1BColor: "#68BB59",
        vType1BColor: "#68BB59",
        vNo2BColor: "#212121",
        vType2BColor: "#212121",
        enableBox2: "none",
        vNo3BColor: "#212121",
        vType3BColor: "#212121",
        enableBox3: "none",
        vNo4BColor: "#212121",
        vType4BColor: "#212121",
        enableBox4: "none",
        vNo5BColor: "#212121",
        vType5BColor: "#212121",
        enableBox5: "none",
        errText: "",
        valid: false,
    });

    //Set values to Selected state variable
    const handleSelect = (name, value) => {
        setSelected((prev) => ({ ...prev, [name]: value }));
    };

    //Set values to Vehicle state variable
    const handleChange = (name, value) => {
        setVehicle((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, valid: false }));
    };

    //Vehicle number and type validation function
    const isValid = () => {
        if (vehicle.Vno1 == "" && selected.Vehicle1 == "") {
            setErrors((prev) => ({ ...prev, valid: false, errText: "Minimum one vehicle details is required!", vNo1BColor: "#F00", vType1BColor: "#F00" }));
        } else if (vehicle.Vno1 != "" && selected.Vehicle1 == "") {
            setErrors((prev) => ({ ...prev, valid: false, errText: "Please select vehicle type!", vNo1BColor: "#FAA41E", vType1BColor: "#F00" }));
        } else if (vehicle.Vno1 == "" && selected.Vehicle1 != "") {
            setErrors((prev) => ({ ...prev, valid: false, errText: "Please input vehicle number!", vNo1BColor: "#F00", vType1BColor: "#FAA41E" }));
        } else if (vehicle.Vno1.length < 10 || vehicle.Vno1.length > 11) {
            setErrors((prev) => ({ ...prev, valid: false, errText: "Invalid vehicle number! Eg:WP TA-5334", vNo1BColor: "#F00", vType1BColor: "#FAA41E" }));
        } else {
            setErrors((prev) => ({ ...prev, valid: true, errText: "", vNo1BColor: "#FAA41E", vType1BColor: "#FAA41E", enableBox2: "auto", vNo2BColor: "#68BB59", vType2BColor: "#68BB59" }));

            //Second vehicle details validation
            if (vehicle.Vno2 != "" || selected.Vehicle2 != "") {
                if (selected.Vehicle2 == "") {
                    setErrors((prev) => ({ ...prev, valid: false, errText: "Please select vehicle type!", vNo2BColor: "#FAA41E", vType2BColor: "#F00" }));
                } else if (vehicle.Vno2 == "") {
                    setErrors((prev) => ({ ...prev, valid: false, errText: "Please input vehicle number!", vNo2BColor: "#F00", vType2BColor: "#FAA41E" }));
                } else if (vehicle.Vno2.length < 10 || vehicle.Vno2.length > 11) {
                    setErrors((prev) => ({ ...prev, valid: false, errText: "Invalid vehicle number! Eg:WP TA-5334", vNo2BColor: "#F00", vType2BColor: "#FAA41E" }));
                } else {
                    setErrors((prev) => ({ ...prev, valid: true, errText: "", vNo2BColor: "#FAA41E", vType2BColor: "#FAA41E", enableBox3: "auto", vNo3BColor: "#68BB59", vType3BColor: "#68BB59" }));

                    //Third vehicle details validation
                    if (vehicle.Vno3 != "" || selected.Vehicle3 != "") {
                        if (selected.Vehicle3 == "") {
                            setErrors((prev) => ({ ...prev, valid: false, errText: "Please select vehicle type!", vNo3BColor: "#FAA41E", vType3BColor: "#F00" }));
                        } else if (vehicle.Vno3 == "") {
                            setErrors((prev) => ({ ...prev, valid: false, errText: "Please input vehicle number!", vNo3BColor: "#F00", vType3BColor: "#FAA41E" }));
                        } else if (vehicle.Vno3.length < 10 || vehicle.Vno3.length > 11) {
                            setErrors((prev) => ({ ...prev, valid: false, errText: "Invalid vehicle number! Eg:WP TA-5334", vNo3BColor: "#F00", vType3BColor: "#FAA41E" }));
                        } else {
                            setErrors((prev) => ({ ...prev, valid: true, errText: "", vNo3BColor: "#FAA41E", vType3BColor: "#FAA41E", enableBox4: "auto", vNo4BColor: "#68BB59", vType4BColor: "#68BB59" }));
                        }

                        //Fourth vehicle details validation
                        if (vehicle.Vno4 != "" || selected.Vehicle4 != "") {
                            if (selected.Vehicle4 == "") {
                                setErrors((prev) => ({ ...prev, valid: false, errText: "Please select vehicle type!", vNo4BColor: "#FAA41E", vType4BColor: "#F00" }));
                            } else if (vehicle.Vno4 == "") {
                                setErrors((prev) => ({ ...prev, valid: false, errText: "Please input vehicle number!", vNo4BColor: "#F00", vType4BColor: "#FAA41E" }));
                            } else if (vehicle.Vno4.length < 10 || vehicle.Vno4.length > 11) {
                                setErrors((prev) => ({ ...prev, valid: false, errText: "Invalid vehicle number! Eg:WP TA-5334", vNo4BColor: "#F00", vType4BColor: "#FAA41E" }));
                            } else {
                                setErrors((prev) => ({ ...prev, valid: true, errText: "", vNo4BColor: "#FAA41E", vType4BColor: "#FAA41E", enableBox5: "auto", vNo5BColor: "#68BB59", vType5BColor: "#68BB59" }));

                                //Fifth vehicle details validation
                                if (vehicle.Vno5 != "" || selected.Vehicle5 != "") {
                                    if (selected.Vehicle5 == "") {
                                        setErrors((prev) => ({ ...prev, valid: false, errText: "Please select vehicle type!", vNo5BColor: "#FAA41E", vType5BColor: "#F00" }));
                                    } else if (vehicle.Vno5 == "") {
                                        setErrors((prev) => ({ ...prev, valid: false, errText: "Please input vehicle number!", vNo5BColor: "#F00", vType5BColor: "#FAA41E" }));
                                    } else if (vehicle.Vno5.length < 10 || vehicle.Vno5.length > 11) {
                                        setErrors((prev) => ({ ...prev, valid: false, errText: "Invalid vehicle number! Eg:WP TA-5334", vNo5BColor: "#F00", vType5BColor: "#FAA41E" }));
                                    } else {
                                        setErrors((prev) => ({ ...prev, valid: true, errText: "", vNo5BColor: "#FAA41E", vType5BColor: "#FAA41E" }));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //Submit button function
    const handleClick = async e => {
        isValid();
        if (errors.valid) {
            try {
                //If form valid store user entered value in Async storage
                await AsyncStore.multiSet([['Vehicle1', selected.Vehicle1], ['Vehicle2', selected.Vehicle2], ['Vehicle3', selected.Vehicle3], ['Vehicle4', selected.Vehicle4], ['Vehicle5', selected.Vehicle5], ['Vno1', vehicle.Vno1], ['Vno2', vehicle.Vno2], ['Vno3', vehicle.Vno3], ['Vno4', vehicle.Vno4], ['Vno5', vehicle.Vno5]]);
                props.navigation.navigate("VerMob");
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Foundatin name="address-book" size={82} color="#FAA41E" style={intStyles.icon} />
                <Text style={[intStyles.title]}>Sign Up</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeCircle}>
                        <Ant name="check" size={32} color="#FAA41E" />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeLine} />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={intStyles.activeCircle}>
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
            <View style={{ flexDirection: "row" }}>
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
                <View style={{ height: 200, justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <Image source={require("../src/assets/Citydriver-pana.png")} style={intStyles.mainImage} />
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start", borderColor: errors.vNo1BColor } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno1', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle1", value)} placeholder={"Vehicle Type"} boxStyles={{ ...intStyles.boxStyles, ...{ borderColor: errors.vType1BColor } }} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value1" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }} pointerEvents={errors.enableBox2}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start", borderColor: errors.vNo2BColor } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno2', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle2", value)} placeholder={"Vehicle Type"} boxStyles={{ ...intStyles.boxStyles, ...{ borderColor: errors.vType2BColor } }} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value2" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }} pointerEvents={errors.enableBox3}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start", borderColor: errors.vNo3BColor } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno3', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle3", value)} placeholder={"Vehicle Type"} boxStyles={{ ...intStyles.boxStyles, ...{ borderColor: errors.vType3BColor } }} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value3" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }} pointerEvents={errors.enableBox4}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start", borderColor: errors.vNo4BColor } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno4', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle4", value)} placeholder={"Vehicle Type"} boxStyles={{ ...intStyles.boxStyles, ...{ borderColor: errors.vType4BColor } }} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value4" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }} pointerEvents={errors.enableBox5}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start", borderColor: errors.vNo5BColor } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno5', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle5", value)} placeholder={"Vehicle Type"} boxStyles={{ ...intStyles.boxStyles, ...{ borderColor: errors.vType5BColor } }} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value5" />
                    </View>
                </View>
            </ScrollView>
            <View style={{ width: "90%", alignSelf: "center", marginVertical: 20 }}>
                {errors.valid == false ? <View style={intStyles.errView}>
                    <Text style={intStyles.errText}>{errors.errText}</Text>
                </View> : null}
                <Button title={"Next"} onPress={handleClick} />
            </View>
        </SafeAreaView>

    );
};

export default Vehicle;

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

    activeLine: {
        width: 68,
        height: 4,
        backgroundColor: "#FAA41E",
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
        marginVertical: 5,
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

    mainImage: {
        width: "80%",
        height: "80%",
        resizeMode: "contain",
        alignSelf: "center",
        marginVertical: 15
    },

    boxStyles: {
        height: 50,
        alignSelf: "baseline",
        width: "100%",
        borderWidth: 1,
        borderColor: "#212121",
        marginTop: 10,
    },

    dropdownTextStyles: {
        color: "#000",
        fontSize: 20,
    },

    inputStyles: {
        fontSize: 19,
    },

    errView: {
        alignSelf: "center",
        alignItems: "center",
        height: 15,
        width: "100%",
        height: 20,
        marginBottom: 5,
    },

    errText: {
        fontSize: 15,
        color: "#F00",
        fontWeight: "bold"
    }

});