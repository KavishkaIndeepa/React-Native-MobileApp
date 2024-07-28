import 'react-native-gesture-handler';
import React from 'react';
import { Text, StyleSheet, View, useColorScheme, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './components/StartScreen';
import HomeScreen from './components/HomeScreen';

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function index() {

return (
<Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>

);

}

