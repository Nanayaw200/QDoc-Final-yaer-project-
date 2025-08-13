import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter} from 'expo-router'
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function about() {
  const historyList=[
    {
        id:1,
        name:'Personal Information',
        icon:require('./../../assets/images/user.png'),
        path:''
    },
    {
        id:2,
        name:'Purchases History',
        icon:require('./../../assets/images/invoice.png'),
        path:'/History/purchases'
    },
    {
        id:3,
        name:'Medical History',
        icon:require('./../../assets/images/examination.png'),
        path:'/History/medicals'
    },
    {
        id:4,
        name:'Search History',
        icon:require('./../../assets/images/searchhistory.png'),
        path:''
    },
]
  
const router=useRouter();

const onHistoryClick=(item)=>{
  router.push(item.path)
}
const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'History',
      headerShown:true,
    })
  },[])
  return (
    <View>
      <Text style={{
        fontSize:30,
        padding:10,
        textAlign:'center',
        fontFamily:'outfit'
      }}>
        Browse Through Your History Here!
      </Text>
      <FlatList
      data={historyList}
      renderItem={({item,index})=>(
        <TouchableOpacity
        onPress={()=>onHistoryClick(item)}    
        style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          gap:20,
          margin:20,
          padding:5,
          borderWidth:1.5,
          backgroundColor:"#fff",
          borderColor:'black',
          borderBottomLeftRadius:20,
          borderTopRightRadius:20,
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
          fontFamily:'outfit1'
         }}>
          {item.name}</Text> 
        </TouchableOpacity>
      )}
      />
    </View>
  )
}