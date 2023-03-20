import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, ScrollView, TextInput, Pressable } from "react-native";
import extStyles from "../styles/extStyles";
import Foundatin from "react-native-vector-icons/Foundation";
import Ant from "react-native-vector-icons/AntDesign";
import Button from "../Components/Button";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStore from "@react-native-async-storage/async-storage";

const Vehicle = props => {

    const handleClick = async e => {
        try{
            await AsyncStore.multiSet([['Vehicle1',selected.Vehicle1],['Vehicle2',selected.Vehicle2],['Vehicle3',selected.Vehicle3],['Vehicle4',selected.Vehicle4],['Vehicle5',selected.Vehicle5],['Vno1',vehicle.Vno1],['Vno2',vehicle.Vno2],['Vno3',vehicle.Vno3],['Vno4',vehicle.Vno4],['Vno5',vehicle.Vno5]]);
            props.navigation.navigate("VerMob");
        }catch(err){
            console.log(err);
        } 
    };

    const [selected, setSelected] = useState({
        Vehicle1: "",
        Vehicle2: "",
        Vehicle3: "",
        Vehicle4: "",
        Vehicle5: ""
    });


    const data = [
        { label: '1', value: 'Car' },
        { label: '2', value: 'Van' },
        { label: '3', value: 'Lorry' },
        { label: '4', value: 'Cab' },
    ]

    const [vehicle, setVehicle] = useState({
        Vno1: "",
        Vno2: "",
        Vno3: "",
        Vno4: "",
        Vno5: ""

    });

    const handleSelect = (name, value) => {
        setSelected((prev) => ({...prev,[name]: value}));
    };

    const handleChange = (name, value) => {
        setVehicle((prev) => ({...prev,[name]: value}));
    };

    console.log(vehicle);
    console.log(selected);

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
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start" } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno1', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle1",value)} placeholder={"Vehicle Type"} boxStyles={intStyles.boxStyles} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value2" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start" } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno2', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle2",value)} placeholder={"Vehicle Type"} boxStyles={intStyles.boxStyles} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value2" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start" } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno3', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle3",value)} placeholder={"Vehicle Type"} boxStyles={intStyles.boxStyles} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value3" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start" } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno4', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle4",value)} placeholder={"Vehicle Type"} boxStyles={intStyles.boxStyles} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value4" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "90%", marginHorizontal: 20 }}>
                    <View style={{ width: "49%" }}>
                        <View style={{ ...intStyles.formInput, ...{ width: "100%", alignItems: "flex-start" } }}>
                            <TextInput placeholder={"Vehicle No."} onChangeText={(value) => handleChange('Vno5', value)} placeholderTextColor="#A5A5A5" style={intStyles.inputText} />
                        </View>
                    </View>
                    <View style={{ width: "49%", marginLeft: 5 }}>
                        <SelectList setSelected={(value) => handleSelect("Vehicle5",value)} placeholder={"Vehicle Type"} boxStyles={intStyles.boxStyles} dropdownTextStyles={intStyles.dropdownTextStyles} inputStyles={intStyles.inputStyles} search={false} data={data} save="value5" />
                    </View>
                </View>
            </ScrollView>
            <View style={{ width: "90%", alignSelf: "center", marginVertical: 20 }}>
                <Button title={"Next"} onPress={handleClick}/>
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
    }
});