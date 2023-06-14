import React from "react";
import { SafeAreaView, View, Text, StyleSheet,TextInput,Pressable,Alert,Image, ScrollView, label} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import extStyles from "../styles/extStyles";
import RadioButtonRN from 'radio-buttons-react-native';




const App=()=>{
  const [number, onChangeNumber] = React.useState(null);
  return(
    <SafeAreaView style={[extStyles.body]}>
    
    <ScrollView>
    const data = [{{label: 'data 1' }},
 {{label: 'data 2'}
 }
];

<RadioButtonRN
  data={data}
  selectedBtn={(e) => console.log(e)}
/>
      <View style={styles.heading}> 
          <Icon name="credit-card" size={80} color="#FAA41E" style={styles.icon} />
          <Text style={styles.headingTxt}>Payment Details</Text>
      </View>
      <View style={styles.form}>
        
        <Text style={styles.formTxt}>Card Type *</Text>
      
      <View style={styles.cardNum}>
        <Text style={styles.formTxt}>Card Number *</Text>
          <TextInput style={styles.cardNumInput} value={number} placeholder="xxxx xxxx xxxx xxxx" keyboardType="numeric"/>
      </View>

      <View style={styles.expMonth}>
        <Text style={styles.formTxt}>Expiration Month *</Text>
          <TextInput style={styles.month} onChangeText={onChangeNumber} value={number}  keyboardType="numeric"/>
      </View>

      <View style={styles.expYear}> 
        <Text style={styles.formTxt}>Expiration Year *</Text>
        <TextInput style={styles.year} onChangeText={onChangeNumber} value={number}  keyboardType="numeric"/>
      </View >

      <View style={styles.CVN}>
        <Text style={styles.formTxt}>CVV *</Text>
        <TextInput style={styles.CVNInput} onChangeText={onChangeNumber} value={number} keyboardType="numeric"/>
      </View>
      <Text style ={styles.required}>*This area is required</Text>
      </View>

      <View style ={styles.bookingCharge}>
        <Text style ={styles.yourBooking}>Your Booking...</Text>
        <Text style ={styles.bCtxt}>Slot charge</Text>
        <Text style ={styles.bCtxt}>Discount</Text>
        <Text style ={styles.totalAmount}>Total Amount</Text>
      </View>

      <View style={styles.Buttons}>
        <View style={{width:"60%",}}>
          <Pressable onPress={() => Alert.alert('This is cancel  button')} 
          style={({ pressed })=>[
            styles.cancelBtn,
            pressed && {opacity:.8}
          ]}>
            {({ pressed }) => { 
              return(
                <Text style={[styles.cancelBtnTxt, pressed && {opacity:.8}]}>Cancel</Text>
              );
            }} 
          </Pressable>
        </View>

        <View style={{width:"60%",}}>
          <Pressable onPress={() => Alert.alert('This is pay  button')} 
          style={({ pressed })=>[
            styles.payBtn,
            pressed && {opacity:.8}
          ]}>
            {({ pressed }) => { 
              return(
                <Text style={[styles.payBtnTxt, pressed && {opacity:.8}]}>Pay</Text>
              );
            }} 
          </Pressable>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading:{
       flexDirection:"row",
  },
  icon:{
    paddingTop:20,
    paddingLeft:15,
  },
  headingTxt:{
    color:"#FAA41E", 
    fontSize:55, 
    fontWeight:"bold",
    padding:10,
  },

  form:{
    margin:20,
  },

  formTxt:{
    color:"gray", 
    fontSize:16,
    paddingRight:20,
    paddingBottom:20,
  },

  bookingCharge:{

},

cardNum:{
  flexDirection:"row",
  paddingBottom:10,
},

cardNumInput:{
    height: 40,
    width: 225,
    borderWidth: 1,
    borderRadius:10,
    borderColor:"gray",
    padding:5,
    fontSize:18,
},

expMonth:{
  flexDirection:"row",
  paddingBottom:10,
},

month:{
  height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius:10,
    borderColor:"gray",
    padding:5,
    fontSize:18,
    textAlign:"center",
},

expYear:{
  flexDirection:"row",
  paddingBottom:10,
  
},

year:{
    height: 40,
    width: 215,
    borderWidth: 1,
    borderRadius:10,
    borderColor:"gray",
    padding:5,
    fontSize:18,
    textAlign:"center",
},

CVN:{
  flexDirection:"row",
  paddingBottom:10,
  
},
CVNInput:{
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius:10,
    borderColor:"gray",
    padding: 10,
    fontSize:16,
},

required:{
  alignSelf:"flex-end",
  paddingRight:5,
},

bookingCharge:{
  marginLeft:20,
  
},
  

yourBooking:{
  color:"black",
  fontSize:21,
  fontWeight:"bold",
  paddingBottom:15,
},

bCtxt:{
  color:"black", 
  fontSize:20,
  paddingBottom:10,
  
},
totalAmount:{
  color:"black",
  fontSize:20,
  fontWeight:"bold",
  paddingBottom: 10,
  
},

cancelBtn:{
  height:50,
  width:"50%",
  borderRadius:50,
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:"black"
},

cancelBtnTxt:{
  color:"white",
  fontSize:25,
  fontWeight:"bold",
  textAlign:"center"
  
},

payBtn:{
  height:50,
  width:"50%",
  borderRadius:50,
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:"#FAA41E", 
},

payBtnTxt:{
  color:"black",
  fontSize:25,
  fontWeight:"bold",
  textAlign:"center"
},

Buttons:{
  marginTop:60,
  marginLeft:35,
  flexDirection:"row",
 
  
}



})

export default App;