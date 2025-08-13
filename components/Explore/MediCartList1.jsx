import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function MediCartList({martcategory,onMartcategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onMartcategoryPress(martcategory)}>
      <Image source={{uri:martcategory.imageUrl}}
      style={{
        width: '100%',
        height:200,
        padding:50,
        borderRadius:20,
        marginTop:30,
        marginBottom:20
      }}
      />
      <Text style={{
        fontSize: 25,
        marginTop:-25,
        textAlign:'center',
        fontFamily:'outfit2',
        borderWidth:4,
        borderColor:'orange',
        borderTopLeftRadius:35,
        borderBottomRightRadius:35,
        backgroundColor:'#fff',
        padding:10
      }}>{martcategory.name}</Text>
    </TouchableOpacity>
  )
}