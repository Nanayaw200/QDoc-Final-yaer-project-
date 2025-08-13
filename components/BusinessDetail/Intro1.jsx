import { View, Text, Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Intro({business}) {

    const router=useRouter();
  return (
    <View>
        <View style={{
            position:'absolute',
            zIndex:20,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            padding:20,
            marginTop:30
        }}>
        <TouchableOpacity onPress={()=>router.back()}>    
        <Ionicons name="arrow-back-circle" size={50} color="orange" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={50} color="orange" />
        
        </View>
        <Image source={{uri:business?.imageUrl}}
            style={{
                width: '100%',
                height: 350,
             }}
        />

        <View style={{
            padding:15,
            marginTop:-20,
            backgroundColor:'#fff',
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
        }}>
            <Text style={{
                fontSize: 30,
                fontFamily:'outfit2'
            }}>{business?.name}</Text>
            <Text style={{
                fontSize: 20,
               fontFamily:'outfit1',
            }}>{business?.Address}</Text>
        </View>
    </View>
  )
}