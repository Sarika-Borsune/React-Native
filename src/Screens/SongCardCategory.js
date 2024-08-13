import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontSizes, spacing} from '../Constants/Dimensions';
import {colors} from '../Constants/Colors';
import {fontFamilies} from '../Constants/Fonts';
import SongCard from './SongCard';
import TrackPlayer from 'react-native-track-player';
import FloatingPlayer from '../Components/FloatingPlayer';

const SongCardCategory = ({item}) => {
  // console.log('item==>', item);

  const handlePlayTrack = async (selectedTrack, songs = item.songs) => {
    const trackIndex = songs.findIndex(
      track => track.url === selectedTrack.url,
    );
    if (trackIndex === -1) {
      return;
    }
    const beforeTrack = songs.slice(0, trackIndex);
    const afterTrack = songs.slice(trackIndex + 1);
    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTrack);
    await TrackPlayer.add(beforeTrack);
    await TrackPlayer.play();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{item.title}</Text>
      <FlatList
        data={item.songs}
        renderItem={({item}) => (
          <SongCard
            item={item}
            handleSongPlay={selectedTrack => {
              handlePlayTrack(selectedTrack);
            }}
          />
        )}
        horizontal={true}
        ItemSeparatorComponent={<View style={{marginHorizontal: -50}}></View>}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        }}
      />
    </View>
  );
};

export default SongCardCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: fontSizes.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingHorizontal: spacing.lg,
  },
});
