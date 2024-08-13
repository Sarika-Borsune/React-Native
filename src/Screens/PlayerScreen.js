import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {colors} from '../Constants/Colors';
import { fontSizes, Iconsizes, spacing } from '../Constants/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { fontFamilies } from '../Constants/Fonts';
import PlayerRepeatControlles from '../Components/PlayerRepeatControlles';
import PlayerShuffleControl from '../Components/PlayerShuffleControl';
import PlayerProgressBar from '../Components/PlayerProgressBar';
import { GoToNext, GoToPrivious, PlayButton } from '../Components/PlayerControles';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { useLikeSongs } from '../Store/LikeSongs';
import MovingText from '../Components/MovingText';
import { isExit } from '../Utils';
const PlayerScreen = () => {

  const truncateTitle = (title, maxWords = 5) => {
    if (!title) return '';

    const words = title.split(' ');
    if (words.length <= maxWords) return title;

    return `${words.slice(0, maxWords).join(' ')}...`;
  };
  const {likedSongs, addToLiked} = useLikeSongs();

console.log(addToLiked);

  const navigation = useNavigation()
  const activeTrack = useActiveTrack()

  console.log(activeTrack);
  
  const url =
    'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/725/325x325/1721817328_whh1S1CyIp_artwork.jpg';
    const isLiked = false
    const [isMute , setIsMute] = useState(false)
    const handleToggleVolume = ()=>{
      TrackPlayer.setVolume(isMute ? 1 : 0)
      setIsMute(!isMute)

    }

    const handleBackPress = ()=>{
      navigation.goBack()

    }
    useEffect(()=>{
      setVolume()

    },[])

    const setVolume = async()=>{
      const volume = await TrackPlayer.getVolume()
      setIsMute(volume === 0 ? true: false)

    }
  return (
    <View style={styles.container}>
      <View style={styles.headerConatiner}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={Iconsizes.md}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: activeTrack?.artwork}} style={styles.coverImage} />
      </View>
      <View style={styles.titleHeartContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{truncateTitle(activeTrack?.title)}</Text>
          {/* <MovingText
            text={activeTrack?.title}
            style={styles.title}
            animationThreshold={20}
          /> */}
          <Text style={styles.artist}>{truncateTitle(activeTrack?.artist)}</Text>
        </View>

        <TouchableOpacity onPress={() => addToLiked(activeTrack)}>
          <AntDesign
            name={isExit(likedSongs ,activeTrack) ? 'heart' : 'hearto'}
            color={colors.iconSecondary}
            size={Iconsizes.md}
          />
        </TouchableOpacity>
      </View>

      <View style={{margin: spacing.md}}>
        <View style={styles.playerControlContainer}>
          <TouchableOpacity
            style={styles.volumeContainer}
            onPress={handleToggleVolume}>
            <Feather
              name={isMute ? 'volume-x' : 'volume-1'}
              color={colors.iconSecondary}
              size={Iconsizes.md}
            />
          </TouchableOpacity>

          <View style={styles.reapetShuffleContainer}>
            <PlayerRepeatControlles />
            <PlayerShuffleControl />
          </View>
        </View>

        <PlayerProgressBar />
        <View style={styles.playPauseContainer}>
          <GoToPrivious size={Iconsizes.lg} />
          <PlayButton size={Iconsizes.lg} />
          <GoToNext size={Iconsizes.lg} />
        </View>
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerConatiner: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerText: {
    fontSize: fontSizes.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  coverImage: {
    height: 250,
    width: 250,
    borderRadius: 10,
  },
  titleHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 0.9,
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.lg,
  },
  artist: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
  },
  playerControlContainer: {
    flexDirection: 'row',
    marginVertical: spacing.xl,
  },
  volumeContainer: {
    flex: 1,
  },
  reapetShuffleContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  playPauseContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:spacing.xl,
    marginTop:spacing.sm

  }
});
