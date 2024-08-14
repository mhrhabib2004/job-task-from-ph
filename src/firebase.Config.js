// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIMnto9ykp6S6cZd53DgsVmj-SwFOUX8U",
  authDomain: "job-task-from-ph.firebaseapp.com",
  projectId: "job-task-from-ph",
  storageBucket: "job-task-from-ph.appspot.com",
  messagingSenderId: "619174905062",
  appId: "1:619174905062:web:4f68ef5563b38035a5a727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;