// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABU2SEBJ25R6kHCoGTPlHRk5GB3tfVnsw",
  authDomain: "facial-authentication-47103.firebaseapp.com",
  projectId: "facial-authentication-47103",
  storageBucket: "facial-authentication-47103.appspot.com",
  databaseURL: "https://facial-authentication-47103.asia-southeast2.firebasedatabase.app",
  messagingSenderId: "624247327928",
  appId: "1:624247327928:web:693df52c474cf39ae5784d",
  measurementId: "G-J83RZGBRW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };