// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPQXjXKxPMQuz83hUmoRpGsq8QlEG9YWI',
  authDomain: 'insta-kg.firebaseapp.com',
  projectId: 'insta-kg',
  storageBucket: 'insta-kg.appspot.com',
  messagingSenderId: '931310442815',
  appId: '1:931310442815:web:bbccad302a061191ce9b8a',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
export { app, db, storage }
