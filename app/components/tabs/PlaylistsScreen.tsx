import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useMusicPlayer } from './MusicPlayerContext';
//@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlaylistsScreen: React.FC = () => {
  const { currentSong, play, pause, isPlaying } = useMusicPlayer();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
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
        <Text style={styles.currentSongTitle}>{currentSong.filename}</Text>
        <Text style={styles.currentSongArtist}>Arijit Singh</Text>
        <Text style={styles.currentSongAlbum}>Brahmastra</Text>
      </View>
      <View style={styles.controls}>
        <MaterialIcons name="favorite-border" style={styles.icon} />
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
       
          <MaterialIcons name="skip-previous" style={styles.playbackIcon} />
        
        <TouchableOpacity onPress={handlePlayPause}>
          <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} style={styles.playbackIcon} />
        </TouchableOpacity>
        
          <MaterialIcons name="skip-next" style={styles.playbackIcon} />
        
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
    height: 2,
    backgroundColor: '#888',
    marginHorizontal: 10,
  },
  progress: {
    width: '20%', // Example progress
    height: '100%',
    backgroundColor: '#fff',
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
  playbackIcon: {
    color: '#fff',
    fontSize: 36,
  },
});

export default PlaylistsScreen;
