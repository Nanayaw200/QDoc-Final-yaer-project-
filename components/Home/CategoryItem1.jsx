import { View, Text, Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function CategoryItem({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{
        padding:moderateScale(5),
        borderRadius:moderateScale(99),
        marginRight:17
        }}>
            <Image source={{uri:category.icon}}
            style={{
            width: scale(60),
            height:verticalScale(60),
            borderRadius:moderateScale(99)
            }}
            />
      </View>
        <Text style={{
            fontSize:12,
            marginTop:5,
            fontFamily:'outfit',
            textAlign:'center'
        }}>{category.name}</Text>
    </TouchableOpacity>
  )
}