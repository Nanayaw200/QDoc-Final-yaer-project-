import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import RNPickerSelect from 'react-native-picker-select';
import { uploadBytes,ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/FirebaseConfig';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function addDetails() {
  const navigation=useNavigation();
  const [image,setImage]=useState(null);

  const [name,setName]=useState();
  const [age,setAge]=useState();
  const [address,setAddress]=useState();
  const [occupation,setOccupation]=useState();
  const [contact,setContact]=useState();
  const [sex,setSex]=useState();

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'Add Personal Details',
      headerShown:true,
    })
  },[])

  const onImagePick=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  }

  const onAddDetails=async()=>{
    const fileName=Date.now().toString()+".jpg";
    const resp=await fetch(image);
    const blob=await resp.blob();

    const imageRef=ref(storage,'PersonalDetails/'+fileName);
    uploadBytes(imageRef,blob).then((snapshot)=>{
      console.log("File uploaded...") 
    }).then(resp=>{
      getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
      })
    })
  }
  return (
    <View>
      <Text style={{
        fontSize:30,
        padding:moderateScale(8),
        textAlign:'center',
        fontFamily:'outfit'
      }}>Add Personal Details</Text>
      <Text style={{
        fontSize:18,
        color:'gray',
        textAlign:'center',
        fontFamily:'outfit2'
      }}>Fill all details in order to add personal details</Text>
      <TouchableOpacity style={{
        marginTop:20,
        alignItems:'center'
      }}
      onPress={()=>onImagePick()}
      >
      {!image? <Image source={require('./../../assets/images/add-photo.png')}
      style={{
        width:scale(70),
        height:verticalScale(70),
      }}
      />
      :
      <Image source={{uri:image}}
      style={{
        width:scale(70),
        height:verticalScale(70),
        borderRadius:20
      }}
      />}
      </TouchableOpacity>

      <View>
        <TextInput placeholder='Fullname'
        onChange={(v)=>setName(v)}
        style={{
          padding:moderateScale(10),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontFamily:'outfit1',
          color:'black',
          backgroundColor:'#fff'
        }}
        />
         <TextInput placeholder='Age'
         onChange={(v)=>setAge(v)}
        style={{
          padding:moderateScale(10),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontFamily:'outfit1',
          color:'black',
          backgroundColor:'#fff'
        }}
        />
         <TextInput placeholder='Address'
         onChange={(v)=>setAddress(v)}
        style={{
          padding:moderateScale(10),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontFamily:'outfit1',
          color:'black',
          backgroundColor:'#fff'
        }}
        />
        <TextInput placeholder='Occupation'
        onChange={(v)=>setOccupation(v)}
        style={{
          padding:moderateScale(10),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontFamily:'outfit1',
          color:'black',
          backgroundColor:'#fff'
        }}
        />
        <TextInput placeholder='Contact'
        onChange={(v)=>setContact(v)}
        style={{
          padding:moderateScale(10),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontFamily:'outfit1',
          color:'black',
          backgroundColor:'#fff'
        }}
        />
        <View style={{
          padding:moderateScale(8),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontWeight:'300',
          color:'black',
          backgroundColor:'#fff'
        }}>
        <RNPickerSelect
          onValueChange={(value) => setAge(value)}
          items={[ 
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
        />
        </View>
        <TouchableOpacity style={{
          padding:moderateScale(16),
          borderWidth:1,
          marginTop:30,
          borderRadius:20,
          backgroundColor:'blue',
          marginRight:40,
          marginLeft:40
        }}
        onPress={()=>onAddDetails()}
        >
          <Text style={{
            color:"#fff",
            textAlign:'center',
            fontSize:24,
            fontFamily:'outfit'
          }}>Add Personal Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}