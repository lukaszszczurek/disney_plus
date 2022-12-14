

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

    apiKey: process.env.REACT_APP_API_KEY,


    authDomain: process.env.REACT_APP_AUTH_DOMAIN,

    projectId: process.env.REACT_APP_PROJECT_ID,

    storageBucket: "disneyplus-cloneoff.appspot.com",

    messagingSenderId: "913028895886",

    appId: process.env.REACT_APP_ID,

    measurementId:process.env.REACT_APP_MEASUREMENT_ID

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