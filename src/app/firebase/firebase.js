// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApuN6QMeFSAqdQ_amp-hPrCIpSFRoicI0",
  authDomain: "jsm-proyecto-de-pruebas.firebaseapp.com",
  databaseURL: "https://jsm-proyecto-de-pruebas.firebaseio.com",
  projectId: "jsm-proyecto-de-pruebas",
  storageBucket: "jsm-proyecto-de-pruebas.appspot.com",
  messagingSenderId: "765649458073",
  appId: "1:765649458073:web:38d579c005d6fe7b08b908"
};


// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );