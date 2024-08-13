import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontSizes, Iconsizes, spacing} from '../Constants/Dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fontFamilies} from '../Constants/Fonts';
import SongCard from './SongCard';
import FloatingPlayer from '../Components/FloatingPlayer';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
import {useLikeSongs} from '../Store/LikeSongs';
import {useNavigation} from '@react-navigation/native';
const LikedScreen = () => {
  const navigation = useNavigation();
  const {likedSongs, addToLiked} = useLikeSongs();
  const activeTrack = useActiveTrack();
  const handlePlayTrack = async (selectedTrack, songs = likedSongs) => {
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
      <View style={styles.headerConatiner}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={Iconsizes.md}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name={'equalizer'}
            color={colors.iconPrimary}
            size={Iconsizes.md}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: spacing.md}}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.headingText}>Liked Songs</Text>
          }
          data={likedSongs}
          renderItem={({item}) => (
            <SongCard
              imageStyle={{height: 150, width: 150}}
              containerStyle={{width: '55%'}}
              item={item}
              handleSongPlay={item => {
                handlePlayTrack(item);
              }}
            />
          )}
          numColumns={3}
          contentContainerStyle={{paddingBottom: 200}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{position: 'absolute', bottom: 0,margin:3}}>
        {activeTrack && <FloatingPlayer />}
      </View>
    </View>
  );
};

export default LikedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  headingText: {
    fontSize: fontSizes.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
