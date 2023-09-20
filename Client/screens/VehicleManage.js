import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Modal, Image, Alert, ScrollView } from "react-native";
import extStyles from "../styles/extStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { server } from "../Service/server_con";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';

const VehicleManage = props => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [showPopup, setShowPopUp] = useState(false);

    const [fetchedData, setFetchedData] = useState([]);

    const [vehicleID, setVehicleID] = useState();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem('AccessToken');
                const decoded = jwtDecode(token);
                const response = await axios.post(server + 'manageVehicles', { "userName": decoded.userName });
                if (response.data != 100) {
                    setFetchedData(response.data);
                    setLoading(false);
                } else {
                    setErrTitle("Oops...!!");
                    setErrContent("Something went wrong");
                    setLoading(false);
                    setError(true);
                }
            }catch(err){
                setErrTitle("Oops...!!");
                setErrContent("Something went wrong");
                setLoading(false);
                setError(true);
            }   
        };

        getData();
    }, []);

    const handleDelete = (vehicleID) => {
        setVehicleID(vehicleID);
        setShowPopUp(true);
    };

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleView}>
                <Ionicons name="md-car-sport-sharp" color={"#FAA41E"} size={82} style={intStyles.icon} />
                <Text style={intStyles.title}>My Vehicle{'\n'}Details</Text>
            </View>
            <View style={{height: "89%"}}>
                <View style={intStyles.scrollViewContainer}>
                    <ScrollView style={{ height: "100%", width: "100%" }}>
                        {fetchedData.map((element, index)=>(
                            <DetialsComponent key={index} vehicleID={element.VehicleID} vehicleNo={element.VehicleNo} vehicleType={element.VehicleType}  onDelete={handleDelete} />
                        ))
                        }
                    </ScrollView>
                </View>
                <View style={intStyles.btnContainner}>
                        <Button title={"Add New+"} onPress={()=>props.navigation.navigate("AddNewVehicle")} />
                </View>
            </View>
            {loading ? <AppLoader /> : null}
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
            {showPopup ? <Popup onHandleModal={setShowPopUp} onDelete={()=>{
                const deleteFunc = async e =>{
                    setLoading(true);
                    const response = await axios.post(server + 'deleteVehicle', {"vehicleID":vehicleID})
                    if(response.data==200){
                        props.navigation.navigate("Dashboard");
                    }else{
                        setErrTitle("Oops...!!");
                        setErrContent("Something went wrong");
                        setLoading(false);
                        setError(true);
                    }
                }
                setShowPopUp(true);
                deleteFunc();
            }}/> : null}
        </SafeAreaView>
    );
}

const DetialsComponent = ({ vehicleID, vehicleNo, vehicleType, onDelete }) => {

    return (
        <View style={intStyles.detailsContainer}>
            <View style={{ width: "70%", height: "100%", padding: 10 }}>
                <Text style={intStyles.carNo}>{vehicleNo}</Text>
                <Text style={intStyles.type}>{vehicleType}</Text>
            </View>
            <View style={{ width: "30%", height: "100%", justifyContent: "center" }}>
                <TouchableOpacity style={intStyles.btn} onPress={() => onDelete(vehicleID)}>
                    <Text style={intStyles.btnTxt}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Popup = ({ onHandleModal, onDelete }) => {
    const closeModal = () => {
        onHandleModal(false);
    }

    const handleDelete = async () => {
        await onDelete();
        closeModal();
    };

    return (
        <View style={intStyles.container}>
            <Modal visible={true} animationType="fade" transparent={true}>
                <View style={intStyles.modalContainer}>
                    <View style={intStyles.modalContent}>
                        <View style={{ width: "40%" }}>
                            <Image source={require("./../src/assets/yes_no.png")} style={intStyles.modalImage} />
                        </View>
                        <View style={{ width: "60%" }}>
                            <Text style={intStyles.modalHeading}>Are you sure?</Text>
                            <TouchableOpacity style={intStyles.changeBtn} onPress={handleDelete}>
                                <Text style={intStyles.changeBtnTxt}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={intStyles.cancelBtn} onPress={closeModal}>
                                <Text style={intStyles.cancelBtnTxt}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const intStyles = StyleSheet.create({
    btnContainner: {
        width: "100%",
        height: "15%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10
    },

    cancelBtnTxt: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
        color: "#FFF"
    },

    cancelBtn: {
        width: 150,
        height: 40,
        backgroundColor: "#000",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    changeBtnTxt: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
        color: "#FFF"
    },

    changeBtn: {
        width: 150,
        height: 40,
        backgroundColor: "#FF4747",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    modalHeading: {
        fontSize: 30,
        color: "#000",
        fontWeight: "700",
        textAlign: "center"
    },

    modalImage: {
        resizeMode: "contain",
        height: "100%",
        width: "100%"
    },

    container: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    modalContent: {
        width: "80%",
        height: "30%",
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        flexDirection: "row"
    },

    btnTxt: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    btn: {
        alignSelf: "center",
        width: 95,
        backgroundColor: "#000",
        height: 35,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },

    type: {
        fontSize: 32,
        fontWeight: "600",
        color: "#FAA41E",
        marginTop: 5
    },

    carNo: {
        fontSize: 24,
        fontWeight: "800",
        color: "#000"
    },

    detailsContainer: {
        width: "100%",
        height: 108,
        backgroundColor: "#FFF",
        elevation: 10,
        marginBottom: 10,
        flexDirection: "row",
        borderRadius: 10
    },

    scrollViewContainer: {
        width: "100%",
        height: "85%",
        marginTop: 5,
        paddingHorizontal: 10
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
        alignItems: "center",
        paddingTop: 10,
        height: "11%"
    },
});

export default VehicleManage;