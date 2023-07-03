import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, Alert, TouchableOpacity, Modal } from "react-native";
import extStyles from "../styles/extStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../Service/server_con";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
import AppLoader from "../Components/AppLoader";
import { setErrContent, setErrTitle } from "./../Global/Variable";
import ErrorMessage from "../Components/ErrorMessage";


const Slots = (props) => {
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const [showPopup, setShowPopUp] = useState(false);

    const [bookingId, setBookingId] = useState();
    const [slot, setSlot] = useState();

    const { data } = props.route.params;

    const [type, setType] = useState();

    const errHandler = (title, message) => {
        setErrTitle(title);
        setErrContent(message);
        setError(true);
    }

    const [bookingDetails, setBookingDetails] = useState({
        date: "",
        fromTime: "",
        toTime: "",
        firstSlot: null,
        endSlot: null
    });

    const [fetchedData, setFetchedData] = useState([]);

    const fetchSlots = async e => {
        try {
            const response = await axios.post(server + "slotBooking", bookingDetails);
            setFetchedData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function getData() {
            let date = await AsyncStorage.getItem('date');
            let fromTime = await AsyncStorage.getItem('fromTime');
            let toTime = await AsyncStorage.getItem('toTime');
            setType(await AsyncStorage.getItem('type'));
            setBookingDetails((prev) => ({ ...prev, date: date, fromTime: fromTime, toTime: toTime }));

            if (data === 'A') {
                setBookingDetails((prev) => ({ ...prev, firstSlot: 0, endSlot: 15 }));
            } else if (data === 'B') {
                setBookingDetails((prev) => ({ ...prev, firstSlot: 14, endSlot: 29 }));
            } else if (data === 'C') {
                setBookingDetails((prev) => ({ ...prev, firstSlot: 28, endSlot: 43 }));
            } else if (data === 'D') {
                setBookingDetails((prev) => ({ ...prev, firstSlot: 42, endSlot: 57 }));
            }
        }
        getData();
    }, [])

    useEffect(() => {
        fetchSlots();
        const interval = setInterval(fetchSlots, 3000);

        return () => {
            clearInterval(interval);
        };

    }, [bookingDetails]);

    if (!Array.isArray(fetchedData)) {
        return <AppLoader />;
    }

    const handleSelect = async (Slot, Price) => {
        if (type == "new") {
            props.navigation.navigate("BookSum", { Slot: Slot, Price: Price });
        } else if (type == "update") {
            setBookingId(await AsyncStorage.getItem('bookingID'));
            setSlot(Slot);
            setShowPopUp(true);
        } else {
            errHandler("Oops...!!", "Something went wrong.");
        }
    }

    const handleModal = () => {
        setShowPopUp(false);
    }

    const loadHanler = (state) => {
        setLoading(state);
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={intStyles.titleContainer}>
                <Text style={intStyles.titleTxt}>Slot-{data}</Text>
            </View>
            <View>
                <View>
                    <Image source={require('./../src/assets/slots_map.png')} style={intStyles.slotsMap} />
                </View>
                <View style={[StyleSheet.absoluteFillObject, intStyles.mainContainer]}>
                    <View style={intStyles.divider}>
                        {fetchedData.slice(0, 7).map((item, index) => (
                            (item.Enability == 0) ? (
                                <DisabledLeft key={index} Slot={data} SlotNo={index + 1} onErrHandler={errHandler} />
                            ) : (item.booked === 0 && item.Type === "Norm") ? (
                                <FreeSlotsLeft key={index} Slot={data} SlotNo={index + 1} Price={item.Price} onSelectHandler={handleSelect} />
                            ) : (item.booked === 0 && item.Type === "vip") ? (
                                <FreeSlotVipLeft key={index} Slot={data} SlotNo={index + 1} Price={item.Price} onSelectHandler={handleSelect} />
                            ) : (item.booked === 0 && item.Type === "Dis") ? (
                                <HandiSlotLeft key={index} Slot={data} SlotNo={index + 1} Price={item.Price} onSelectHandler={handleSelect} />
                            ) : <BookedSlotsLeft key={index} onErrHandler={errHandler} />
                        ))}
                    </View>
                    <View style={{ ...intStyles.divider, ...{ paddingRight: 25 } }}>
                        {fetchedData.slice(7, 15).map((item, index) => (
                            (item.Enability == 0) ? (
                                <DisabledRight key={index} Slot={data} SlotNo={index + 1} onErrHandler={errHandler} />
                            ) : (item.booked === 0 && item.Type === "Norm") ? (
                                <FreeSlotsRight key={index} Slot={data} SlotNo={index + 8} Price={item.Price} onSelectHandler={handleSelect} />
                            ) : (item.booked === 0 && item.Type === "vip") ? (
                                <FreeSlotVipRight key={index} Slot={data} SlotNo={index + 8} Price={item.Price} onSelectHandler={handleSelect} />
                            ) : (item.booked === 0 && item.Type === "Dis") ? (
                                <HandiSlotRight key={index} Slot={data} SlotNo={index + 8} Price={item.Price} onSelectHandler={handleSelect} />
                            ) : <BookedSlotsRight key={index} onErrHandler={errHandler} />
                        ))}
                    </View>
                </View>
            </View>
            {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
            {loading ? <AppLoader /> : null}
            {showPopup ? <Popup onErrorHandler={errHandler} onHandleModal={handleModal} bookingId={bookingId} Slot={slot} props={props} onLoadHandler={loadHanler} /> : null}
        </SafeAreaView>
    );
};

const Popup = ({ onErrorHandler, onHandleModal, bookingId, Slot, props, onLoadHandler }) => {
    const closeModal = () => {
        onLoadHandler(false);
        onHandleModal();
    }

    onLoadHandler(true);
    const handleChange = async e => {
        let SlotId = Slot;
        if (SlotId.charAt(0) === "D") {
            SlotId = parseInt(SlotId.slice(2)) + 42;
        } else if (SlotId.charAt(0) === "C") {
            SlotId = parseInt(SlotId.slice(2)) + 28;
        } else if (SlotId.charAt(0) === "B") {
            SlotId = parseInt(SlotId.slice(2)) + 14;
        } else if (SlotId.charAt(0) === "A") {
            SlotId = parseInt(SlotId.slice(2));
        }
        await axios.post(server + 'changeOverLapped', { "slot": SlotId, "bookingId": bookingId })
            .then((res) => {
                if (res.data == 200) {
                    props.navigation.reset({
                        index: 0,
                        routes: [{
                            name: 'RefundSuccess',
                            params: { Message: "Slot succefully changed" }
                        }]
                    })
                } else {
                    onLoadHandler(false);
                    onErrorHandler("Oops...!!", "Something went wrong.");
                }
            })

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
                            <Text style={intStyles.modalHeading}>You have selected slot<Text style={{ color: "#FAA41E", fontSize: 35 }}> {Slot}</Text></Text>
                            <TouchableOpacity style={intStyles.changeBtn} onPress={handleChange}>
                                <Text style={intStyles.changeBtnTxt}>Proceed to change</Text>
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

const HandiSlotRight = ({ Slot, SlotNo, Price, onSelectHandler }) => {
    const handlePress = () => {
        onSelectHandler((Slot + '-' + SlotNo), Price);
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5, transform: [{ rotate: '-13deg' }] } }}>
            <TouchableOpacity onPress={() => handlePress()} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '13deg' }] } }}>
                <Image source={require('./../src/assets/slot_right.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={{ ...intStyles.slotTxt, ...{ transform: [{ rotate: "-26deg" }] } }}>{Slot}-{SlotNo}</Text>
                    <View style={intStyles.vipContainer}>
                        <Image source={require('./../src/assets/wheel.png')} style={{ ...intStyles.vipImg, ...{ transform: [{ rotate: '-13deg' }] } }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const FreeSlotVipRight = ({ Slot, SlotNo, Price, onSelectHandler }) => {
    const handlePress = () => {
        onSelectHandler((Slot + '-' + SlotNo), Price);
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5, transform: [{ rotate: '-13deg' }] } }}>
            <TouchableOpacity onPress={() => handlePress()} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '13deg' }] } }}>
                <Image source={require('./../src/assets/slot_right.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={{ ...intStyles.slotTxt, ...{ transform: [{ rotate: "-26deg" }] } }}>{Slot}-{SlotNo}</Text>
                    <View style={intStyles.vipContainer}>
                        <Image source={require('./../src/assets/vip.png')} style={{ ...intStyles.vipImg, ...{ transform: [{ rotate: '-26deg' }] } }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const DisabledRight = ({ Slot, SlotNo }) => {
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5, transform: [{ rotate: '-13deg' }] } }}>
            <TouchableOpacity onPress={() => Alert.alert(Slot + "-" + SlotNo)} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '13deg' }] } }}>
                <Image source={require('./../src/assets/slot_right.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={{ ...intStyles.slotTxt, ...{ transform: [{ rotate: "-26deg" }] } }}>{Slot}-{SlotNo}</Text>
                    <View style={intStyles.vipContainer}>
                        <Entypo name="circle-with-cross" size={25} style={{ ...intStyles.vipImg, ...{ marginLeft: 15, transform: [{ rotate: '-13deg' }] } }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const DisabledLeft = ({ Slot, SlotNo, onErrHandler }) => {
    const handlePress = () => {
        onErrHandler("Sorry...!!", "This slot is disabled. Cannot place a booking.");
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5 } }}>
            <TouchableOpacity onPress={handlePress} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '-13deg' }] } }} >
                <Image source={require('./../src/assets/slot_left.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={intStyles.slotTxt}>{Slot}-{SlotNo}</Text>
                    <View style={intStyles.vipContainer}>
                        <Entypo name="circle-with-cross" size={25} style={{ ...intStyles.vipImg, ...{ marginLeft: 10 } }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const HandiSlotLeft = ({ Slot, SlotNo, Price, onSelectHandler }) => {
    const handlePress = () => {
        onSelectHandler((Slot + '-' + SlotNo), Price);
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5 } }}>
            <TouchableOpacity onPress={() => handlePress()} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '-13deg' }] } }} >
                <Image source={require('./../src/assets/slot_left.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={intStyles.slotTxt}>{Slot}-{SlotNo}</Text>
                    <View style={intStyles.vipContainer}>
                        <Image source={require('./../src/assets/wheel.png')} style={intStyles.vipImg} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const FreeSlotVipLeft = ({ Slot, SlotNo, Price, onSelectHandler }) => {
    const handlePress = () => {
        onSelectHandler((Slot + '-' + SlotNo), Price);
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5 } }}>
            <TouchableOpacity onPress={() => handlePress()} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '-13deg' }] } }}>
                <Image source={require('./../src/assets/slot_left.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={intStyles.slotTxt}>{Slot}-{SlotNo}</Text>
                    <View style={intStyles.vipContainer}>
                        <Image source={require('./../src/assets/vip.png')} style={intStyles.vipImg} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const FreeSlotsRight = ({ Slot, SlotNo, Price, onSelectHandler }) => {
    const handlePress = () => {
        onSelectHandler((Slot + '-' + SlotNo), Price);
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5, transform: [{ rotate: '-13deg' }] } }}>
            <TouchableOpacity onPress={() => handlePress()} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '13deg' }] } }}>
                <Image source={require('./../src/assets/slot_right.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={{ ...intStyles.slotTxt, ...{ transform: [{ rotate: "-26deg" }] } }}>{Slot}-{SlotNo}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const BookedSlotsRight = ({ onErrHandler }) => {
    const handlePress = () => {
        onErrHandler("Oops...!!", "This slot is already booked by another customer");
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingHorizontal: 10, transform: [{ rotate: '-13deg' }] } }}>
            <TouchableOpacity onPress={handlePress} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }}>
                <Image source={require('./../src/assets/car_right.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '13deg' }] } }} />
            </TouchableOpacity>
        </View>
    );
}

