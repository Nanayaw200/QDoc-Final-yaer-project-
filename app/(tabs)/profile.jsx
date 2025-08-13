import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default function profile() {
  return (
    <ScrollView style={{
      flex: 1,
      padding:moderateScale(18)
    }}>
      <Text style={{
        paddingTop:20,
        fontSize:30,
        fontFamily:'outfit',
        color:'orange',
        textAlign:'center'
      }}>Profile</Text>

      {/* User info */}
        <UserIntro/>
      {/* Menu List */}
      <MenuList/>
    </ScrollView>
  )
}