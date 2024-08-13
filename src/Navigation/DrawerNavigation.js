import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import CustomeDrawerContent from './CustomeDrawerContent';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false,swipeEdgeWidth:0}} 
    drawerContent={(prop)=><CustomeDrawerContent {...prop}/>}>
      <Drawer.Screen name="DrawerNavigation" component={StackNavigation} />
      
    </Drawer.Navigator>
  );
}

export default DrawerNavigation

const styles = StyleSheet.create({})