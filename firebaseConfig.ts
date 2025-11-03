import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// FIX: Import getAuth to enable Firebase Authentication.
import { getAuth } from 'firebase/auth';

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
export const storage = getStorage(app);
// FIX: Export the auth service.
export const auth = getAuth(app);