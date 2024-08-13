import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../Constants/Colors'
import Header from '../Components/Header';
import SongCardCategory from './SongCardCategory';
import FloatingPlayer from '../Components/FloatingPlayer';
import { songsWithCategory } from '../Data/SongWithCategoryData';
import { useActiveTrack } from 'react-native-track-player';

const HomeScreen = () => {
  const activeTrack = useActiveTrack();
  const [songsWithCategory ,setSongsWithCategory] = useState()
  //sample itunes.apple.com api for music
 useEffect(() => {
   const fetchSongs = async () => {
     try {
       const recommendedResponse = await fetch(
         'https://itunes.apple.com/search?term=daft+punk&entity=song&limit=10',
       );
       const recommendedData = await recommendedResponse.json();
       const recommendedSongs = recommendedData.results.map(song => ({
         url: song.previewUrl,
         title: song.trackName,
         artist: song.artistName,
         artwork: song.artworkUrl100,
       }));

       const newReleaseResponse = await fetch(
         'https://itunes.apple.com/search?term=new+releases&entity=song&limit=10',
       );
       const newReleaseData = await newReleaseResponse.json();
       const newReleases = newReleaseData.results.map(song => ({
         url: song.previewUrl,
         title: song.trackName,
         artist: song.artistName,
         artwork: song.artworkUrl100,
       }));

       setSongsWithCategory([
         {title: 'Recommended For You', songs: recommendedSongs},
         {title: 'New Release', songs: newReleases},
       ]);

     } catch (error) {
       console.error('Error fetching songs:', error);
     }
   };

   fetchSongs();
 }, []);


  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={songsWithCategory}
        renderItem={SongCardCategory}
        contentContainerStyle={{paddingBottom: 200}}
      />
      {activeTrack && <FloatingPlayer />}
    </View>
  );
}

export default HomeScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});