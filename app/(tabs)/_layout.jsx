import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Tablayout() {
  return (
   <Tabs screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:'blue',
   }}>
    <Tabs.Screen 
    options={{
      headerShown:false, 
      tabBarLabel:'Home',
      tabBarIcon:({color})=> <Entypo name="home" size={24} color="orange" />
      }} name='home' />


    <Tabs.Screen 
    options={{
      tabBarLabel:'Explore',
      tabBarIcon:({colour})=> <Foundation name="indent-more" size={24} color="orange" />
    }}name= 'explore' />


    <Tabs.Screen 
    options={{
      tabBarLabel:'Profile',
      tabBarIcon:({colour})=> <Ionicons name="people-circle" size={24} color="orange" />
    }} name='profile' />


    <Tabs.Screen 
    options={{
      tabBarLabel:'Book',
      tabBarIcon:({colour})=> <MaterialCommunityIcons name="clock-time-three" size={24} color="orange" />
    }} name='book' />


    {/* <Tabs.Screen 
    options={{
      tabBarLabel:'Messages',
      tabBarIcon:({colour})=> <MaterialCommunityIcons name="android-messages" size={24} color="orange" />
    }} name='messages' /> */}
   </Tabs>
  )
}
