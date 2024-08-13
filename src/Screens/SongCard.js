import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
import {fontSizes, spacing} from '../Constants/Dimensions';
import {fontFamilies} from '../Constants/Fonts';


const SongCard = ({
  imageStyle,
  containerStyle,
  item,
  handleSongPlay,
 
}) => {
  const truncateTitle = (title, maxWords = 2) => {
    if (!title) return '';

    const words = title.split(' ');
    if (words.length <= maxWords) return title;

    return `${words.slice(0, maxWords).join(' ')}...`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => handleSongPlay(item)}>
      <Image
        source={{uri: item?.artwork}}
        style={[styles.converImage, imageStyle]}
      />
      <Text style={styles.title} numberOfLines={1}>
        {truncateTitle(item.title)}
      </Text>
      <Text style={styles.artist}>{item?.artist}</Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
  converImage: {
    height: 200,
    width: 180,
    borderRadius: 20,
    resizeMode: 'contain',
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
});
