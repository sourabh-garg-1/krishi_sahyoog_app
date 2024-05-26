import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Home from './Home'
import Details from './Details'
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

const Homestack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}

export default Homestack