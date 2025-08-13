import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff',
    }}>
      <Text style={{
        fontSize:30,
        fontFamily:'outfit'
      }}>About</Text>
      <Text style={{
        fontSize:18,
        fontFamily:'outfit1',
        lineHeight:25
      }}>{business?.About}</Text>
    </View>
  )
}