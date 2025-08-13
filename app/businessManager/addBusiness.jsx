import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import RNPickerSelect from 'react-native-picker-select';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../configs/FirebaseConfig';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function addBusiness() {
    const navigation=useNavigation();
    const [image,setImage]=useState(null);

    const [name,setName]=useState();
    const [Address,setAddress]=useState();
    const [category,setCategory]=useState();
    const [Contact,setContact]=useState();
    const [About,setAbout]=useState();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:'Add a new Speciality Or Business'
        })
    },[])

    const onImagePick=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            quality:1
        });
        setImage(result?.assets[0].uri);
        console.log(result);
    }

    const onAddDetails=async()=>{
        const fileName=Date.now().toString()+".jpg";
        const resp=await fetch(image);
        const blob=await resp.blob();

        const imageRef=ref(storage,'addBusiness/'+fileName);
        uploadBytes(imageRef,blob).then((snapshot)=>{
            console.log('File uploaded')
        }).then(resp=>
            getDownloadURL(imageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
            })
        )
    }

  return (
    <View>
      <Text style={{
        fontSize:30,
        padding:moderateScale(8),
        textAlign:'center',
        fontWeight:'bold',
      }}>Add Speciality or Business Details</Text>
      <Text style={{
        fontSize:18,
        color:'gray',
        textAlign:'center'
      }}>Fill all details in order to add your speciality or business details</Text>
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
        <TextInput placeholder='Business Name'
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
          fontWeight:'300',
          color:'black',
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
          fontWeight:'300',
          color:'black',
        }}
        />
         <TextInput placeholder='category'
         onChange={(v)=>setCategory(v)}
        style={{
          padding:moderateScale(10),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontWeight:'300',
          color:'black',
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
          fontWeight:'300',
          color:'black',
        }}
        />
        <TextInput placeholder='About'
        onChange={(v)=>setAbout(v)}
        style={{
          padding:moderateScale(10),
          borderWidth:1,
          borderRadius:15,
          fontSize:18,
          marginTop:15,
          marginRight:10,
          marginLeft:10,
          borderColor:'orange',
          fontWeight:'300',
          color:'black',
        }}
        />
        <View style={{
          padding:moderateScale(7),
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
          onValueChange={(value) => setCategory(value)}
          items={[ 
            { label: 'Health Speciality', value: 'Speciality' },
            { label: 'Health Business', value: 'Medi Mart' },
          ]}
        />
        </View>
        <TouchableOpacity style={{
          padding:moderateScale(15),
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
          }}>Add Business details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}