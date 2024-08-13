import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import TrackPlayer from 'react-native-track-player'

const useTracPlayerRepeatMode = () => {
  //repeat mode
  const [repeatMode,setRepeatMode] = useState(null)

  //to change repeat mode
  const changeRepeatMode = useCallback(async(repeatMode)=>{
    await TrackPlayer.setRepeatMode(repeatMode)
    setRepeatMode(repeatMode)
  },[])

  useEffect(()=>{

 TrackPlayer.getRepeatMode().then(setRepeatMode)
  },[])
  return{
    repeatMode,changeRepeatMode
  }
}


export default useTracPlayerRepeatMode