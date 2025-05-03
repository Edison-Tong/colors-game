// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXqPSzkpLgPohi1uupqD4gs0bkekyvh5k",
  authDomain: "colors-392a6.firebaseapp.com",
  projectId: "colors-392a6",
  storageBucket: "colors-392a6.firebasestorage.app",
  messagingSenderId: "325482939944",
  appId: "1:325482939944:web:628dcef1912103457e971d",
  measurementId: "G-GKM61VP7NH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
