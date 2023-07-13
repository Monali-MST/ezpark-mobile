import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import SignupOne from './screens/SignupOne';
import TandC from './screens/TandC';
import Test from './screens/Test';
import Vehicle from './screens/Vehicle';
import VerMob from './screens/VerMob';
import OtpMob from "./screens/OtpMob";
import VerEmail from "./screens/VerEmail";
import OtpEmail from "./screens/OtpEmail";
import Congrats from "./screens/Congrats";
import Dashboard from "./screens/Dashboard";
import Splash from "./screens/Splash";
import DateTime from "./screens/DateTime";
import Zone from "./screens/Zone";
import Slots from "./screens/Slots";
import BookSum from "./screens/BookSum";
import MyBookings from "./screens/MyBookings";
import Payment from "./screens/Payment";
import Chat from "./screens/Chat";
import ChangeEmail from "./screens/ChangeEmail";
import ChangeMob from "./screens/ChangeMob";
import FogPass from "./screens/FogPass";
import FogPassVerify from "./screens/FogPassVerify";
import ChangePass from "./screens/ChangePass";
import Success from "./screens/Success";
import Cancel from "./screens/Cancel";
import RefundSuccess from "./screens/RefundSuccess";
import RefundReq from "./screens/RefundReq";
import Extend from "./screens/Extend";
import BookSumExtend from "./screens/BookSumExtend";
import History from "./screens/History";
import PaymentExtend from "./screens/PaymentExtend";
import Review from "./screens/Review";
import MyProfile from "./screens/MyProfile";

const Stack = createNativeStackNavigator();

const Navigation = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="MyProfile" component={MyProfile} options={{headerShown: false}} />
                <Stack.Screen name="Review" component={Review} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentExtend" component={PaymentExtend} options={{ headerShown: false }} />
                <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
                <Stack.Screen name="BookSumExtend" component={BookSumExtend} options={{ headerShown: false }} />
                <Stack.Screen name="Extend" component={Extend} options={{ headerShown: false }} />
                <Stack.Screen name="RefundReq" component={RefundReq} options={{ headerShown: false }} />
                <Stack.Screen name="RefundSuccess" component={RefundSuccess} options={{ headerShown: false }} />
                <Stack.Screen name="Cancel" component={Cancel} options={{ headerShown: false }} />
                <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }} />
                <Stack.Screen name="FogPassVerify" component={FogPassVerify} options={{ headerShown: false }} />
                <Stack.Screen name="FogPass" component={FogPass} options={{ headerShown: false }} />
                <Stack.Screen name="ChangeMob" component={ChangeMob} options={{ headerShown: false }} />
                <Stack.Screen name="ChangeEmail" component={ChangeEmail} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
                <Stack.Screen name="MyBookings" component={MyBookings} options={{ headerShown: false }} />
                <Stack.Screen name="BookSum" component={BookSum} options={{ headerShown: false }} />
                <Stack.Screen name="Slots" component={Slots} options={{ headerShown: false }} />
                <Stack.Screen name="Zone" component={Zone} options={{ headerShown: false }} />
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="TandC" component={TandC} options={{ headerShown: false }} />
                <Stack.Screen name="SignupOne" component={SignupOne} options={{ headerShown: false }} />
                <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
                <Stack.Screen name="Vehicle" component={Vehicle} options={{ headerShown: false }} />
                <Stack.Screen name="VerMob" component={VerMob} options={{ headerShown: false }} />
                <Stack.Screen name="OtpMob" component={OtpMob} options={{ headerShown: false }} />
                <Stack.Screen name="VerEmail" component={VerEmail} options={{ headerShown: false }} />
                <Stack.Screen name="OtpEmail" component={OtpEmail} options={{ headerShown: false }} />
                <Stack.Screen name="Congrats" component={Congrats} options={{ headerShown: false }} />
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name="DateTime" component={DateTime} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
