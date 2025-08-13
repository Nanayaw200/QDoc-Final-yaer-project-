import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter} from 'expo-router'
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function addBusiness() {
  const historyList=[
    {
        id:1,
        name:'Add Business',
        icon:require('./../../assets/images/briefcase.png'),
        path:'/businessManager/addBusiness'
    },
    {
        id:2,
        name:'Manage Business',
        icon:require('./../../assets/images/analysis.png'),
        path:'/businessManager/ManageBus'
    },
    {
        id:3,
        name:'Notifications',
        icon:require('./../../assets/images/bell-notification.png'),
        path:'/businessManager/notifications'
    },
    {
        id:4,
        name:'Update Business',
        icon:require('./../../assets/images/portfolio.png'),
        path:'/businessManager/updateBus'
    },
]
  
const router=useRouter();

const onHistoryClick=(item)=>{
  router.push(item.path)
}
const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'Business DashBoard',
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
       Create, Update and Manage Your Business Here!
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
        backgroundColor:'white',
        borderColor:'orange',
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