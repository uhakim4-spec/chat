import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Create or update user in Firestore
    if (db) {
        await setDoc(doc(db, "users", user.uid), {
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

export { db, auth };
