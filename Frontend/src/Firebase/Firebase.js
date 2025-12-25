import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'




import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCCMmHzNylDCKPASWuxCb7b3w2-pexElBE",
  authDomain: "findit-8cd07.firebaseapp.com",
  projectId: "findit-8cd07",
  storageBucket: "findit-8cd07.firebasestorage.app",
  messagingSenderId: "1090990808176",
  appId: "1:1090990808176:web:4a006c6398380c8a2ae8b5",
  measurementId: "G-K022PG4X3P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);