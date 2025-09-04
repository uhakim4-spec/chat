import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// A function to initialize Firebase only if the API key is provided.
// This prevents the app from crashing if the .env.local file is not set up.
const initializeFirebaseApp = () => {
  if (!firebaseConfig.apiKey) {
    console.error("Firebase API key is missing. Please check your .env.local file.");
    // Return a dummy object or null to avoid crashing the app
    // The app will not have Firebase functionality, but it won't crash.
    return null; 
  }

  return !getApps().length ? initializeApp(firebaseConfig) : getApp();
};

const app = initializeFirebaseApp();

// Conditionally export db and auth to prevent errors when app is null
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;


const provider = auth ? new (require("firebase/auth").GoogleAuthProvider)() : null;

export const signInWithGoogle = async () => {
  if (!auth || !provider) {
    console.error("Firebase is not initialized. Cannot sign in.");
    return null;
  }
  try {
    const result = await require("firebase/auth").signInWithPopup(auth, provider);
    const user = result.user;
    
    // Create or update user in Firestore
    if (db) {
        await require("firebase/firestore").setDoc(require("firebase/firestore").doc(db, "users", user.uid), {
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
          status: 'online'
        }, { merge: true });
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return null;
  }
};

// Export db and auth, making sure they are not null before use in other files.
// Components using these should also handle the possibility of them being null.
export { db, auth };
