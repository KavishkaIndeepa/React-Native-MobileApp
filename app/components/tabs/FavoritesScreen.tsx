import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useMusicPlayer } from './MusicPlayerContext';

const FavoritesScreen: React.FC = () => {
  const { favorites, playSong, currentSong } = useMusicPlayer();

  const handlePlaySong = (song: any) => {
    playSong(song);
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.text}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePlaySong(item)}>
              <View style={[styles.item, currentSong?.id === item.id && styles.playingItem]}>
                <Image source={{ uri: item.uri }} style={styles.songImage} />
                <View style={styles.textContainer}>
                  <Text style={[styles.songTitle, currentSong?.id === item.id && styles.playingText]}>
                    {item.filename}
                  </Text>
                  <Text style={[styles.songDetails, currentSong?.id === item.id && styles.playingText]}>
                    Artist Name
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
  playingItem: {
    backgroundColor: '#222',
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
  playingText: {
    color: 'blue',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
