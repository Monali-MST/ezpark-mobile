import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import extStyles from "../styles/extStyles";

const Zone = (props) => {
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <Text style={intStyles.titleText}>Select the parking zone you prefer</Text>
            </View>
            <View style={intStyles.imageContainer}>
                <Image source={require('./../src/assets/Select-bro.png')} style={intStyles.image} />
            </View>
            <View style={intStyles.zoneOuterContainer}>
                <View style={intStyles.zonePathContainer}>
                    <Image source={require('./../src/assets/zone_path.png')} style={intStyles.zonePath} />
                </View>
                <View style={[StyleSheet.absoluteFillObject, intStyles.zoneBtnContainer]}>
                    <View style={intStyles.zoneContainerDivider}>
                        <View style={intStyles.zoneSubDivider}>
                            <Pressable style={intStyles.btn} onPress={() => Alert.alert("Zone-C")}>
                                <Text style={intStyles.btnTxt}>
                                    Zone-C
                                </Text>
                                <Text style={[StyleSheet.absoluteFillObject, intStyles.three60]} onPress={() => Alert.alert("360 View")}>
                                    360° View
                                </Text>
                            </Pressable>
                        </View>
                        <View style={intStyles.zoneSubDivider}>
                            <Pressable style={intStyles.btn} onPress={() => Alert.alert("Zone-D")}>
                                <Text style={intStyles.btnTxt}>
                                    Zone-D
                                </Text>
                                <Text style={[StyleSheet.absoluteFillObject, intStyles.three60]} onPress={() => Alert.alert("360 View")}>
                                    360° View
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={intStyles.zoneContainerDivider}>
                        <View style={intStyles.zoneSubDivider}>
                            <Pressable style={intStyles.btn} onPress={() => Alert.alert("Zone-A")}>
                                <Text style={intStyles.btnTxt}>
                                    Zone-A
                                </Text>
                                <Text style={[StyleSheet.absoluteFillObject, intStyles.three60]} onPress={() => Alert.alert("360 View")}>
                                    360° View
                                </Text>
                            </Pressable>
                        </View>
                        <View style={intStyles.zoneSubDivider}>
                            <Pressable style={intStyles.btn} onPress={() => Alert.alert("Zone-B")}>
                                <Text style={intStyles.btnTxt}>
                                    Zone-B
                                </Text>
                                <Text style={[StyleSheet.absoluteFillObject, intStyles.three60]} onPress={() => Alert.alert("360 View")}>
                                    360° View
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

const intStyles = StyleSheet.create({
    three60: {
        textAlignVertical:"bottom",
        textAlign: "center",
        height: 20,
        marginTop: 110,
        fontSize: 13,
        fontWeight: "bold",
        color: "#0062BC"
    },
    btnTxt: {
        fontSize: 32,
        color: "#000",
        fontWeight: "bold",
    },

    btn: {
        width: 152,
        height: 152,
        backgroundColor: "#FAA41E",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: 10
    },

    zoneSubDivider: {
        height: "100%",
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    zoneContainerDivider: {
        height: "50%",
        width: "100%",
        flexDirection: "row"
    },

    zoneBtnContainer: {
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        paddingVertical: 40
    },

    zonePath: {
        resizeMode: "contain",
        width: "90%",
        height: "90%",
    },

    zonePathContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    zoneOuterContainer: {
        height: "65%",
        width: "100%",
    },

    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "12%"
    },

    titleText: {
        fontSize: 36,
        textAlign: "center",
        fontWeight: "900",
        color: "#FAA41E",
        marginHorizontal: 20
    },

    imageContainer: {
        width: "100%",
        height: "23%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    image: {
        resizeMode: "contain",
        width: "100%",
        height: "100%",
    }
})

export default Zone;
