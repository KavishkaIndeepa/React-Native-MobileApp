import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Song {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

interface MusicPlayerContextProps {
  currentSong: Song | null;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  setCurrentSong: (song: Song | null) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(undefined);

export const useMusicPlayer = (): MusicPlayerContextProps => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicPlayerContext.Provider value={{ currentSong, isPlaying, play, pause, setCurrentSong }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
