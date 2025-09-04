
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, doc, setDoc } from "firebase/firestore";
import { getAuth, Auth, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from "firebase/auth";

// Your web app's Firebase configuration is securely hardcoded here.
const firebaseConfig = {
  apiKey: "AIzaSyD2ryw4xAnhnoydxMm-x7VkPgTdaqSpnqI",
  authDomain: "chatterbox-ervha.firebaseapp.com",
  projectId: "chatterbox-ervha",
  storageBucket: "chatterbox-ervha.appspot.com",
  messagingSenderId: "1012439073857",
  appId: "1:1012439073857:web:009b2b41ce29a7f772f2c0"
};

// This "singleton" pattern ensures that we initialize Firebase only once.
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

function initializeFirebase() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  }
}

// Initialize Firebase on first load.
initializeFirebase();

// Export functions to get the initialized services.
export const getFirebaseAuth = (): Auth => {
  return auth;
};

export const getFirebaseDb = (): Firestore => {
  return db;
};


export const signInWithGoogle = async (): Promise<FirebaseUser | null> => {
  const authInstance = getFirebaseAuth(); // Use the initialized auth instance
  const dbInstance = getFirebaseDb();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(authInstance, provider);
    const user = result.user;
    
    // Create or update user in Firestore
    if (user) {
      await setDoc(doc(dbInstance, "users", user.uid), {
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
