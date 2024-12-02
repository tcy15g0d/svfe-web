// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDECLVLhGVBUB0BVv9ASQ3OQ89nw9Mf9ow",
  authDomain: "shadedverdurefleetingexistence.firebaseapp.com",
  projectId: "shadedverdurefleetingexistence",
  storageBucket: "shadedverdurefleetingexistence.firebasestorage.app",
  messagingSenderId: "110222638994",
  appId: "1:110222638994:web:f4f21b816908a0a76b8b4b",
  measurementId: "G-2HGLH5SZMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Authentication
const auth = getAuth();

export default { analytics, auth };