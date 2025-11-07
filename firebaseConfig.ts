import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq5fahLFliBzBJERLXVxmStwe1YUmE3d8",
  authDomain: "shohidfozllulbari.firebaseapp.com",
  databaseURL: "https://shohidfozllulbari-default-rtdb.firebaseio.com",
  projectId: "shohidfozllulbari",
  storageBucket: "shohidfozllulbari.firebasestorage.app",
  messagingSenderId: "484574726071",
  appId: "1:484574726071:web:3b2bc160e95527dadb0a32"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);