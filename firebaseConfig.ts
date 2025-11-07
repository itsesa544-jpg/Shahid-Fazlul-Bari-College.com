import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2ntCggFFRFQrf87MlAk6TKQguapre12U",
  authDomain: "myawesom-d8265.firebaseapp.com",
  databaseURL: "https://myawesom-d8265-default-rtdb.firebaseio.com",
  projectId: "myawesom-d8265",
  storageBucket: "myawesom-d8265.firebasestorage.app",
  messagingSenderId: "1012709227021",
  appId: "1:1012709227021:web:ef557b6ee57926c69eb344",
  measurementId: "G-9J8GFG42F0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
