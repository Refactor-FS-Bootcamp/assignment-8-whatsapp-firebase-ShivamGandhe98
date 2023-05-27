import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCrWW0nLspAuB3uWlKvcMO0nZYdmAsSLes",
    authDomain: "whatsapp-firebase-3ba34.firebaseapp.com",
    projectId: "whatsapp-firebase-3ba34",
    storageBucket: "whatsapp-firebase-3ba34.appspot.com",
    messagingSenderId: "285802516298",
    appId: "1:285802516298:web:350ead6ae1c79a2434fbb3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth,provider }
export default db