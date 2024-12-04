import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB3jyJxptgYWoC1u3wqXxpCE5-KKcc63Go",
  authDomain: "ecommerce-app-efc84.firebaseapp.com",
  projectId: "ecommerce-app-efc84",
  storageBucket: "ecommerce-app-efc84.firebasestorage.app",
  messagingSenderId: "486346902283",
  appId: "1:486346902283:web:0d595b63b914fddff8f00e",
  measurementId: "G-SXHW8JQ94Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);