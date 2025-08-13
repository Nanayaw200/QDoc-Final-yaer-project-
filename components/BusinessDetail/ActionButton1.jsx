import { View, Text, FlatList, Image, Linking } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function ActionButton({business}) {
    const router=useRouter();
    
    const actionButtonMenu=[
        {
            id:1,
            name:'call',
            icon:require('./../../assets/images/phone-call.png'),
            url:'tel:'+business?.Contact
        },
        {
            id:2,
            name:'Location',
            icon:require('./../../assets/images/placeholder.png'),
            url:'https://www.google.com/maps/search/?api=1&query='+business?.Address
        },
        {
            id:3,
            name:'message',
            icon:require('./../../assets/images/chat.png'),
            url:'sms:'+business?.Contact,
        },
        {
            id:4,
            name:'Book',
            icon:require('./../../assets/images/appointment.png'),
            url:null,
        },
    ]

    // Function to navigate to booking screen
    const OnPressHandler=(item)=>{
        if(item.name=='Book')
        {
            // navigate to the add appointment screen
            router.push({
            pathname:'/book/AddAppointment',
            params:{
                specialist:`${business?.name} - ${business?.category}`,
            }
        });
        } else{
        Linking.openURL(item.url);
        }
    }
  return (
    <View style={{
        backgroundColor: '#fff',
        padding: 15,
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