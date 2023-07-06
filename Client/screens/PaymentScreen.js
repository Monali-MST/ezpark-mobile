import React from "react";
import { View, Text } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

// import { CardField, useStripe } from '@stripe/stripe-react-native';

export default function PaymentScreen() {
  return(
    <StripeProvider publishableKey="pk_test_51MdZNYKdpK5vl1GeDp6R8Jj1G6CW0kOrMJ7Ab1eY5QDlEePNRdvvFiLLmdgCoHv0dZ85dqhAO6q1OnEYRGaQ6El400gTt2vNIB">
        <View>
          <Text>Payment screen</Text>
        </View>
    </StripeProvider>
  );
}