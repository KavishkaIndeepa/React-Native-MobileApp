import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const image = require('../../assets/images/music-boy.jpg');

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
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
  },  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  
});

export default HomeScreen;
