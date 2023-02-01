import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/Login';
import SignupOne from './screens/SignupOne';
import TandC from './screens/TandC';
import Test from './screens/Test';

const Stack = createNativeStackNavigator();

const Navigation = props => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="TandC" component={TandC} options={{headerShown:false}}/>
                <Stack.Screen name="SignupOne" component={SignupOne} options={{headerShown:false}}/>
                <Stack.Screen name="Test" component={Test} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
