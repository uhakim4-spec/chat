import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Create or update user in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
      status: 'online'
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return null;
  }
};

export { db, auth };
