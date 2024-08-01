import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';

interface MusicPlayerContextProps {
  currentSong: MediaLibrary.Asset | null;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  setCurrentSong: (song: MediaLibrary.Asset | null) => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  favorites: MediaLibrary.Asset[];
  addToFavorites: (song: MediaLibrary.Asset) => void;
  removeFromFavorites: (song: MediaLibrary.Asset) => void;
  songs: MediaLibrary.Asset[];
  playSong: (song: MediaLibrary.Asset) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps>({
  currentSong: null,
  isPlaying: false,
  play: () => {},
  pause: () => {},
  setCurrentSong: () => {},
  playNextSong: () => {},
  playPreviousSong: () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  songs: [],
  playSong: () => {},
});

//@ts-ignore
export const MusicPlayerProvider: React.FC = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<MediaLibrary.Asset | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<MediaLibrary.Asset[]>([]);
  const [songs, setSongs] = useState<MediaLibrary.Asset[]>([]);
  const sound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
      setSongs(media.assets);
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const loadSound = async () => {
      if (currentSong) {
        if (sound.current) {
          await sound.current.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentSong.uri },
          { shouldPlay: isPlaying }
        );
        sound.current = newSound;
      }
    };
    loadSound();
  }, [currentSong]);

  const play = () => {
    setIsPlaying(true);
    sound.current?.playAsync();
  };

  const pause = () => {
    setIsPlaying(false);
    sound.current?.pauseAsync();
  };

  const playSong = async (song: MediaLibrary.Asset) => {
    if (sound.current) {
      await sound.current.unloadAsync();
    }
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
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playNextSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      playSong(songs[nextIndex]);
    }
  };

  const playPreviousSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      playSong(songs[prevIndex]);
    }
  };

  const addToFavorites = (song: MediaLibrary.Asset) => {
    setFavorites((prevFavorites) => [...prevFavorites, song]);
  };

  const removeFromFavorites = (song: MediaLibrary.Asset) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== song.id));
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        play,
        pause,
        setCurrentSong,
        playNextSong,
        playPreviousSong,
        favorites,
        addToFavorites,
        removeFromFavorites,
        songs,
        playSong,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
