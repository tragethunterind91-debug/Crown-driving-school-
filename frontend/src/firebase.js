import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDC_UysBJr1n39w9_Vb6D_0NhZ2CDE40Gw",
  authDomain: "crown-pass-driving.firebaseapp.com",
  projectId: "crown-pass-driving",
  storageBucket: "crown-pass-driving.firebasestorage.app",
  messagingSenderId: "186536451804",
  appId: "1:186536451804:web:6e3f6910c3ff66876ede19",
  measurementId: "G-0VDRW4E5C0",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence).catch(() => {});
export const analyticsPromise = isSupported().then((supported) => (supported ? getAnalytics(firebaseApp) : null));
