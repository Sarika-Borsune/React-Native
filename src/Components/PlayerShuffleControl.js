import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../Constants/Colors';
import {Iconsizes} from '../Constants/Dimensions';
import TrackPlayer from 'react-native-track-player';

const PlayerShuffleControl = () => {
  const shuffleSongs = async()=>{
    let queue = await TrackPlayer.getQueue()
    await TrackPlayer.reset()
    queue.sort(()=>Math.random()-0.5)
    await TrackPlayer.add(queue)
    await TrackPlayer.play()

  }
  return (
    <View>
      <TouchableOpacity onPress={shuffleSongs}>
        <MaterialCommunityIcons
          name={'shuffle'}
          color={colors.iconSecondary}
          size={Iconsizes.md}
        />
      </TouchableOpacity>
    </View>
  );
}

export default PlayerShuffleControl

const styles = StyleSheet.create({})