// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz8LebAPuiY7dg_J8cxZ6vueoBLuTGQow",
  authDomain: "grocery-a3645.firebaseapp.com",
  databaseURL: "https://grocery-a3645-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "grocery-a3645",
  storageBucket: "grocery-a3645.appspot.com",
  messagingSenderId: "342555641757",
  appId: "1:342555641757:web:550c1a219aa62accc65174",
  measurementId: "G-TJ49MBWW1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app)