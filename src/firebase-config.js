// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgur_FQUdctt_1gB5I3veNGBl3f2DFwNo",
  authDomain: "blogs-be665.firebaseapp.com",
  projectId: "blogs-be665",
  storageBucket: "blogs-be665.appspot.com",
  messagingSenderId: "434213505881",
  appId: "1:434213505881:web:ae9bea6905c37c719a5a48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider