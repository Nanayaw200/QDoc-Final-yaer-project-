// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLRGqE5IRQWuJzPO4-ousXLG3wabQQbiA",
  authDomain: "quickdoctor-9e0d8.firebaseapp.com",
  projectId: "quickdoctor-9e0d8",
  storageBucket: "quickdoctor-9e0d8.appspot.com",
  messagingSenderId: "33137377671",
  appId: "1:33137377671:web:f078280f012f4590b95322",
  measurementId: "G-WHS4XQEM3X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app);
// const analytics = getAnalytics(app);