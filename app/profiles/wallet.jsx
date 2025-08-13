import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function about() {
  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'Wallet',
      headerShown:true,
    })
  },[])
  return (
    <View>
      <Text>wallet</Text>
    </View>
  )
}