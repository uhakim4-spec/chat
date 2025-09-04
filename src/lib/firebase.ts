
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

// This function ensures that we initialize Firebase only once.
const getFirebaseApp = (): FirebaseApp => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
};

export const getFirebaseAuth = (): Auth => {
  return getAuth(getFirebaseApp());
};

export const getFirebaseDb = (): Firestore => {
  return getFirestore(getFirebaseApp());
};

export const signInWithGoogle = async (): Promise<User | null> => {
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const provider = new GoogleAuthProvider();

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
