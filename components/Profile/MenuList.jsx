import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { SignedOut, useAuth } from '@clerk/clerk-expo'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native'

export default function MenuList() {
    const {signOut}=useAuth();

    const menuList=[
        {
            id:1,
            name:'History',
            icon:require('./../../assets/images/history.png'),
            path:'/profiles/history'
        },
        {
            id:2,
            name:'Personal Details',
            icon:require('./../../assets/images/user.png'),
            path:'/profiles/add-details'
        },
        {
            id:3,
            name:'Wallet',
            icon:require('./../../assets/images/wallet.png'),
            path:'/profiles/wallet'
        },
        {
            id:4,
            name:'About',
            icon:require('./../../assets/images/information.png'),
            path:'/profiles/about'
        },
        {
            id:5,
            name:'help',
            icon:require('./../../assets/images/help.png'),
            path:'/profiles/help'
        },
        {
            id:6,
            name:'Add Business',
            icon:require('./../../assets/images/briefcase.png'),
            path:'/profiles/addBusiness'
        },
        {
            id:7,
            name:'Logout',
            icon:require('./../../assets/images/logout.png'),
            path:'logout'
        }
    ]

    // Logout function call
    const router=useRouter();

    const onMenuClick=(item)=>{
        if(item.path=='logout'){
            signOut();
            return ;
        }
        router.push(item.path)
    }
  return (
    <ScrollView>
      <FlatList
        data={menuList}
        renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>onMenuClick(item)}
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:20,
                margin:14,
                padding:moderateScale(3),
                borderWidth:1.5,
                backgroundColor:"#fff",
                borderColor:'black',
                borderBottomLeftRadius:moderateScale(15),
                borderTopRightRadius:moderateScale(15),
                borderBottomRightRadius:20
            }}>
                <Image source={item.icon}
                style={{
                    width:50,
                    height:50,
                }}
                />
                <Text style={{
                    fontSize:20,
                    fontFamily:'outfit2',
                }}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />

      <Text style={{
        fontSize:30,
        fontWeight:'500',
        textAlign:'center',
        marginTop:50,
        fontFamily:'outfit1',
        color:'gray'
      }}>Developed By Softny</Text>
    </ScrollView>
  )
}