import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import { useMusicPlayer } from './MusicPlayerContext';

const SongsScreen: React.FC = () => {
  const [songs, setSongs] = useState<MediaLibrary.Asset[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const sound = useRef<Audio.Sound | null>(null);
  //@ts-ignore
  const { setCurrentSong, isPlaying, play, pause } = useMusicPlayer();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestMediaLibraryPermission();
    }

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const requestMediaLibraryPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        loadSongs();
      } else {
        console.log('Media Library permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const loadSongs = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 100, // Number of items to fetch
    });
    setSongs(media.assets);
  };

  const playSong = async (index: number) => {
    if (sound.current) {
      await sound.current.unloadAsync();
    }

    const song = songs[index];
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: true }
    );

    newSound.setOnPlaybackStatusUpdate((status) => {
      //@ts-ignore
      if (status.didJustFinish) {
        playNextSong();
      }
    });

    sound.current = newSound;
    setCurrentSongIndex(index);
    setCurrentSong(song);
    play();
  };

  const playNextSong = () => {
    if (currentSongIndex !== null) {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      playSong(nextIndex);
    }
  };

  const playPreviousSong = () => {
    if (currentSongIndex !== null) {
      const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      playSong(prevIndex);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
      sound.current?.pauseAsync();
    } else {
      play();
      sound.current?.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.item, currentSongIndex === index && styles.currentSong]}
            onPress={() => playSong(index)}
          >
            <View style={styles.songInfo}>
              <Image
                source={{ uri: item.uri }} // Placeholder image for now
                style={styles.songImage}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.songTitle, currentSongIndex === index && styles.currentSongTitle]}>{item.filename}</Text>
                <Text style={styles.songDetails}>Duration: {Math.floor(item.duration / 60)}:{Math.floor(item.duration % 60).toString().padStart(2, '0')}</Text>
              </View>
            </View>
            {/* <Text style={styles.menuButton}>⋮</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Background color similar to the image
    padding: 10,
    paddingTop: 30,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  currentSong: {
    backgroundColor: '#333', // Highlight color for current playing song
  },
  songInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#444', // Placeholder color for song image
  },
  textContainer: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
  },
  currentSongTitle: {
    color: '#00f', // Blue color for the current playing song
  },
  songDetails: {
    color: '#888',
    fontSize: 12,
  },
});

export default SongsScreen;
