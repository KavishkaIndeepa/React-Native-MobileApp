import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//@ts-ignore
import { RootStackParamList } from '../Common/StackNavigator';

type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Start'>;

const image = require('../../assets/images/music-boy.jpg');

const StartScreen: React.FC = () => {
  const navigation = useNavigation<StartScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.overlay}>
          <Text style={styles.title}>Find Your</Text>
          <Text style={styles.subtitle}>Favourite</Text>
          <Text style={styles.highlight}>Music</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Get Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      highlight: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFD700', // Gold color for 'Music'
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#FF5733', // Orange color for the button
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
});

export default StartScreen;
