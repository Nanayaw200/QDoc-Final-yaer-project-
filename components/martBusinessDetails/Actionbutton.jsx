import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function Actionbutton({business}) {
    const websiteUrl = business?.website ? 
    (business.website.startsWith('http') ? business.website : 'https://' + business.website) : 
    null;

    const actionButtonMenu=[
        {
            id:1,
            name:'call',
            icon:require('./../../assets/images/phone-call.png'),
            url:'tel:'+business?.contact
        },
        {
            id:2,
            name:'Location',
            icon:require('./../../assets/images/placeholder.png'),
            url:'https://www.google.com/maps/search/?api=1&query='+business?.address
        },
        {
            id:3,
            name:'Message',
            icon:require('./../../assets/images/chat.png'),
            url:'sms:'+business?.contact,
        },
        {
            id:4,
            name:'Website',
            icon:require('./../../assets/images/internet.png'),
            url:websiteUrl
        },
    ]

    const OnPressHandler=(item)=>{
        if(item.name=='share')
        {
            return ;
        }
        Linking.openURL(item.url);
    }
  return (
    <View style={{
        backgroundColor:'#fff',
        padding:10
    }}>
     <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent:'space-between'}}
        renderItem={({item,index})=>(
            <TouchableOpacity key={index}
            onPress={()=>OnPressHandler(item)}
            >
                <Image source={item?.icon}
                    style={{
                        width:50,
                        height:50,
                    }}
                />
                <Text style={{
                    fontSize: 16,
                    fontFamily:'outfit2',
                    color:'orange',
                    textAlign:'center'
                }}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}