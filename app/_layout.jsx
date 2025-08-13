import { Text } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import {useFonts} from 'expo-font'
import { Stack } from "expo-router";
import LogInScreen from "./../components/LogInScreen";
import * as SecureStore from "expo-secure-store"

const tokenCache = {
  async getToken (key) {
    try{
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts ({
    'outfit':require('./../assets/fonts/Outfit-ExtraBold.ttf'),
    'inter':require('./../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'outfit1':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit2':require('./../assets/fonts/Outfit-Bold.ttf'),
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{
          headerShown:false
        }}> 
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        </Stack>
      </SignedIn>
      <SignedOut>
        <LogInScreen/>
      </SignedOut>
    </ClerkProvider>
  );
}
