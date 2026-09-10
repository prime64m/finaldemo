import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// Firebase configuration provided
const firebaseConfig = {
  apiKey: "AIzaSyB_9TzCCip72ItgjjbOiEd316yWZAS-caA",
  authDomain: "crevil-55dbf.firebaseapp.com",
  projectId: "crevil-55dbf",
  storageBucket: "crevil-55dbf.firebasestorage.app",
  messagingSenderId: "464774744316",
  appId: "1:464774744316:web:f4156169388e2ab79def79",
  measurementId: "G-J5BF6W6NQ8"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics conditionally for SSR/Browser
export let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.log("Firebase Analytics initialized");
  }
}

// Firebase Auth helper functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      uid: user.uid,
      name: user.displayName || "Google User",
      email: user.email,
      picture: user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      verified: true
    };
  } catch (error) {
    console.error("Firebase Google Auth Popup Error:", error);
    // Try redirect if popup is blocked
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err2) {
      console.error("Firebase Redirect Error:", err2);
    }
    throw error;
  }
};

export const signInWithEmail = async (email, password, name) => {
  try {
    let result;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      result = await createUserWithEmailAndPassword(auth, email, password);
    }
    const user = result.user;
    return {
      uid: user.uid,
      name: name || user.displayName || email.split('@')[0],
      email: user.email,
      picture: user.photoURL,
      verified: true
    };
  } catch (error) {
    console.error("Firebase Email Auth Error:", error);
    throw error;
  }
};

export const logoutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Firebase SignOut Error:", error);
  }
};

export { onAuthStateChanged };
export default app;
