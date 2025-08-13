import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function help() {

  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'help',
      headerShown:true,})
  },[])
  return (
    <View>
      <Text style={{
        fontSize:24,
        fontWeight:'condensedBold',
        textAlign:'center',
        marginTop:20,
        backgroundColor:'#fff',
        borderRadius:20,
        borderWidth:1,
        borderColor:'orange',
        fontFamily:'outfit'
      }}>NEED HELP UNDERSTANDING THE FUNCTIONS AND FEATURES OF THIS APP!</Text>
    </View>
  )
}