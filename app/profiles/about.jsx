import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function about() {
  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'About',
      headerShown:true,
    })
  },[])
  return (
    
    
<View style={{
  padding:20,
  gap:25
}}>
 <Text style={{fontSize:22,color:'orange',fontFamily:'outfit2'}}>1. INTRODUCTION </Text>

<Text style={{fontFamily:'outfit1'}}>
  Our health is one of the most important things in our lives. It affects your physical, mental, and emotional well-being. That's why it's so important to be proactive about your health and take steps to prevent illness and disease (Health Care). Health care is an important determinant in promoting the general physical and mental health and well-being of people around the world. Healthcare is a part of life we all consider to be something we are entitled to – it is our right to have access to healthcare whenever we need it. However, for many people in Ghana, this is simply not an option. Those living in poverty, or dealing with the devastating effects of poor health care delivery systems and economic hardships do not have access to healthcare – even the most basic medical supplies are out of reach for many vulnerable people.
  The proposed Online Medical Aid Software seeks to enhance the swift delivery of health care services and medical supplies digitally to people in the school. This mobile app aims to boost the speed of medical appointments, diagnosis, and also basic health care education to all mobile users.
</Text>

<Text style={{fontSize:22,color:'orange',fontFamily:'outfit2'}}>2.	PROBLEM STATEMENT</Text>

<Text style={{fontFamily:'outfit1'}}>
  Healthcare is a part of life we all consider to be something we are entitled to – it is our right to have access to healthcare whenever we need it. However, for many people across the world, this is simply not an option. Those living in poverty, or dealing with the devastating effects of poor health care delivery systems and economic hardships do not have access to healthcare – even the most basic medical supplies are out of reach for many vulnerable people.
  The proposed Online Medical Aid Software seeks to enhance the swift delivery of health care services and medical supplies digitally to people in the school. This mobile app aims to boost the speed of medical appointments, diagnosis, delivery of medicine and health care supplies and also basic health care education to all mobile users.
</Text>

<Text style={{fontSize:22,color:'orange',fontFamily:'outfit2'}}>3.	PROBLEM SCOPE</Text>
<Text>
  The project will focus on developing a mobile application specifically design for medical assistance to every smart mobile user in the country.
</Text>

<Text style={{fontSize:22,color:'orange',fontFamily:'outfit2'}}>4.	APPLICATION'S AIMS AND OBJECTIVES</Text>

<Text style={{fontFamily:'outfit1'}}>
  The targets of the Online Medical Aid application are diverse and envelops the following key objectives:

  Fast and effective medical consultation: To develop an application that provides an avenue to book appointments with doctors and regulate the period of appointments. This developments aims to control the time wasted in queues or manage consultations in a well-structured manner. 

  Virtual Consultations: to develop a space for people to access medical consultations virtually when in need.

  Quick and Enhanced Diagnosis: To provide quick access to diagnosis tools virtually and also store medical records for future predictions and determination of diseases.

  Health care Literacy and Tips: To provide a platform for interactive learning and research on health related topics. 
</Text> 
</View>
  )
}