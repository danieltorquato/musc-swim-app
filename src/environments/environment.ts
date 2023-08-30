// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export const environment = {
  production: false,
};
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAoxZLYJ86euRLtfZWQ2t-GF6M7-LQQDEQ",
  authDomain: "vitor-f-app.firebaseapp.com",
  databaseURL: "https://vitor-f-app-default-rtdb.firebaseio.com",
  projectId: "vitor-f-app",
  storageBucket: "vitor-f-app.appspot.com",
  messagingSenderId: "958962932104",
  appId: "1:958962932104:web:caeb6bd68cccda7e14c23d",
  measurementId: "G-PKHMWVSSRL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
