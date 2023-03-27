import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGLU8oArGZokCTgrOk8NctBvub9hqxzFQ",

  authDomain: "disneyplus-cloneoff.firebaseapp.com",

  projectId: "disneyplus-cloneoff",

  storageBucket: "disneyplus-cloneoff.appspot.com",

  messagingSenderId: "913028895886",

  appId: "1:913028895886:web:dcb8db88b53733e1ede5df",

  measurementId: "G-QQ107DW1G1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
