import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { db } from '../../configs/FirebaseConfig';
import { doc , getDoc} from 'firebase/firestore';
import Intro from '../../components/BusinessDetail/Intro1';
import ActionButton from '../../components/BusinessDetail/ActionButton1';
import About from '../../components/BusinessDetail/About1';
import Reviews from '../../components/BusinessDetail/Reviews1';
import { ScrollView } from 'react-native';

export default function BusinessDetail() {

    
// fetching data from firebase
    const {businessid}=useLocalSearchParams();
    const [business,setBusiness]=useState();
    const [loading,setLoading]=useState(false);
        useEffect(()=>{
            GetBusinessDetailById();
        },[])
    const GetBusinessDetailById=async()=>{
        setLoading(true);
        const docRef=doc(db,'BusinessList',businessid);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document data:",docSnap.data());
            setBusiness({id:docSnap.id,...docSnap.data()});
            setLoading(false)
        }  else {
            //docSnap.data()  will be undefined in this case
            console.log("No such document!");
        }
    }
  return (
    <ScrollView>
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
            {/* Action Buttons */}
            <ActionButton business={business}/>
            {/* About Section */}
            <About business={business}/>
            {/* {review section} */}
            <Reviews business={business}/>
        </View>
        }
    </ScrollView>
  )
}