import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs, query } from 'firebase/firestore'
import {db} from './../../configs/FirebaseConfig'
import { FlatList } from 'react-native';
import MediCartList from './MediCartList1';
import { useRouter } from 'expo-router';

export default function MediCart() {

    const [categoryList,setCategoryList]=useState([]);
    const router=useRouter();
    useEffect(()=>{
        GetCategoryList();
    },[]);
    const GetCategoryList=async()=>{
        setCategoryList([]);
        const q=query(collection(db,'Martcategory'));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()]);
        })
    }
  return (
    <View>
        <View>
      <Text style={{
        fontFamily:'outfit2',
        fontSize:30
      }}>
        Special for you
      </Text>
      <View>
      <FlatList
        data={categoryList}

        renderItem={({item,index})=>(
           <MediCartList
           martcategory={item}
           key={index}
           onMartcategoryPress={(martcategory)=>router.push('/medimartlist/'+item.name)}
           />
        )}
      />
      </View>
      </View>
    </View>
  )
}