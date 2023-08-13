import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA7lBzJUdRtN3vA680x9GA5wLc5xoFDTFg",
  authDomain: "medsys-99d06.firebaseapp.com",
  projectId: "medsys-99d06",
  storageBucket: "medsys-99d06.appspot.com",
  messagingSenderId: "1062613846968",
  appId: "1:1062613846968:web:92b3247dd17c3c93df1d4d",
  measurementId: "G-20BHKJ88GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);