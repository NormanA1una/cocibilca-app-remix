// Import the functions you need from the SDKs you need
import { useLoaderData } from "@remix-run/react";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDDbBrq-0QyZzqx28XV305Fe52H96yMGWA",
  authDomain: "cocibolca-next-app-de8c9.firebaseapp.com",
  projectId: "cocibolca-next-app-de8c9",
  storageBucket: "cocibolca-next-app-de8c9.appspot.com",
  messagingSenderId: "553831866266",
  appId: "1:553831866266:web:5cb2d2ae5cb92f4a4aa423",
  measurementId: "G-QKWG69SHVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();
