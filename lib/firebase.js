// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MS_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASURE_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyBDUecM6hSXNPRmtfwR8VCYoTEVYBKA4uc",
    authDomain: "sagarprojectclg.firebaseapp.com",
    projectId: "sagarprojectclg",
    storageBucket: "sagarprojectclg.appspot.com",
    messagingSenderId: "673283625959",
    appId: "1:673283625959:web:07ab8aa819385e37d56342",
    measurementId: "G-0E3PJD8ZBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db,auth,app }
// export const db = firebase.firestore();
// const analytics = getAnalytics(app);