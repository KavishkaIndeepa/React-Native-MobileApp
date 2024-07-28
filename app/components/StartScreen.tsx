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
        <Text style={styles.title}>Welcome to the Start Screen</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#000000a0',
    padding: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText:{
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  }
});

export default StartScreen;
