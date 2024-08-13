import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
import {fontSizes, Iconsizes, spacing} from '../Constants/Dimensions';
import {fontFamilies} from '../Constants/Fonts';
import {GoToNext, GoToPrivious, PlayButton} from './PlayerControles';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import MovingText from './MovingText';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {
  useActiveTrack,
  useProgress,
} from 'react-native-track-player';

const FloatingPlayer = () => {
  const navigation = useNavigation();
  const activeTrack = useActiveTrack();

  const url =
    'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/936/325x325/royalty-1619082030-xBgqGZWLw9.jpg';

  const {duration, position} = useProgress();
  const progress = useSharedValue(0.7);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }
  const handleOpenPlyaerScreen = () => {
    navigation.navigate('Player');
  };

  const truncateTitle = (title, maxWords = 3) => {
    if (!title) return '';

    const words = title.split(' ');
    if (words.length <= maxWords) return title;

    return `${words.slice(0, maxWords).join(' ')}...`;
  };

  return (
    <View style={{margin: 2, backgroundColor: '#00031c'}}>
      <View style={{zIndex: 1}}>
        <Slider
          style={styles.container}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          theme={{
            maximumTrackTintColor: colors.maximumTintColor,
            minimumTrackTintColor: colors.minimumTintColor,
          }}
          containerStyle={{}}
          renderBubble={() => {
            return;
          }}
          onSlidingStart={() => {
            isSliding.value = true;
          }}
          onValueChange={async value => {
            await TrackPlayer.seekTo(value * duration);
          }}
          onSlidingComplete={async value => {
            if (!isSliding.value) {
              return;
            }
            isSliding.value = false;
            await TrackPlayer.seekTo(value * duration);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.5}
        onPress={handleOpenPlyaerScreen}>
        <Image source={{uri: activeTrack?.artwork}} style={styles.coverImage} />
        <View style={styles.titleContainer}>
          {/* <Text style={styles.title}> Chof and dust</Text> */}
          <MovingText
            text={activeTrack?.title ? activeTrack?.title : 'Sample'}
            style={styles.title}
            animationThreshold={20}
          />
          <Text style={styles.artist}>
            {truncateTitle(activeTrack?.artist)}
          </Text>
        </View>
        <View style={styles.plyerController}>
          <GoToPrivious size={Iconsizes.md} />
          <PlayButton size={Iconsizes.md} />
          <GoToNext size={Iconsizes.md} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    // borderRadius:30
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    overflow: 'hidden',
    marginLeft: spacing.sm,
    marginRight: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.medium,
  },
  artist: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.medium,
  },
  plyerController: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingRight: spacing.md,
  },
});
