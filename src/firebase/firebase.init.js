// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Named export for auth
export const auth = getAuth(app);
