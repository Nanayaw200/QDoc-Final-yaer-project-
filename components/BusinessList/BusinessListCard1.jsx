import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'


export default function BusinessListCard({business}) {
    const router=useRouter();
  return (
    <TouchableOpacity style={{
        padding:20,
        margin:10,
        borderRadius:15,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    }}
    onPress={()=>router.push('/businessdetail/'+business.id)}
    >
      <Image source={{uri:business.imageUrl}}
        style={{
            width:120,
            height:120,
            borderRadius:15
        }}
      />
      <View style={{
        flex:1,
        gap:7
      }}>
        <Text style={{
            fontFamily:'outfit2',
            fontSize:22
        }}>{business.name}</Text>
        <Text style={{
            fontSize:16,
            color:'orange',
            fontFamily:'outfit1'
        }}>{business.Address}</Text>
        <View style={{display:'flex',flexDirection:'row',gap:10}}>
            <Image source={require('./../../assets/images/star.png')}
                style={{
                    width:15,
                    height:15
                }}
            />
            <Text style={{fontFamily:'outfit1',}}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}