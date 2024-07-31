// MusicPlayerContext.tsx
import React, { createContext, useState, useContext, useRef } from 'react';
//@ts-ignore
import { MediaLibrary } from 'expo-media-library';
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
});

//@ts-ignore
export const MusicPlayerProvider: React.FC = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<MediaLibrary.Asset | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<MediaLibrary.Asset[]>([]);
  const sound = useRef<Audio.Sound | null>(null);

  const play = () => {
    setIsPlaying(true);
    sound.current?.playAsync();
  };

  const pause = () => {
    setIsPlaying(false);
    sound.current?.pauseAsync();
  };

  const playNextSong = () => {
    // Add logic to play the next song
  };

  const playPreviousSong = () => {
    // Add logic to play the previous song
  };

  const addToFavorites = (song: MediaLibrary.Asset) => {
    setFavorites((prevFavorites) => [...prevFavorites, song]);
  };

  const removeFromFavorites = (song: MediaLibrary.Asset) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== song.id));
  };

  return (
    <MusicPlayerContext.Provider value={{ currentSong, isPlaying, play, pause, setCurrentSong, playNextSong, playPreviousSong, favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
