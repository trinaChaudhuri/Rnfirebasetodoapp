import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calendar from '../screens/Calendar';
import Contactspage from '../screens/Contacts';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function Navi() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Calendar" component={Calendar} />
              <Stack.Screen name="Contactspage" component={Contactspage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// export default Navigator;
// const screens = {
//     Home: {
//         screen: Home
//     },
//     Calendar: {
//         screen: Calendar
//     },
//     Contactspage: {
//         screen: Contactspage
//     }
// }

// const HomeStack = createStackNavigator (screens);

// export default createAppContainer(HomeStack);
