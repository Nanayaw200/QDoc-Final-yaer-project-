import { View, Text, TextInput, ActivityIndicator,StyleSheet, Alert } from 'react-native'
import React, { useEffect,useState} from 'react'
import { useNavigation } from 'expo-router'
import RNPickerSelect from 'react-native-picker-select'
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../../configs/FirebaseConfig';
import { useRouter } from 'expo-router'

export default function AddAppointment() {
  const navigation=useNavigation();
  const router = useRouter(); 
    
  const { specialistInput } = router.query || {};

  
  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'Book Appointment',
      headerShown:true
    })
  },[])

  const [name,setName]=useState();
  const [category,setCategory]=useState();

  // Date Picker funtion
  const [date,setDate]=useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selctedDate, setSelectedDate]=useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const formatDate=(date)=>{
    return date ? date.toLocaleDateString():'Select Date';
  };


  // Time picker funtion
  const [time,setTime]=useState();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime,setSelectedTime]=useState(null)

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm2 = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };
  const formatTime=(time)=>{
    return time ? time.toLocaleTimeString():'Select Time';
  };
  
  const [type,setType]=useState();

      //   functions to fetch specialist data from firebase
      const [data, setData] = useState([]);  // State to store fetched data
      const [selectedValue, setSelectedValue] = useState(null);  // State to store selected value
      const [loading, setLoading] = useState(true);  // Loading state
    
      // Fetch data from Firebase Firestore
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db,'BusinessList')); // Accessing 'businessList' collection
          console.log('Query Snapshot:', querySnapshot)
  
          if (querySnapshot.empty){
              console.log('No matching documents');
          } else {
              const businessList=querySnapshot.docs.map(doc=>{
                const data=doc.data();  
                console.log('Document data:', data);
                
              //   check if the fields exist
              if (!data.name || !data.category){
                  console.log("Missing 'name' or 'category' in document", doc.id);
              }
  
                return{
                  label:`${data.name || 'No name'}   -   ${data.category || 'no category'}`,
                  value:`${data.name || 'No name'}   -   ${data.category || 'no category'} `,
                };  
              });
              setData(businessList);
          } 
        } catch (error) {
          console.log('Error fetching data:', error);
        } finally {
          setLoading(false);  // Set loading to false after data is fetched
        }
      };
  
      fetchData();
    }, []);
  
    // Handle select value change
    const handleSelect = (value) => {
      setSelectedValue(value);
      console.log('Selected value:', value);
    };

    // handle Book Appointment and navigate to the next screen
    const handleBookAppointment = () => {
      const appointmentData = {
        name: name || "No Name",
        // category: category || "No Category",
        date: selctedDate ? selctedDate.toLocaleDateString() : "No Date",
        time: selectedTime ? selectedTime.toLocaleTimeString() : "No Time",
        specialist: selectedValue || specialistInput || "No Specialist Selected",
        type: type || "No Type",
      };

      // Show Confirmation Alert
        Alert.alert(
          'Confirm Booking',
          `Are you sure you want to book this appointment?\n\nName: ${appointmentData.name}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\nSpecialist: ${appointmentData.specialist}\nType: ${appointmentData.type}`,
          [
            {
              text: 'Cancel',
              style:'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => {
                console.log('Appointment Data:', appointmentData);
                navigation.navigate('book', { appointmentData });
            },
          },
          ]
        );

    };

  return (
    <View>
      <Text style={{
        fontFamily:'outfit',
        marginTop:20,
        textAlign:'center',
        fontSize:22
        }}>
        Welcome To QuickDoctor Booking 
      </Text>

      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:12,
        alignItems:'center',
        padding:15,
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        borderColor:'orange',
        borderWidth:1,
        borderRadius:15,
        backgroundColor:'#fff'
      }}>
       
        {/* name bar */}

        <TextInput placeholder='Enter your Name      '
        value={name}
        onChangeText={setName}
        style={{
          color:'black',
          fontFamily:'outfit1'
        }}
        />
      </View>
    
        {/* Date and Time picker */}

        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:12,
            alignItems:'center',
            padding:15,
            marginTop:15,
            marginLeft:10,
            marginRight:10,
            borderColor:'orange',
            borderWidth:1,
            borderRadius:15,
            backgroundColor:'#fff'
        }}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{fontFamily:'outfit1',fontSize:16}}>
              {formatDate(selctedDate)}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        </View>
        <View style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          padding:10,
          marginTop:15,
          marginLeft:10,
          marginRight:10,
          borderColor:'orange',
          borderWidth:1,
          borderRadius:15,
          backgroundColor:'#fff'
        }}>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={{fontFamily:'outfit1',fontSize:16}}>
              {formatTime(selectedTime)}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm2}
        onCancel={hideTimePicker}
        />
        </View>
        
        {/* Specialist Dropdown */}

        <View style={{
          padding:10,
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
  
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />  // Show loading spinner while data is being fetched
        ) : (
          <RNPickerSelect
            onValueChange={handleSelect}
            items={data}  // Items populated with fetched data
            value={selectedValue}  // Selected value
            placeholder={{
              label: 'Select a specialist..',
              value: null,
              color: '#9EA0A4',
            }}
          />
        )}
      </View>

        {/* type of appointment */}
        
        <View style={{
           padding:10,
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
          onValueChange={(value)=>setType(value)}
          placeholder={{
            label:'Select appointment type',
            value:null,
            color:'black'
          }}
          items={[
            { label: 'Virtual', value: 'Virtual' },
            { label: 'In-Person', value: 'In-Person' },
            {label: 'Home Service', value:'Home Service'}
          ]}
          />
        </View>
        {/* Book Appointment Button */}
        <TouchableOpacity style={{
            padding:20,
            borderWidth:1,
            borderRadius:15,
            fontSize:18,
            marginTop:'10%',
            marginRight:40,
            marginLeft:40,
            borderColor:'black',
            fontWeight:'300',
            color:'black',
            backgroundColor:'blue'
        }}
        onPress={handleBookAppointment}>
          <Text style={{
            fontSize:18,
            textAlign:'center',
            fontFamily:'outfit',
            color:'white'
          }}>Book Appointment</Text>
        </TouchableOpacity>
    </View>
  )
}
