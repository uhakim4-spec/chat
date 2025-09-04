
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// This is securely hardcoded to prevent any loading issues.
const firebaseConfig = {
  apiKey: "AIzaSyD2ryw4xAnhnoydxMm-x7VkPgTdaqSpnqI",
  authDomain: "chatterbox-ervha.firebaseapp.com",
  projectId: "chatterbox-ervha",
  storageBucket: "chatterbox-ervha.appspot.com",
  messagingSenderId: "1012439073857",
  appId: "1:1012439073857:web:009b2b41ce29a7f772f2c0"
};

// Singleton pattern to initialize Firebase
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

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
