import { View, Text, Image, ScrollView} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function SliderList({slider,/*onSliderPress*/}) {
  return (
    <TouchableOpacity 
    // onPress={()=>onSliderPress(slider)} 
    style={{
        display:'flex',
        flexDirection:'row',
        gap:5,
        borderWidth:1,
        borderRadius:20,
        backgroundColor:'#fff',
        borderColor:'orange',
        marginRight:10,
        paddingBottom:moderateScale(16),
        paddingTop:moderateScale(16),
        paddingLeft:moderateScale(6),
        paddingRight:moderateScale(6)
    }}
    >  
      <Image source={{uri:slider.imageUrl}}
      style={{
        width: scale(80),
        height:verticalScale(80),
        borderRadius:20,
        margin:5,
        marginBottom:10,
      }}
      />
      <View style={{
        flex:1,
        gap:5
      }}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit2'
      }}>{slider.name}</Text>
      <Text style={{
        fontSize:14,
        width:340,
        fontFamily:'outfit1'
      }}>{slider.body}</Text>
      </View>
    </TouchableOpacity>
  )
}