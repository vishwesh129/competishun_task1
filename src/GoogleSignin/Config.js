// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1sbMF_0tjlus1K-ci0ApwkjPNHg0_PWU",
  authDomain: "movielist-60d42.firebaseapp.com",
  projectId: "movielist-60d42",
  storageBucket: "movielist-60d42.appspot.com",
  messagingSenderId: "1066769320756",
  appId: "1:1066769320756:web:17e3f6304d099e049b7361",
  measurementId: "G-1G8K6GE88P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}