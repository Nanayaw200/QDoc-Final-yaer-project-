import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Platform, SafeAreaView, ImageBackground,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Home/Header1';
import Slider from '../../components/Home/Slider1';
import Category from '../../components/Home/Category1';
import NextAppoinmentCard from '../../components/Home/NextAppoinmentCard1';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Pattern + Gradient background */}
      <ImageBackground
        source={require('../../assets/images/texture health.jpg')} 
        style={StyleSheet.absoluteFill}
        resizeMode="repeat"
      >
        <LinearGradient
          colors={['rgba(243, 249, 255, 0.9)', 'rgba(230, 240, 250, 0.95)']}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      {/* Header */}
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Popular Categories */}
        <Animatable.View
          animation="fadeInUp"
          delay={150}
          duration={800}
          style={styles.card}
        >
          <Category />
        </Animatable.View>

        {/* Health Tips Slider */}
        <Animatable.View
          animation="fadeInUp"
          delay={300}
          duration={600}
          style={styles.card}
        >
          <Slider />
        </Animatable.View>

        {/* Next Appointment */}
        <Animatable.View
          animation="fadeInUp"
          delay={500}
          duration={600}
          style={styles.card}
        >
          <NextAppoinmentCard />
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: width > 1024 ? '5%' : width > 768 ? '4%' : 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});
