import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import SliderList from './SliderList1'
import { useRouter } from 'expo-router'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function Slider() {
    const [sliderList,setSliderList]=useState([]);
    // const router=useRouter();
    useEffect(()=>{
        GetSliderList();
    },[]);
    const GetSliderList=async()=>{
       setSliderList([]); 
       const q=query(collection(db,'Slider'));
       const querySnapshot=await getDocs(q);

       querySnapshot.forEach((doc)=>{
        console.log(doc.data());
        setSliderList(prev=>[...prev,doc.data()]);
       })
    }
  return (
    <View>
      <View style={{
            padding:moderateScale(14),
            marginTop:moderateScale(12),
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
        }}>
        <Text style={{
            fontSize: 22,
            fontFamily:'outfit2'
        }}>
            Health Tips
            </Text>
            <Text style={{fontFamily:'outfit2'}}>View All</Text>
        </View>
      <View>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft:10,
        }}
        renderItem={({item,index})=>(
          <SliderList
          slider={item}
          key={index}
          // onSliderPress={(slider)=>router.push('/tipsdetails/'+item.name)}    
      />
    )}
    />
    </View>
    </View>
  )
}  