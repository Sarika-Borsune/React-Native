import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/Navigation/StackNavigation';
import DrawerNavigation from './src/Navigation/DrawerNavigation';
import TrackPlayer from 'react-native-track-player';
import { useSetupPlayer } from './src/Hooks/useSetUpPlayer';
import { DarkaTheme } from './src/Theme/DarkTheme';
import { useLikeSongs } from './src/Store/LikeSongs';
import {Provider} from 'react-redux';
const App = () => {
  const {loadLikedSongs} = useLikeSongs();
  // const setupPlayer = async () => {
  //   await TrackPlayer.setupPlayer();
  // };

  useEffect(() => {
   loadLikedSongs()
  }, []);

  const onLoad = ()=>{
    console.log("setup initialized successfully");

    
  }
  useSetupPlayer({onLoad})

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer >
        {/* <StackNavigation /> */}
        <DrawerNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
export default App;
