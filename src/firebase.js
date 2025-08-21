// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDQmGVeDjC9J-3XJuGhv2hLLNC6PJFFnW0",
  authDomain: "event-platform-93e9c.firebaseapp.com",
  projectId: "event-platform-93e9c",
  storageBucket: "event-platform-93e9c.firebasestorage.app",
  messagingSenderId: "69892409166",
  appId: "1:69892409166:web:49ecebe4f9fd271110801f",
  databaseURL: "https://event-platform-93e9c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);
