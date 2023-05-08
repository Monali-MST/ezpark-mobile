
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getErrTitle, getErrContent} from "../Global/Variable";


const ErrorMessage = props => {

  return (
    <Modal transparent={true} animationType="fade">
      <View style={[StyleSheet.absoluteFillObject, intStyle.bodyContainer]}>
        <View style={intStyle.errContainer}>
          <View style={intStyle.dividerLeft}>
            <Text style={intStyle.errTitle}>
              {getErrTitle()}
            </Text>
            <Text style={intStyle.errContent}>
              {getErrContent()}
            </Text>
          </View>
          <View style={intStyle.dividerRight}>
            <Ionicons name="close-sharp" size={40} color={"#000"} style={{ alignSelf: "flex-end", marginTop: 5 }} onPress={()=>props.closeModal()} />
            <Image source={require('./../src/assets/sad.png')} style={{ resizeMode: "contain", width: "85%", height: "85%" }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const intStyle = StyleSheet.create({
  bodyContainer: {
    backgroundColor: "rgba(255,255,255,.4)",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    zIndex: 1,
    position: "absolute"
  },

  errContainer: {
    width: "90%",
    height: 260,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 20,
    flexDirection: "row"
  },

  dividerLeft: {
    height: "100%",
    flex: 3.5,
    justifyContent: "center",
    paddingHorizontal: 8
  },

  dividerRight: {
    height: "100%",
    flex: 2.5,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  errTitle: {
    color: "#FAA41E",
    fontSize: 48,
    fontWeight: "900"
  },

  errContent: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000"

  }
})

export default ErrorMessage;