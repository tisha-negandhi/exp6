// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC002jHdd4orZHulipMRyF6auX3xo5uYM0",
  authDomain: "rtk-blog-2dee1.firebaseapp.com",
  projectId: "rtk-blog-2dee1",
  storageBucket: "rtk-blog-2dee1.appspot.com",
  messagingSenderId: "1025208254138",
  appId: "1:1025208254138:web:33b4f55a6056a3c5d80c83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);
