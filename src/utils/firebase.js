// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL_TnamyVemPWTSlLyklJiZhG54G52Qo8",
  authDomain: "room-buddy-500e5.firebaseapp.com",
  projectId: "room-buddy-500e5",
  storageBucket: "room-buddy-500e5.appspot.com",
  messagingSenderId: "286345644228",
  appId: "1:286345644228:web:57f0bac212022c26dd6191",
  measurementId: "G-HJRMK38S5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)
export const provider = new GoogleAuthProvider();
