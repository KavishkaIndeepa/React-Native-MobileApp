// ArtistsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArtistsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Artists screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ArtistsScreen;