const FreeSlotsLeft = ({ Slot, SlotNo, Price, onSelectHandler }) => {
    const handlePress = () => {
        onSelectHandler((Slot + '-' + SlotNo), Price);
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingTop: 5 } }}>
            <TouchableOpacity onPress={() => handlePress()} style={intStyles.slotImgPara}>
                <Image source={require('./../src/assets/slot_left.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
                <View style={[StyleSheet.absoluteFillObject, intStyles.slotTxtContainer]}>
                    <Text style={intStyles.slotTxt}>{Slot}-{SlotNo}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const BookedSlotsLeft = ({ onErrHandler }) => {
    const handlePress = () => {
        onErrHandler("Oops...!!", "This slot is already booked by another customer");
    };
    return (
        <View style={{ ...intStyles.slot, ...{ paddingHorizontal: 10 } }}>
            <TouchableOpacity onPress={handlePress} style={intStyles.slotImgPara} >
                <Image source={require('./../src/assets/car_left.png')} style={{ ...intStyles.slotImgPara, ...{ transform: [{ rotate: '0deg' }] } }} />
            </TouchableOpacity>
        </View>
    );
};

const intStyles = StyleSheet.create({
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
        fontSize: 16,
        textAlign: "center",
        fontWeight: "700",
        color: "#000"
    },

    changeBtn: {
        width: 150,
        height: 40,
        backgroundColor: "#FAA41E",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    modalHeading: {
        fontSize: 25,
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

    vipImg: {
        resizeMode: "contain",
        height: "100%",
        width: "100%",
    },

    vipContainer: {
        width: 50,
        height: 30,
        transform: [{ rotate: "0deg" }],
        paddingBottom: 5
    },

    slotTxt: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000",
        marginRight: 10,
    },

    slotTxtContainer: {
        width: 150,
        height: 88,
        alignSelf: "flex-end",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ rotate: '13deg' }]
    },

    slotImgPara: {
        resizeMode: "contain",
        height: "110%",
        width: "100%",
        transform: [{ rotate: '-13deg' }]
    },

    slot: {
        width: 150,
        height: 87,
        alignSelf: "flex-end",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ rotate: '13deg' }]
    },

    divider: {
        width: "50%",
        paddingTop: 20
    },

    mainContainer: {
        height: "100%",
        width: "100%",
        flexDirection: "row"
    },

    slotsMap: {
        resizeMode: "contain",
        height: "95%",
        width: "100%"
    },

    slotContainer: {
        height: "90%",
        width: "100%"
    },

    titleTxt: {
        fontSize: 48,
        fontWeight: "900",
        color: "#FAA41E"
    },

    titleContainer: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
})

export default Slots;