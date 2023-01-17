import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Foundation from 'react-native-vector-icons/Foundation';
import extStyles from "../styles/extStyles";

const TandC = props => {
    return(
        <SafeAreaView style={[extStyles.body]}>
            <View style={{flex:.7}}>
                <View style={[intStyles.titleView]}>
                    <Foundation name="book-bookmark" size={82} color="#FAA41E" style={intStyles.icon}/>
                    <Text style={[intStyles.title]}>Terms{'\n'}of Service</Text>
                </View>
            </View>
            <View style={{flex:4.8}}>
                <ScrollView style={{height:"100%"}} showsVerticalScrollIndicator={false}>
                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            Introduction
                        </Text>
                        <Text style={[intStyles.para]}>
                            These terms and conditions ("Term") govern your use of the Parking App ("App") and the services provided through the App (collectively, the "Services"). Please read these Terms carefully before using the Services. By accessing or using the Services, you agree to be bound by these Terms and our privacy policy, which can be found at [insert link to privacy policy]. If you do not agree to these Terms, you may not use the Services.
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            License to Use the App
                        </Text>
                        <Text style={[intStyles.para]}>
                            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use the App on your personal device. You may not use the App for any commercial purpose or for the benefit of any third party.
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            Use of the Services
                        </Text>
                        <Text style={[intStyles.para]}>
                        The Services allow you to locate and reserve parking spaces in various locations. You may use the Services only for personal, non-commercial purposes. You may not use the Services for any illegal or unauthorized purpose. By using the Services, you agree to comply with all applicable laws and regulations.
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            Reservations
                        </Text>
                        <Text style={[intStyles.para]}>
                            When you make a reservation through the App, you are entering into a binding contract with the owner or operator of the parking space ("Provider"). The Provider is responsible for the parking space and any services or amenities provided in connection with the space. We are not responsible for the actions or inactions of the Provider or for any issues that may arise in connection with your use of the parking space.
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            Fees and Payment
                        </Text>
                        <Text style={[intStyles.para]}>
                        You are responsible for paying all fees associated with your use of the Services, including any fees charged by the Provider for the use of the parking space. All fees are non-refundable, unless otherwise required by law. You agree to pay all applicable taxes in connection with your use of the Services.
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            What is Lorem Ipsum?
                        </Text>
                        <Text style={[intStyles.para]}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            Where does it come from?
                        </Text>
                        <Text style={[intStyles.para]}>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            Why do we use it?se it?e from?
                        </Text>
                        <Text style={[intStyles.para]}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Text>
                    </View>

                    <View style={intStyles.contView}>
                        <Text style={[intStyles.subTitle]}>
                            Where can I get some?
                        </Text>
                        <Text style={[intStyles.para]}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </Text>
                    </View>

                </ScrollView>
            </View>
            <View style={{flex:.5, flexDirection:"row", justifyContent:"center"}}>
                <TouchableOpacity  style={{...intStyles.button,...{backgroundColor:"#000"}}} activeOpacity={0.8} onPress={() => props.navigation.navigate("Login")}>
                        <Text style={{color:"#fff", fontSize:20, fontWeight:"bold"}}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={{...intStyles.button,...{backgroundColor:"#FAA41E"}}} activeOpacity={0.8} onPress={() => props.navigation.navigate("SignupOne")}>
                    <Text style={{color:"#000", fontSize:20, fontWeight:"bold"}}>Agree</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({
    titleView:{
        flexDirection:"row",
        marginVertical:5,
    },

    icon:{
        marginLeft:10,
        marginRight:5,
        height:"100%"
    },

    title:{
        fontSize:36,
        fontWeight:"900",
        color:"#FAA41E",
        lineHeight:40,
    },

    subTitle:{
        fontSize:14,
        fontWeight:"bold",
        color:"#000"
    },

    para:{
        fontSize:11,
        color:"#7D7E7E",
        textAlign:"justify"
    },

    contView:{
        marginHorizontal:10,
        marginBottom:12
    },

    button:{
    width:"25%",
    height:45,
    borderRadius:20,
    marginVertical:10,
    marginHorizontal:5,
    justifyContent:"center",
    alignItems:"center"
    },
})

export default TandC;