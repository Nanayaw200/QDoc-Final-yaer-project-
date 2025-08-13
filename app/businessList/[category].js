import { View, Text, FlatList, ActivityIndicator, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where,} from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard1';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default function BusinessListBycategory() {

    const navigation=useNavigation();
    const {category}=useLocalSearchParams();

    const [businessList,setBusinessList]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:category,
        })
        getBusinessList()
    },[]);



    const getBusinessList=async()=>{
        setLoading(true);
        const q=query(collection(db,'BusinessList'),where('category','==',category));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
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
            onRefresh={getBusinessList}
            refreshing={loading}
            renderItem={({item,index})=>(
                <BusinessListCard
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
        No Specialists Found
        </Text>}
    </View>
  )
}