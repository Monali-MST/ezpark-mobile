//This is screen used to testing purpose

import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Test = props => {

  const [values, setValues] = useState({
    errTitle: "Oops...!!",
    errContent: "Invalid user name or password",
  })

  return (
    <SafeAreaView style={intStyle.bodyContainer}>
        <View style={intStyle.errContainer}>
          <View style={intStyle.dividerLeft}>
              <Text style={intStyle.errTitle}>
                {values.errTitle}
              </Text>
              <Text style={intStyle.errContent}>
                {values.errContent}
              </Text>
          </View>
          <View style={intStyle.dividerRight}>
            <Ionicons name="close-sharp" size={40} color={"#000"} style={{alignSelf:"flex-end", marginTop: 5}}/>
            <Image source={require('./../src/assets/sad.png')} style={{resizeMode:"contain", width: "85%", height: "85%"}}/>
          </View>
        </View>
    </SafeAreaView>
  );
};

const intStyle = StyleSheet.create({
  bodyContainer: {
    backgroundColor: "rgba(255,255,255,0)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    alignItems:"center"
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

export default Test;