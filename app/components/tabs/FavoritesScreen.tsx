// FavoritesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useMusicPlayer } from './MusicPlayerContext';

const FavoritesScreen: React.FC = () => {
  //@ts-ignore
  const { favorites } = useMusicPlayer();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.text}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.uri }} style={styles.songImage} />
              <View style={styles.textContainer}>
                <Text style={styles.songTitle}>{item.filename}</Text>
                <Text style={styles.songDetails}>Artist Name</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    paddingTop: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  textContainer: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
  },
  songDetails: {
    color: '#888',
    fontSize: 12,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
