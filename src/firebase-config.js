// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "exercise-tracker-9da77.firebaseapp.com",
  projectId: "exercise-tracker-9da77",
  storageBucket: "exercise-tracker-9da77.appspot.com",
  messagingSenderId: "968884379416",
  appId: "1:968884379416:web:7407150060676b7b8c086d",
  measurementId: "G-TLN8YFQPV3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

