import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyDExQjdKXvU6AIoMKUcTKJTgGBFrKYWMT0",

  authDomain: "vg-smart-review.firebaseapp.com",

  projectId: "vg-smart-review",

  storageBucket: "vg-smart-review.firebasestorage.app",

  messagingSenderId: "856752811623",

  appId: "1:856752811623:web:fb7a21b69ee16e0abe2ec2"

};


const app = initializeApp(
  firebaseConfig
);


// AUTENTICACIÓN

export const auth =
  getAuth(app);


// FIRESTORE

export const db =
  getFirestore(app);