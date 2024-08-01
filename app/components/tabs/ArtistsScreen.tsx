// ArtistsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useMusicPlayer } from './MusicPlayerContext';
import * as MediaLibrary from 'expo-media-library';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumId: string;
  // Add any other fields you need
}

const ArtistsScreen: React.FC = () => {
  const { songs } = useMusicPlayer();
  const [artists, setArtists] = useState<{ [artist: string]: string }>({});

  useEffect(() => {
    const artistMap: { [artist: string]: string } = {};
    //@ts-ignore
    songs.forEach((song: Song) => {
      if (song.artist && !artistMap[song.artist]) {
        artistMap[song.artist] = song.albumId; // Assuming 'albumId' is a URL or ID for the artist's image
      }
    });
    setArtists(artistMap);
  }, [songs]);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.item}>
      <Image
        source={{ uri: artists[item] || 'https://via.placeholder.com/150' }} // Using the artist's image or a placeholder
        style={styles.artistImage}
      />
      <Text style={styles.artistName}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(artists)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
      />
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
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  artistName: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ArtistsScreen;
