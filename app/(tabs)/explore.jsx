import { View, Text, TextInput,ScrollView } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MediCart from '../../components/Explore/MediCart1';


export default function explore() {
  return (
    <View style={{
      flex:1,
      padding:20,
    }}>
      <Text style={{
        fontSize: 40,
        fontFamily:'outfit',
        textAlign:'center',
        marginTop:40
      }}>EXPLORE MEDI MART</Text>
      {/* search bar */}
      <View style={{
          display:'flex',
          flexDirection:'row',
          gap:20,
          alignItems:'center',
          padding:15,
          marginVertical:10,
          marginTop:15,
          borderRadius:17,
          borderColor:'orange',
          borderWidth:1,
          backgroundColor:'#fff'
        }}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput placeholder='Search'
          style={{
            color:'black',
            fontSize:18
          }}
          />
        </View>
          <ScrollView>
      {/* mart categories */}
          <MediCart/>
          </ScrollView>
    </View>
  )
}