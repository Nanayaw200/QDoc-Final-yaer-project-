import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function MartBusinessListCard({business}) {
    const router=useRouter()

  return (
    <TouchableOpacity style={{
        borderRadius:20,
        padding:10,
        margin:10,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        gap:15,
        alignItems:'center'
    }}
    onPress={()=>router.push('/martBusinessDetails/'+business.id)}
    > 
     <Image source={{uri:business.imageUrl}}
     style={{
        width:120,
        height:120,
        borderRadius:15,
     }}
     />
     <View style={{
        flex:1,
        gap:8
     }}>
     <Text style={{
        fontFamily:'outfit2',
        fontSize:25
     }}>{business.name}</Text>
     <Text style={{
        fontSize:16,
        fontFamily:'outfit1',
        color:'orange'
     }}>{business.address}</Text>
        
        {/* phone icon and contact */}

        <View style={{display:'flex',flexDirection:'row',gap:10}}>
                <Image source={require('./../../assets/images/phone-call.png')}
                    style={{
                        width:20,
                        height:20
                    }}
                />
            <Text style={{
                fontSize:14,
                fontFamily:'outfit1'
        }}>{business.contact}</Text>
        </View>
    </View>
        </TouchableOpacity>

  )
}