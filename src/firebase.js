import firebase from "./firebase";





const firebaseConfig = {

    apiKey: "AIzaSyDGLU8oArGZokCTgrOk8NctBvub9hqxzFQ",

    authDomain: "disneyplus-cloneoff.firebaseapp.com",

    projectId: "disneyplus-cloneoff",

    storageBucket: "disneyplus-cloneoff.appspot.com",

    messagingSenderId: "913028895886",

    appId: "1:913028895886:web:dcb8db88b53733e1ede5df",

    measurementId: "G-QQ107DW1G1"

};



const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
