import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import extStyles from "../styles/extStyles";
import { CardField, StripeProvider, useStripe, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import { server } from "../Service/server_con";
import AppLoader from "../Components/AppLoader";
import ErrorMessage from "../Components/ErrorMessage";
import { setErrContent, setErrTitle } from '../Global/Variable';
import moment from "moment-timezone";


const PaymentExtend = (props) => {
  const [Loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [cardDetails, setCardDetials] = React.useState(null);

  const { confirmPayment, loading } = useConfirmPayment();

  const data = props.route.params;

  const handleClick = () => {
    //Prevent go back
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }]
    });
  }

  const handlePay = async e => {
    setLoading(true);
    if (cardDetails?.complete) {
      try {
        const { error, paymentIntent } = await confirmPayment(data.intent, {
          paymentMethodType: "Card",
        })
        if (paymentIntent) {
          sendData(paymentIntent.clientSecret.substring(0, paymentIntent.clientSecret.indexOf("_", paymentIntent.clientSecret.indexOf("_") + 1)));
        } else {
          setErrTitle("Oops...!!");
          setErrContent("Payment unsuccesfull");
          setLoading(false);
          setError(true);
        }
      } catch (err) {
        console.log(err);
        setErrTitle("Oops...!!");
        setErrContent("Something went wrong2");
        setLoading(false);
        setError(true);
      }
    } else {
      setErrTitle("Oops...!!");
      setErrContent("Enter card details correctly");
      setLoading(false);
      setError(true);
    }
  }

  const sendData = async (clientSecret) => {
    const values = { "date": data.date, "startTime": data.startTime, "endTime": data.endTime, "vehicleNo": data.vehicleNo, "slot": data.slot, "userName": data.userName, "currentTime": moment.tz("Asia/Colombo").format("HH:mm:ss"), "paymentAmount": data.Total, "paymentIntent": clientSecret, "timeDiff": data.timeDiff, "bookingID":data.bookingId }
    const response = await axios.post(server + 'extend', values);
    if (response.data == 200) {
      props.navigation.reset({
        index: 0,
        routes: [{
          name: 'RefundSuccess',
          params: { Message: "Payment is succefull and booking has been extended." }
        }]
      })
    } else {
      setErrTitle("Oops...!!");
      setErrContent("Something went wrong3");
      setLoading(false);
      setError(true);
    }
  }

  return (
    <StripeProvider publishableKey="pk_test_51MdZNYKdpK5vl1GeDp6R8Jj1G6CW0kOrMJ7Ab1eY5QDlEePNRdvvFiLLmdgCoHv0dZ85dqhAO6q1OnEYRGaQ6El400gTt2vNIB">
      <SafeAreaView style={[extStyles.body]}>
        <View style={styles.heading}>
          <Icon name="credit-card" size={80} color="#FAA41E" style={styles.icon} />
          <Text style={styles.headingTxt}>Payment Details</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.cardNum}>
            <CardField style={{ height: 50, width: "100%" }} postalCodeEnabled={false} onCardChange={cardDetails => setCardDetials(cardDetails)} />
          </View>


          <Text style={styles.required}>*This area is required</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.yourBooking}>Your Booking...</Text>
        </View>

        <View style={{ width: "100%", height: 100, flexDirection: "row", paddingHorizontal: 10 }}>
          <View style={{ width: "50%", height: "100%" }}>
            <Text style={styles.bCtxt}>Slot charge</Text>
            <Text style={styles.bCtxt}>Discount({data.rate}%)</Text>
            <Text style={styles.totalAmount}>Total Amount</Text>
          </View>
          <View style={{ width: "50%", height: "100%", alignItems: "flex-end" }}>
            <Text style={styles.bCtxt}>{data.SlotCharge}</Text>
            <Text style={styles.bCtxt}>-{data.Discount}</Text>
            <Text style={styles.totalAmount}>{data.Total}</Text>
          </View>
        </View>

        <View style={styles.Buttons}>
          <View style={{ width: "60%", }}>
            <Pressable onPress={() => handleClick()}
              style={({ pressed }) => [
                styles.cancelBtn,
                pressed && { opacity: .8 }
              ]}>
              {({ pressed }) => {
                return (
                  <Text style={[styles.cancelBtnTxt, pressed && { opacity: .8 }]}>Cancel</Text>
                );
              }}
            </Pressable>
          </View>

          <View style={{ width: "60%", }}>
            <Pressable onPress={handlePay}
              style={({ pressed }) => [
                styles.payBtn,
                pressed && { opacity: .8 }
              ]}>
              {({ pressed }) => {
                return (
                  <Text style={[styles.payBtnTxt, pressed && { opacity: .8 }]}>Pay</Text>
                );
              }}
            </Pressable>
          </View>
        </View>
        {Loading || loading ? <AppLoader /> : null}
        {error ? <ErrorMessage closeModal={() => setError(false)} /> : null}
      </SafeAreaView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
  },
  icon: {
    paddingTop: 20,
    paddingLeft: 15,
  },
  headingTxt: {
    color: "#FAA41E",
    fontSize: 55,
    fontWeight: "bold",
    padding: 10,
  },

  form: {
    margin: 20,
  },

  formTxt: {
    color: "gray",
    fontSize: 16,
    paddingRight: 20,
    paddingBottom: 20,
  },

  bookingCharge: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 5,
    flexDirection: "row",
    height: 100,
    backgroundColor: "#f00",
  },

  cardNum: {
    width: "100%",
    paddingBottom: 10,
  },

  cardNumInput: {
    height: 40,
    width: 225,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 5,
    fontSize: 18,
  },

  expMonth: {
    flexDirection: "row",
    paddingBottom: 10,
  },

  month: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 5,
    fontSize: 18,
    textAlign: "center",
  },

  expYear: {
    flexDirection: "row",
    paddingBottom: 10,

  },

  year: {
    height: 40,
    width: 215,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 5,
    fontSize: 18,
    textAlign: "center",
  },

  CVN: {
    flexDirection: "row",
    paddingBottom: 10,

  },
  CVNInput: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10,
    fontSize: 16,
  },

  required: {
    alignSelf: "flex-end",
    paddingRight: 5,
  },

  bookingCharge: {
    marginLeft: 20,

  },


  yourBooking: {
    color: "black",
    fontSize: 21,
    fontWeight: "bold",
    paddingBottom: 15,
  },

  bCtxt: {
    color: "black",
    fontSize: 20,
    paddingBottom: 10,

  },
  totalAmount: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,

  },

  cancelBtn: {
    height: 50,
    width: "50%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },

  cancelBtnTxt: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"

  },

  payBtn: {
    height: 50,
    width: "50%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAA41E",
  },

  payBtnTxt: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },

  Buttons: {
    marginTop: 60,
    marginLeft: 35,
    flexDirection: "row",


  }



})

export default PaymentExtend;