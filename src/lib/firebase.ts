// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "chatterbox-ervha",
  "appId": "1:1012439073857:web:009b2b41ce29a7f772f2c0",
  "storageBucket": "chatterbox-ervha.firebasestorage.app",
  "apiKey": "AIzaSyD2ryw4xAnhnoydxMm-x7VkPgTdaqSpnqI",
  "authDomain": "chatterbox-ervha.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1012439073857"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
