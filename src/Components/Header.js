import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Iconsizes, spacing} from '../Constants/Dimensions';
import { useNavigation } from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation()
  const openDrawer = ()=>{
    navigation.toggleDrawer()

  }
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer}>
        <FontAwesome5
          name={'grip-lines'}
          color={colors.iconPrimary}
          size={Iconsizes.md}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <AntDesign
          name={'search1'}
          color={colors.iconPrimary}
          size={Iconsizes.md}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});

export default Header;
