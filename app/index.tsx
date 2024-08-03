import 'react-native-gesture-handler';
import React from 'react';
import { Text, StyleSheet, View, useColorScheme, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './components/StartScreen';
import HomeScreen from './components/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MusicPlayerProvider } from './components/tabs/MusicPlayerContext';

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function index() {

return (
  //@ts-ignore
  <MusicPlayerProvider>
  <SafeAreaProvider>
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
    </Stack.Navigator>
  </SafeAreaProvider>
  </MusicPlayerProvider>

);

}

