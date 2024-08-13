import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../Screens/HomeScreen';
import PlayerScreen from '../Screens/PlayerScreen';
import LikedScreen from '../Screens/LikedScreen';
import {
  createNativeStackNavigator,
  createStackNavigator,
} from '@react-navigation/stack';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      // initialRouteName="like"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="like" component={LikedScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigation

const styles = StyleSheet.create({})