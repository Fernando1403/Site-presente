import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCs4qsCWFLEDlmwQte0JqjmR1kT3dWhs8",
  authDomain: "sitepresentes-9a091.firebaseapp.com",
  projectId: "sitepresentes-9a091",
  storageBucket: "sitepresentes-9a091.firebasestorage.app",
  messagingSenderId: "198655682361",
  appId: "1:198655682361:web:e753879b0f5ab159d8aae8",
  measurementId: "G-NECS48SQ9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
