// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import RNPickerSelect from 'react-native-picker-select';
// import {db} from '../../configs/FirebaseConfig';
// import { useNavigation } from 'expo-router';
// import { collection, getDocs } from 'firebase/firestore';

// export default function messages() {

//     const navigation=useNavigation();

//     useEffect(()=>{
//         navigation.setOptions({
//           headerTitle:'Book Appointment',
//           headerShown:true
//         })
//       },[])

//     //   functions and methods for specialist data fetch from firebase
//     const [data, setData] = useState([]);  // State to store fetched data
//     const [selectedValue, setSelectedValue] = useState(null);  // State to store selected value
//     const [loading, setLoading] = useState(true);  // Loading state
  
//     // Fetch data from Firebase Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db,'BusinessList')); // Accessing 'businessList' collection
//         console.log('Query Snapshot:', querySnapshot)

//         if (querySnapshot.empty){
//             console.log('No matching documents');
//         } else {
//             const businessList=querySnapshot.docs.map(doc=>{
//               const data=doc.data();  
//               console.log('Document data:', data);
              
//             //   check if the fields exist
//             if (!data.name || !data.category){
//                 console.log("Missing 'name' or 'category' in document", doc.id);
//             }

//               return{
//                 label:`${data.name || 'No name'} -   ${data.category || 'no category'}`,
//                 value:doc.id,
//               };  
//             });
//             setData(businessList);
//         } 
//       } catch (error) {
//         console.log('Error fetching data:', error);
//       } finally {
//         setLoading(false);  // Set loading to false after data is fetched
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle select value change
//   const handleSelect = (value) => {
//     setSelectedValue(value);
//     console.log('Selected value:', value);
//   };


//     return (
//         <View style={styles.container}>
//         <Text style={styles.title}>Select a Specialist</Text>
  
//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />  // Show loading spinner while data is being fetched
//         ) : (
//           <RNPickerSelect
//             onValueChange={handleSelect}
//             items={data}  // Items populated with fetched data
//             value={selectedValue}  // Selected value
//             style={pickerSelectStyles}  // Custom picker styles
//             placeholder={{
//               label: 'Select a specialist..',
//               value: null,
//               color: '#9EA0A4',
//             }}
//           />
//         )}
  
//         {selectedValue && (
//           <Text style={styles.selectedItem}>
//             Selected Specialist: {selectedValue}
//           </Text>
//         )}
//       </View>
//     );
// }const styles = StyleSheet.create({
//     container: {
//       padding: 20,
//       backgroundColor: '#fff',
//       flex: 1,
//     },
//     title: {
//       marginTop: 30,
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     selectedItem: {
//       marginTop: 20,
//       fontSize: 14,
//       color: '#333',
//     },
//   });
  
//   const pickerSelectStyles = {
//     inputIOS: {
//       fontSize: 16,
//       paddingVertical: 12,
//       paddingHorizontal: 10,
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 4,
//       color: 'black',
//       paddingRight: 30, // To ensure text is not hidden
//     },
//     inputAndroid: {
//       fontSize: 16,
//       paddingHorizontal: 10,
//       paddingVertical: 8,
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 4,
//       color: 'black',
//       paddingRight: 30, // To ensure text is not hidden
//     },
//   };