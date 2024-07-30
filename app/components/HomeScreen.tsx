// HomeScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // If using Expo

// import Ionicons from 'react-native-vector-icons/Ionicons'; // If not using Expo
import FavoritesScreen from './tabs/FavoritesScreen';
import ArtistsScreen from './tabs/ArtistsScreen';
import PlaylistsScreen from './tabs/PlaylistsScreen';
import SongsScreen from './tabs/SongsScreen';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Playlists':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Songs':
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              break;
            case 'Artists':
              iconName = focused ? 'people' : 'people-outline';
              break;
          }
          // @ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide the header for all tab screens
      })}
    >
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      <Tab.Screen name="Songs" component={SongsScreen} />
      <Tab.Screen name="Artists" component={ArtistsScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
