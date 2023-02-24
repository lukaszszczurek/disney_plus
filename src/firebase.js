

import { initializeApp } from "firebase/app";
import {
 GoogleAuthProvider,

 getAuth,
 //  signInWithPopup,
 // signInWithEmailAndPassword,
 //  createUserWithEmailAndPassword,
 //  sendPasswordResetEmail,
 //  signOut,
} from "firebase/auth";
import {
  getFirestore,
 // query,
 //  getDocs,
 //  collection,
 //  where,
 //  addDoc,
} from "firebase/firestore";






const firebaseConfig = {

    apiKey: "AIzaSyDGLU8oArGZokCTgrOk8NctBvub9hqxzFQ",


    authDomain: "disneyplus-cloneoff.firebaseapp.com",

    projectId: "disneyplus-cloneoff",

    storageBucket: "disneyplus-cloneoff.appspot.com",

    messagingSenderId: "913028895886",

    appId: "1:913028895886:web:dcb8db88b53733e1ede5df",

    measurementId:"G-QQ107DW1G1"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth);
const db = getFirestore(app);
const provider= new GoogleAuthProvider();

// const firebaseApp = firebase.initializeApp(firebaseConfig);
//
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();

export { auth, provider };
export default db;

// export {auth,provider,storage};
// export default db;