import { View, Text , Image} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function UserIntro() {
    const {user}=useUser();
  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(25)
    }}>
      <Image source={{uri:user?.imageUrl}}
      style={{
        width:scale(60),
        height:verticalScale(60),
        borderRadius:moderateScale(70),
      }}
      />
      <Text style={{
        fontSize:20,
        fontFamily:'outfit'
      }}>{user?.fullName}</Text>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit1',
        color:'blue'
      }}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}