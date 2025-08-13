import { View, Text, ActivityIndicator,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { FlatList } from 'react-native';
import MartBusinessListCard from '../../components/martBusinessList/MartBusinessListCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function medicartlistbycategory() {
    
    const navigation=useNavigation();
    const {medicart}=useLocalSearchParams();
    
    const [businessList,setBusinessList]=useState([])
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:medicart
        });
        getBusinessList()
    },[])


    // Use to get business list by mart categories
    const getBusinessList=async()=>{
      setLoading(true);
      const q=query(collection(db,'MediCartList'),where("martcategory",'==',medicart))
      const querySnapshot=await getDocs(q);

      querySnapshot.forEach((doc)=>{
        console.log(doc.data());
        setBusinessList(prev=>[...prev,{id:doc?.id, ...doc.data()}])
      })
      setLoading(false);
    }
  return (
    <View>

       {/* Search Bar */}
       <View style={{
          display:'flex',
          flexDirection:'row',
          gap:12,
          alignItems:'center',
          padding:moderateScale(13),
          marginTop:moderateScale(15),
          marginLeft:20,
          marginRight:20,
          borderColor:'orange',
          borderWidth:1,
          borderRadius:17,
          backgroundColor:'#fff'
        }}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput placeholder='Search'
          style={{
            color:'black',
            fontSize:18,
          }}
          />
        </View>

      {businessList?.length>0&&loading==false?
      <FlatList
        data={businessList}
        renderItem={({item,index})=>(
          <MartBusinessListCard
          business={item}
          key={index}
          />
        )}
      />:
      loading?<ActivityIndicator
      style={{
        marginTop:'70%'
      }}
      size={'large'}
      color={'#000'}
      />:
      <Text style={{
        fontSize:40,
        fontFamily:'outfit',
        textAlign:'center',
        marginTop:'50%',
        color:'gray'
      }}>
        No Business Found
      </Text>}
    </View>
  )
}