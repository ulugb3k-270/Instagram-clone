import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBj6UU8347TAPpIKOaLcNPpLXDverid5Lc",
  authDomain: "insta-clone-v2-6784d.firebaseapp.com",
  projectId: "insta-clone-v2-6784d",
  storageBucket: "insta-clone-v2-6784d.appspot.com",
  messagingSenderId: "579032350551",
  appId: "1:579032350551:web:7777a565629c121e728812",
  measurementId: "G-K0W5W7VZ4E",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage()


export { app, storage, db } 
