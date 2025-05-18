


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2Qvmbb2PmmSftLrg3-D0xZfmgDFh3cPE",
  authDomain: "ai-travel-planner-a6376.firebaseapp.com",
  projectId: "ai-travel-planner-a6376",
  storageBucket: "ai-travel-planner-a6376.firebasestorage.app",
  messagingSenderId: "642144601657",
  appId: "1:642144601657:web:4a65f382f44ecff34e2fe8",
  measurementId: "G-P01YY8BMQ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

