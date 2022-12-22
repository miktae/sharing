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
  apiKey: "AIzaSyApgf_-hdtm54TL1I7gjh67o-msYrUb7A8",
  authDomain: "rws-reactnative.firebaseapp.com",
  projectId: "rws-reactnative",
  storageBucket: "rws-reactnative.appspot.com",
  messagingSenderId: "618892807498",
  appId: "1:618892807498:web:0f1d33490fab814d9245b3",
  measurementId: "G-V542NP195S",
  databaseURL: "https://rws-reactnative.asia-southeast2.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
