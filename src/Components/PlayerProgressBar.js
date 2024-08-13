import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
import {fontFamilies} from '../Constants/Fonts';
import {fontSizes, spacing} from '../Constants/Dimensions';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { formatSecondsToMinute } from '../Utils';

const PlayerProgressBar = () => {
  const {duration,position} = useProgress()
  const progress = useSharedValue(0.7);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false)

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration :0
    
  }
  const trackElapsedTime = formatSecondsToMinute(position)
  const trackRemainingTime = formatSecondsToMinute(duration - position)
  return (
    <View>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>{'-'}{trackRemainingTime}</Text>
      </View>
      <Slider
        style={styles.sliderContainer}
        containerStyle={{height: 5, borderRadius: spacing.sm}}
        theme={{
          maximumTrackTintColor: colors.maximumTintColor,
          minimumTrackTintColor: colors.minimumTintColor,
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        thumbWidth={15}
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
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  container: {},
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  timeText: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    opacity: 0.75,
  },
  sliderContainer: {
    marginVertical: spacing.xl,
  },
});
