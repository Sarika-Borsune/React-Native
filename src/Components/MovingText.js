import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const MovingText = ({text, animationThreshold, style}) => {
  const translateX = useSharedValue(0);
  const shouldBeAnimate = text.length >= animationThreshold;
  const textWidth = text.length * 3;
  useEffect(() => {
    if (!shouldBeAnimate) return;
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 1000,
          easing: Easing.ease,
        }),
        -1,
        true,
      ),
    );
  }, [text, animationThreshold, translateX, textWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        animatedStyle,
        style,
        shouldBeAnimate && {
          width: 9999,
          paddingLeft: 20,
        },
      ]}>
      <Text>{text}</Text>
    </Animated.Text>
  );
};

export default MovingText;

const styles = StyleSheet.create({});
