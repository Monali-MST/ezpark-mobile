import React from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TextInput, Pressable,Alert } from "react-native";
import extStyles from "../styles/extStyles";
import Foundatin from "react-native-vector-icons/Foundation";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

const Labels=['Basic Info','Vehicles Details', 'Complete'];


const SignupOne= props => {
    return(
       <SafeAreaView style={[extStyles.body]}>
            <View style={{flex:.7}}>
                <View style={intStyles.titleView}>
                    <Foundatin name="address-book" size={82} color="#FAA41E" style={intStyles.icon}/>
                    <Text style={[intStyles.title]}>Sign Up</Text>
                </View>
            </View>
            <View style={{flex:.6, justifyContent:"center"}}>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <View style={intStyles.activeCircle}>
                        <Text style={intStyles.activeCircleFont}>1</Text>
                    </View>
                    <View style={intStyles.disableLine}/>
                    <View style={intStyles.disableCircle}>
                        <Text style={intStyles.activeCircleFont}>2</Text>
                    </View>
                    <View style={intStyles.disableLine}/>
                    <View style={intStyles.disableCircle}>
                        <Text style={intStyles.activeCircleFont}>3</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{width:"33%", alignItems:"flex-start", paddingLeft:8}}>
                        <Text style={intStyles.stepText}>
                            Basic Info
                        </Text>
                    </View>
                    <View  style={{width:"33%",  alignItems:"center"}}>
                        <Text style={intStyles.stepText}>
                            Vehicles Details
                        </Text>
                    </View>
                    <View  style={{width:"33%", alignItems:"flex-end", paddingRight:5}}> 
                        <Text style={intStyles.stepText}>
                            Complete
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{flex:3.9}}>
                <ScrollView style={{height:"100%"}} showsVerticalScrollIndicator={false}>
                    <View style={{...intStyles.formInput, ...{marginTop:15}}}>
                        <TextInput placeholder="First Name" placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder="Last Name" placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Address (First Line)"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Address (Second Line)"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Street"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={{flexDirection:"row", width:"90%", marginHorizontal:20}}>
                        <View style={{width:"49%"}}>
                        <View style={{...intStyles.formInput,...{width:"100%", alignItems:"flex-start"}}}>
                            <TextInput placeholder={"Street"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                        </View>
                        </View>
                        <View style={{width:"49%", marginLeft:5}}>
                        <View style={{...intStyles.formInput,...{width:"100%", marginHorizontal:0}}}>
                            <TextInput placeholder={"Postal Code"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                        </View>
                        </View>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Mobile number 1"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Mobile number 2"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Fixed Line (Optional)"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"E-Mail"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Password"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                    <View style={[intStyles.formInput]}>
                        <TextInput placeholder={"Re-enter password"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                    </View>
                </ScrollView>
            </View>
            <View style={{flex:.8}}>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontWeight:"500", fontSize:16, color:"#A5A5A5", marginTop:10}}>Already have an account?
                        <Text onPress={() => props.navigation.navigate('Login')} style={{color:"#FAA41E"}} > Sign in</Text>
                    </Text>
                </View>
                <View style={{width:"90%", alignSelf:"center", marginTop:10}}>
                    <Pressable onPress={() => Alert.alert('This is next button')} 
                    style={({ pressed })=>[
                    intStyles.button,
                    pressed && {opacity:.8}
                    ]}>
                    {({ pressed }) => { 
                        return(
                        <Text style={[intStyles.btnTxt, pressed && {opacity:.8}]}>Next</Text>
                        );
                    }} 
                    </Pressable>
                </View>
            </View>
       </SafeAreaView>
    );
}

const intStyles= StyleSheet.create({
    activeCircle:{
        height:48,
        width: 48,
        borderRadius:48,
        borderWidth:2,
        borderColor:"#FAA41E",
        justifyContent:"center",
        alignItems:"center"
    },

    disableCircle:{
        height:48,
        width: 48,
        borderRadius:48,
        borderWidth:2,
        borderColor:"#7D7E7E",
        justifyContent:"center",
        alignItems:"center"
    },

    activeCircleFont:{
        fontSize:30,
        fontWeight:"500",
        color:"#7D7E7E"
    },

    disableLine:{
        width:68,
        height:2,
        backgroundColor:"#7D7E7E",
        marginHorizontal:20
    },  

    stepText:{
        fontSize:15,
        color:"#7D7E7E"
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

    titleView:{
        flexDirection:"row",
        marginVertical:5,
        alignItems:"center"
    },
    formInput:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#212121",
        borderRadius: 10,
        marginHorizontal: 10,
        height:50,
        width:"90%",
        alignSelf:"center",
        marginTop: 20
      },
      inputText:{
        fontSize:20,
        color:"#212121",
        width:"95%",
        marginHorizontal:"2.5%"
      }, 

      button:{
        height:54,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FAA41E"
      },
    
      btnTxt:{
        color:"#000",
        fontSize:20,
        fontWeight:"bold"
      },
});

const nxtBtn={width:120, backgroundColor:"#FAA41E", alignItems:"center", borderRadius: 20};
const nxtBtnTxt={fontSize:20, fontWeight:"bold", color:"#000"};
const prvBtn={width:120, backgroundColor:"#000", alignItems:"center", borderRadius:20};
const prvBtnTxt={fontSize:20, fontWeight:"bold", color:"#fff"};



export default SignupOne;


{/*<View style={{flex:5.3}}>
                <ProgressSteps topOffset={20} marginBottom={10} activeStepIconBorderColor={"#FAA41E"} completedProgressBarColor={"#FAA41E"} completedStepIconColor={"#FAA41E"} activeLabelColor={"#FAA41E"} completedLabelColor={"#FAA41E"}>
                    <ProgressStep label="Basic Info" nextBtnStyle={nxtBtn} nextBtnTextStyle={nxtBtnTxt}>
                        <View>
                            <ScrollView>
                                <View style={{...intStyles.formInput, ...{marginTop:15}}}>
                                    <TextInput placeholder="First Name" placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                                </View>
                                <View style={[intStyles.formInput]}>
                                    <TextInput placeholder="Last Name" placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                                </View>
                                <View style={[intStyles.formInput]}>
                                    <TextInput placeholder={"Address (First Line)"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                                </View>
                                <View style={[intStyles.formInput]}>
                                    <TextInput placeholder={"Address (Second Line)"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                                </View>
                                <View style={[intStyles.formInput]}>
                                    <TextInput placeholder={"Street"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                                </View>
                                    <View style={{...intStyles.formInput,...{width:"40%"}}}>
                                        <TextInput placeholder={"Street"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                                    </View>
                                    <View style={{...intStyles.formInput,...{width:"40%"}}}>
                                        <TextInput placeholder={"Street"} placeholderTextColor="#A5A5A5" style={intStyles.inputText}/>
                                    </View>
                            </ScrollView>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Text style={{fontWeight:"500", fontSize:16, color:"#A5A5A5"}}>Already have an account?
                                <Text onPress={() => props.navigation.navigate('Login')} style={{color:"#FAA41E"}} > Sign in</Text>
                            </Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Vehicle Details" nextBtnStyle={nxtBtn} nextBtnTextStyle={nxtBtnTxt} previousBtnStyle={prvBtn} previousBtnTextStyle={prvBtnTxt}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 2!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Complete" nextBtnStyle={nxtBtn} nextBtnTextStyle={nxtBtnTxt} previousBtnStyle={prvBtn} previousBtnTextStyle={prvBtnTxt}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 3!</Text>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
        </View>*/}