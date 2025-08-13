import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, ScrollView, ImageBackground, Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: "oauth_apple" });

  const fadeAnim = useRef(new Animated.Value(0)).current; // Start invisible

  useEffect(() => {
    // Infinite fade in/out loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuth();
      if (createdSessionId) setActive({ session: createdSessionId });
    } catch (err) {
      console.error('Google OAuth error', err);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startAppleOAuth();
      if (createdSessionId) setActive({ session: createdSessionId });
    } catch (err) {
      console.error('Apple OAuth error', err);
    }
  };

  const handleCreateAccount = () => {
    console.log("Navigate to Create Account screen");
  };

  const handleLogin = () => {
    console.log("Navigate to Login screen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        
        {/* LEFT SIDE - Animated Splash Image */}
        <View style={styles.leftSide}>
          <Animated.Image
            source={require('./../assets/images/qd1.png')}
            style={[styles.image, { opacity: fadeAnim }]}
            resizeMode="cover"
          />
        </View>

        {/* RIGHT SIDE */}
        <ImageBackground
          source={require('./../assets/images/ridge.jpg')} 
          style={styles.rightSide}
          resizeMode="cover"
        >
          <View style={styles.subContainer}>
            <Text style={styles.title}>
              Welcome To Your{" "}
              <Text style={styles.highlight}>NUMBER ONE MEDICAL AID APP</Text>
            </Text>
            <Text style={styles.subtitle}>
              Book your appointment with health experts near you and get the best medical care
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.btn, styles.createBtn]} onPress={handleCreateAccount}>
              <Text style={[styles.btnText, styles.createBtnText]}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.loginBtn]} onPress={handleLogin}>
              <Text style={[styles.btnText, styles.loginBtnText]}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.continue}>Continue with:</Text>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]} onPress={handleGoogleLogin}>
                <Ionicons name="logo-google" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={[styles.btnText, { color: "#fff" }]}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, styles.appleBtn]} onPress={handleAppleLogin}>
                <Ionicons name="logo-apple" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={[styles.btnText, { color: "#fff" }]}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  contentWrapper: {
    flexDirection: width > 768 ? 'row' : 'column',
    height: width > 768 ? height : 'auto',
  },
  leftSide: {
    flex: 1,
    height: width > 768 ? '100%' : 300,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: width > 768 ? 0 : 20,
  },
  rightSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width > 768 ? 50 : 20,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)', // light overlay for text readability
  },
  subContainer: {
    marginBottom: 20,
    maxWidth: 500,
    zIndex: 2,
  },
  title: {
    fontSize: width > 768 ? 32 : 28,
    textAlign: 'center',
    fontFamily: 'outfit2',
    marginBottom: 10,
  },
  highlight: {
    color: 'blue',
    fontFamily: 'outfit',
  },
  subtitle: {
    fontSize: width > 768 ? 18 : 16,
    textAlign: 'center',
    color: 'gray',
    fontFamily: 'outfit1',
  },
  buttonGroup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
    width: width > 768 ? 350 : '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    zIndex: 2,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 10,
    paddingVertical: width > 768 ? 18 : 14,
    paddingHorizontal: width > 768 ? 60 : 40,
    width: '100%',
    borderWidth: 1,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: width > 768 ? 18 : 16,
  },
  createBtn: {
    backgroundColor: '#ffffff',
    borderColor: 'orange',
  },
  createBtnText: {
    color: 'orange',
  },
  loginBtn: {
    backgroundColor: '#ffffff',
    borderColor: 'blue',
  },
  loginBtnText: {
    color: 'blue',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: width > 768 ? 16 : 12,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  googleBtn: {
    backgroundColor: '#DB4437',
  },
  appleBtn: {
    backgroundColor: '#000000',
  },
  continue:{
    fontFamily: 'inter',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 7,
  }
});
