import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Iconsizes} from '../Constants/Dimensions';
import {colors} from '../Constants/Colors';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';

export const GoToPrivious = ({size = Iconsizes.md}) => {
  const hadleGoToPrivious= ()=>{
    TrackPlayer.skipToPrevious()
  }
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={hadleGoToPrivious}>
      <MaterialCommunityIcons
        name={'skip-previous-outline'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const PlayButton = ({size = Iconsizes.xl}) => {
  const isPlaying = true
  const {playing} = useIsPlaying()

  const handlePlayPause = ()=>{
    if (playing) {
      console.log("isPlying");   
      TrackPlayer.pause();
    }
    else{
      TrackPlayer.play()
    }
  }
  
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePlayPause}>
      <FontAwesome6
        name={playing ? 'pause' : 'play'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const GoToNext = ({size = Iconsizes.xl}) => {

  const hadleGoToNext = () => {
    TrackPlayer.skipToNext();
  };
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={hadleGoToNext}>
      <MaterialCommunityIcons
        name={'skip-next-outline'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};
