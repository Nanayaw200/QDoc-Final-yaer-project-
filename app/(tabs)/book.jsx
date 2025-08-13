import { View, Text, TextInput, Alert, Modal, StyleSheet } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function book() {
  const navigation=useNavigation();
  const router=useRouter();
  const route=useRoute();  

  // Get appointment data passed from AddAppointment screen
  const newAppointmentData = route?.params?.appointmentData;
  const rescheduleIndex= route?.params?.rescheduleIndex;

  // Manage appointment data in state
  const [appointments, setAppointments] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');

  useEffect(() => {
    if (newAppointmentData) {
      if (rescheduleIndex !== undefined){
        setAppointments((prev) =>{
          const updatedAppointments =[...prev];
          updatedAppointments[rescheduleIndex]=newAppointmentData;
          return updatedAppointments.sort((a,b)=>{
            const dateTimeA = new Date(`${a.date} ${a.time}`);
            const dateTimeB = new Date(`${b.date} ${b.time}`);
            console.log("Sorting Dates:", dateTimeA, dateTimeB);
            return dateTimeA - dateTimeB;
          });
        });
      } else{
      setAppointments((prev) => 
        [...prev, newAppointmentData].sort((a,b)=>{
          const dateTimeA = new Date(`${a.date} ${a.time}`);
          const dateTimeB = new Date(`${b.date} ${b.time}`);
          console.log("Sorting Dates:", dateTimeA, dateTimeB);
          return dateTimeA - dateTimeB;
        }) // Append new appointment to existing state
      );
    }
  }
  }, [newAppointmentData, rescheduleIndex]);

    const openDeleteOptions = (index) => {
    setSelectedAppointmentIndex(index);
    setModalVisible(true);
  };

  const handleCancel=()=>{
    const updatedAppointments=appointments.filter(
      (_, i) => i !== selectedAppointmentIndex
    );
    console.log('Cancellation Reason:', cancellationReason);
    setAppointments(updatedAppointments);
    setModalVisible(false);
    setCancellationReason('');
  };

  const handleReschedule=()=>{
    setModalVisible(false);
    router.push({
    pathname:'book/AddAppointment', 
    params:{
      rescheduleData: appointments[selectedAppointmentIndex],
      rescheduleIndex:selectedAppointmentIndex,
    },
  });
};

  
  return (
    <View>
      <Text style={{
        fontSize:35,
        padding:20,
        marginTop:30,
        textAlign:'center',
        fontFamily:'outfit',
      }}>Book Appoinments Here!</Text>
      <View>
        {/* Search Bar */}
        <View style={{
          display:'flex',
          flexDirection:'row',
          gap:20,
          alignItems:'center',
          padding:15,
          marginVertical:10,
          marginTop:10,
          marginLeft:20,
          marginRight:20,
          borderRadius:17,
          borderColor:'orange',
          borderWidth:1,
          backgroundColor:'#fff'
        }}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput placeholder='Search  '
          style={{
            color:'black',
            fontSize:18,
            fontFamily:'outfit1',
          }}
          />
        </View>
        <TouchableOpacity 
        onPress={()=>router.push('book/AddAppointment')}
        style={{
          alignItems:'center',
          marginTop:15,
        }}>
        <Ionicons name="add-circle" size={50} color="orange" />
        <Text style={{
          fontSize:20,
          fontFamily:'outfit2'
        }}>Add Appointment</Text>
        </TouchableOpacity>
        </View>
        
          {/* Display Booked Appointments */}  

        <View style={{
          padding:20,
          marginTop:30,
        }}>
          <Text style={{
            fontSize:20,
            fontFamily:'outfit2',
            textAlign:'center',
          }}>My Appointments</Text>
      {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <View
              key={index}
              style={{
                padding: 20,
                borderWidth: 1,
                borderColor: 'orange',
                marginBottom: 10,
                marginRight: 10,
                marginLeft: 10,
                borderRadius: 15,
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: 'outfit1' }}>
                Booking ID:{appointment.name} ({appointment.type})
              </Text>
              <Text style={{ fontSize: 18, fontFamily: 'outfit1' }}>
                Specialist: {appointment.specialist}
              </Text>
              <Text style={{ fontSize: 18, fontFamily: 'outfit1' }}>
                Date: {appointment.date}
              </Text>
              <Text style={{ fontSize: 18, fontFamily: 'outfit1' }}>
                Time: {appointment.time}
              </Text>
              <TouchableOpacity
                onPress={() => openDeleteOptions(index)}
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontFamily: 'outfit2' }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <TouchableOpacity
            style={{
              padding: 60,
              borderWidth: 2,
              borderColor: 'orange',
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 25,
              backgroundColor: '#fff',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'orange',
                fontSize: 25,
                fontFamily: 'outfit1',
              }}
            >
              No Appointments Yet
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* {modal for cancel/reschedule Options} */}
      <Modal
      visible={isModalVisible}
      transparent
      animationType='fade'
      onRequestClose={()=>setModalVisible(false)}
      >
       <View style={styles.modalcontainer}>
         <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cancel or Reschedule?</Text>
          <TextInput
           placeholder="Enter reason for cancellation"
           value={cancellationReason}
           onChangeText={setCancellationReason}
           style={styles.input}
         />
         <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleReschedule}
                style={styles.rescheduleButton}
              >
                 <Text style={styles.rescheduleButtonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    marginLeft:40,
    marginRight:40,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000', // Adds shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, 
    marginTop:'70%'
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'outfit2',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginVertical: 10,
    fontFamily: 'outfit1',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontFamily: 'outfit2',
  },
  rescheduleButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: 'white',
    fontFamily: 'outfit2',
  },
});