// PlaylistsScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useMusicPlayer } from './MusicPlayerContext';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const PlaylistsScreen: React.FC = () => {
  const {
    currentSong,
    play,
    pause,
    isPlaying,
    setCurrentSong,
    playNextSong,
    playPreviousSong,
    favorites,
    addToFavorites,
    removeFromFavorites,
    songs,
  } = useMusicPlayer();
  const navigation = useNavigation();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const navigateToFavorites = () => {
    //@ts-ignore
    navigation.navigate('Favorites');
  };

  const handleFavoriteToggle = () => {
    if (currentSong) {
      if (favorites.find((song) => song.id === currentSong.id)) {
        removeFromFavorites(currentSong);
      } else {
        addToFavorites(currentSong);
      }
    }
  };

  if (!currentSong) {
    return (
      <View style={styles.container}>
        <Text style={styles.noSongText}>No song is currently playing</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentSong.uri }} style={styles.currentSongImage} />
      <View style={styles.textContainer}>
        <Text style={styles.currentSongTitle} numberOfLines={1} ellipsizeMode="tail">
          {currentSong.filename}
        </Text>
        <Text style={styles.currentSongArtist} numberOfLines={1} ellipsizeMode="tail">
          Artist Name
        </Text>
        <Text style={styles.currentSongAlbum} numberOfLines={1} ellipsizeMode="tail">
          Album Name
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleFavoriteToggle}>
          <MaterialIcons name={favorites.find((song) => song.id === currentSong.id) ? "favorite" : "favorite-border"} style={styles.icon} />
        </TouchableOpacity>
        <MaterialIcons name="info-outline" style={styles.icon} />
        <MaterialIcons name="playlist-add" style={styles.icon} />
        <MaterialIcons name="more-horiz" style={styles.icon} />
      </View>
      <View style={styles.seekBar}>
        <Text style={styles.currentTime}>0:47</Text>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.totalTime}>4:28</Text>
      </View>
      <View style={styles.playbackControls}>
        <TouchableOpacity onPress={playPreviousSong}>
          <MaterialIcons name="skip-previous" style={styles.playbackIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} style={styles.playbackIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNextSong}>
          <MaterialIcons name="skip-next" style={styles.playbackIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  noSongText: {
    color: '#fff',
    fontSize: 18,
  },
  currentSongImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  currentSongTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  currentSongArtist: {
    color: '#fff',
    fontSize: 16,
  },
  currentSongAlbum: {
    color: '#fff',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  icon: {
    color: '#fff',
    fontSize: 24,
  },
  seekBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  currentTime: {
    color: '#fff',
    fontSize: 14,
  },
  totalTime: {
    color: '#fff',
    fontSize: 14,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#444',
    marginHorizontal: 10,
    borderRadius: 2,
  },
  progress: {
    height: 4,
    width: '25%', // Example progress percentage
    backgroundColor: '#1DB954',
    borderRadius: 2,
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  playbackIcon: {
    color: '#fff',
    fontSize: 36,
  },
});

export default PlaylistsScreen;
