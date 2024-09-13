import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../HomeScreen'

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName='HomeScreen' >
            <Stack.Screen options={{ headerShown: false }} name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
    )
}
export default AppStack;