import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import for AsyncStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyCJKFJC3QBrkLyrJzz2jaqOr5F9WyPNQ",
  authDomain: "chatapp-36cc0.firebaseapp.com",
  projectId: "chatapp-36cc0",
  storageBucket: "chatapp-36cc0.appspot.com",
  messagingSenderId: "695312278916",
  appId: "1:863236316076:web:53da420604cb25fe63b809"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(AsyncStorage)); // Set persistence if needed

export const database = getFirestore(app);
export const storage = getStorage(app);
