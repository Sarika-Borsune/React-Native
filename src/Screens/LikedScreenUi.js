import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontSizes, Iconsizes, spacing} from '../Constants/Dimensions';
import SongCard from './SongCard';

const LikedScreenUi = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2]}
        renderItem={() => (
          <SongCard
            imageStyle={{height: 100, width: 100}}
            containerStyle={{width: '55%'}}
          />
        )}
        // horizontal={true}
        numColumns={3}
      />
    </View>
  );
};

export default LikedScreenUi;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
});
