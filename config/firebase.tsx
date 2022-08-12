// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_ASr4zONLo0kqLvphRC7DwA3cCiwPtmk",
  authDomain: "worlder-todolist.firebaseapp.com",
  projectId: "worlder-todolist",
  storageBucket: "worlder-todolist.appspot.com",
  messagingSenderId: "820105585578",
  appId: "1:820105585578:web:9d2dac4e6d39ad27c101d3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
