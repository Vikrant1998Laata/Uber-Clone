// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {GoogleAuthProvider , getAuth}  from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWvrd5o4aNQs1Wh_zHjTYmCO29NMLZc_I",
  authDomain: "uber-next-clone-live-46003.firebaseapp.com",
  projectId: "uber-next-clone-live-46003",
  storageBucket: "uber-next-clone-live-46003.appspot.com",
  messagingSenderId: "57067646991",
  appId: "1:57067646991:web:79edb5795fcf887bcb337a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth }
