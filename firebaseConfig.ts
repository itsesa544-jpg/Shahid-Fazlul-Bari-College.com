import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.API_KEY, // Changed to use AISTudio's provided environment variable
  authDomain: "myawesom-d8265.firebaseapp.com",
  projectId: "myawesom-d8265",
  storageBucket: "myawesom-d8265.appspot.com",
  messagingSenderId: "1012709227021",
  appId: "1:1012709227021:web:da1a20e40b9205c99eb344",
  measurementId: "G-ZB7W867N7Q"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);