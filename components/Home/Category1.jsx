import { View, Text,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { FlatList } from 'react-native';
import { db } from '../../configs/FirebaseConfig';
import CategoryItem from './CategoryItem1';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function Category() {

    const [categoryList,setCategoryList]=useState([]);
    const router=useRouter();
    useEffect(()=>{
        GetCategoryList()
    },[])
    const GetCategoryList=async()=>{
        setCategoryList([])
        const q=query(collection(db,'Categories'));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()])
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
            Popular Categories
            </Text>
            <Text style={{fontFamily:'outfit2'}}>View All</Text>
        </View>

        <FlatList
            data={categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginLeft:15,}}
            renderItem={({item,index})=>(
                <CategoryItem 
                category={item} 
                key={index}
                onCategoryPress={(category)=>router.push('/businessList/'+item.name)}
                />
            )}    
        />
    </View>
  )
}