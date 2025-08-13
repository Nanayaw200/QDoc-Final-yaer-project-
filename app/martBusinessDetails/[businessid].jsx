import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import Intro from '../../components/martBusinessDetails/Intro';
import Actionbutton from '../../components/martBusinessDetails/Actionbutton';
import CartList from '../../components/martBusinessDetails/CartList';

export default function businessDetail() {
    const {businessid}=useLocalSearchParams();
    const [business,setBusiness]=useState();
    const [loading,setLoading]=useState(false);
        useEffect(()=>{
            GetBusinessDetailbyId();
        },[])
    
    // use to get business details
    const GetBusinessDetailbyId=async()=>{
        const docRef=doc(db,'MediCartList',businessid);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document data:",docSnap.data());
            setBusiness({id:docSnap.id,...docSnap.data()});
            setLoading(false)
        } else {
            //docSnap.data()  will be undefined in this case
            console.log("No such document!");
        }
    }

  return (
    <View>
      {loading?
       <ActivityIndicator
        style={{
            marginTop:'70%'
        }}
        size={'large'}
        color={'#0000ff'}
       />:
       <View>
            {/* Intro */}
                <Intro business={business}/>
            {/* Action Button */}
                <Actionbutton business={business}/>
            {/* cart section */}
                <CartList/>
            {/* Reviews */}
       </View>
    }
    </View>
  )
}