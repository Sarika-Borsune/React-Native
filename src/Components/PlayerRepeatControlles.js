import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../Constants/Colors';
import { Iconsizes } from '../Constants/Dimensions';
import useTracPlayerRepeatMode from '../Hooks/useTracPlayerRepeatMode';
import { RepeatMode } from 'react-native-track-player';

const PlayerRepeatControlles = () => {
  const {repeatMode,changeRepeatMode} = useTracPlayerRepeatMode()
const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue];
  const toggleRepeatMode = ()=>{
    if (repeatMode === null) {
      return 
    }
    const currentIndex = repeatOrder.indexOf(repeatMode)
   const nextIndex = (currentIndex+1 )% repeatOrder.length
    changeRepeatMode(nextIndex)
    }
    let iconName = 'repeat';
    switch (repeatMode) {
      case RepeatMode.Off:
        iconName = 'repeat-off';
        break;
      case RepeatMode.Queue:
        iconName = 'repeat';
        break;
      case RepeatMode.Track:
        iconName = 'repeat-once';
        break;

      default:
        break;
    }
  return (
    <View>
      <TouchableOpacity onPress={toggleRepeatMode}>
        <MaterialCommunityIcons
          name={iconName}
          color={colors.iconSecondary}
          size={Iconsizes.md}
        />
      </TouchableOpacity>
    </View>
  );
}

export default PlayerRepeatControlles

const styles = StyleSheet.create({})