import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { colors } from '../Constants/Colors'
import { fontSizes, Iconsizes, spacing } from '../Constants/Dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fontFamilies } from '../Constants/Fonts'
const CustomeDrawerContent =(props) => {
  const isDarkModeOn = false
  const toggleDrawer = ()=>{
    props.navigation.toggleDrawer()
  }
  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.headerIconConatiner}>
        <TouchableOpacity onPress={toggleDrawer}>
          <AntDesign
            name={'close'}
            size={Iconsizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Octicons
            name={isDarkModeOn ? 'sun' : 'moon'}
            size={Iconsizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.menuItemConatiner}>
        <DrawerItem
          label={'Profile'}
          icon={() => (
            <FontAwesome
              name={'user'}
              size={Iconsizes.sm}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
        />

        <DrawerItem
          label={'Liked Songs'}
          icon={() => (
            <AntDesign
              name={'hearto'}
              color={colors.iconSecondary}
              size={Iconsizes.sm}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('like');
          }}
        />

        <DrawerItem
          label={'Language'}
          icon={() => (
            <FontAwesome
              name={'language'}
              size={Iconsizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
        />

        <DrawerItem
          label={'Contact us'}
          icon={() => (
            <FontAwesome
              name={'envelope-o'}
              size={Iconsizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
        />
        <DrawerItem
          label={'FAQs'}
          icon={() => (
            <FontAwesome
              name={'question-circle-o'}
              size={Iconsizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
        />
        <DrawerItem
          label={'Setting'}
          icon={() => (
            <FontAwesome
              name={'cog'}
              size={Iconsizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomeDrawerContent

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  headerIconConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemConatiner: {
    marginVertical: spacing.xl,
  },
  labelStyle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.medium,
    color: colors.textPrimary,
  },
  drawerItem: {
    marginVertical: spacing.sm,
  },
});