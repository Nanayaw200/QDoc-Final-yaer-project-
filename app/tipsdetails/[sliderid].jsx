import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import Intro from '../../components/SliderDetails/Intro';

export default function tipsid() {
  const {sliderid}=useLocalSearchParams();
  const [slider,setSlider]=useState();
  const [loading,setLoading]=useState();
    useEffect(()=>{
      GetSliderDetailByID();
    },[])

    // use to get tips details
    const  GetSliderDetailByID=async()=>{
      const docRef=doc(db,'Slider',sliderid);
      const docSnap=await getDoc(docRef);
      if(docSnap.exists()){
        console.log("document data:",docSnap.data());
        setSlider({id:docSnap.id,...docSnap()});
        setLoading(false)
      } else{
        // docSnap.data() will be undfined in this case
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
          {/* intro */}
          <Intro slider={slider}/>
          {/* info */}

          {/* action button */}

          {/* comments */}
       </View>
    }   
    </View>
  )
}