import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(firebaseApp);
setPersistence(auth, browserLocalPersistence).catch(() => {});
export const analyticsPromise = isSupported().then((supported) => supported ? getAnalytics(firebaseApp) : null);

// The admin account is created/enabled in Firebase Console. If credentials are
// not active yet, give the operator a useful next step instead of a blank wait.
if (typeof window !== "undefined") {
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.('[data-testid="admin-login-button"]');
    if (!button) return;
    window.setTimeout(() => {
      if (!document.querySelector('[data-testid="admin-signout-button"]') && document.querySelector('[data-testid="admin-login-button"]')) {
        let message = document.querySelector('[data-testid="admin-auth-error"]');
        if (!message) {
          message = document.createElement("div");
          message.dataset.testid = "admin-auth-error";
          message.style.cssText = "margin-top:16px;padding:12px;border:1px solid #d4a853;color:#f0d48b;font-size:12px;line-height:1.5";
          message.textContent = "Sign-in was not completed. Check that this email is enabled in Firebase Authentication, or switch to Create admin access once.";
          button.parentElement?.appendChild(message);
        }
      }
    }, 3500);
  });
}