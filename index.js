import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import MoreUserItem from './components/MoreUserItem'

const Stack = createNativeStackNavigator()

function App(){

  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='MoreInfo' component={MoreUserItem}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const sytles = StyleSheet.create({
  block: {
    flex: 1
  }
})


export default App