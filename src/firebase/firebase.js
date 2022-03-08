import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNh71kL3Y2Bn4px8zjXWKsPavNKMC3Pg8",
    authDomain: "devs-united-app.firebaseapp.com",
    projectId: "devs-united-app",
    storageBucket: "devs-united-app.appspot.com",
    messagingSenderId: "988849074431",
    appId: "1:988849074431:web:6b8cac4d0929dabf6e9cca",
    measurementId: "G-RQMSG7GCXE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {
    db,
    provider
}