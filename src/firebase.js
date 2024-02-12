// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUyXvHkLjWgDVPVocdXxOAN9Y7HCbz5NU",
  authDomain: "blog-c7b30.firebaseapp.com",
  projectId: "blog-c7b30",
  storageBucket: "blog-c7b30.appspot.com",
  messagingSenderId: "83143473585",
  appId: "1:83143473585:web:e3dd088c07243384c96590"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();