import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function NextAppoinmentCard() {
  return (
    <View>
    <View style={{
            padding:moderateScale(17),
            marginTop:moderateScale(12),
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
        }}>
        <Text style={{
            fontSize: 22,
            fontFamily:'outfit2'
        }}>
            Next appointment
            </Text>
            <Text style={{fontFamily:'outfit2'}}>View All</Text>
        </View>
        <TouchableOpacity style={{
          padding: moderateScale(50),
          borderWidth:2,
          borderColor:'orange',
          marginRight:moderateScale(8),
          marginLeft:moderateScale(8),
          borderBottomLeftRadius:moderateScale(15),
          borderTopRightRadius:moderateScale(15),
          backgroundColor:'orange'
        }}>
          <View>
            <Text style={{
              textAlign:'center',
              color:'white',
              fontSize: 25,
              fontFamily:'outfit1',
            }}>No appointments Yet</Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}