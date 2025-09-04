
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, doc, setDoc } from "firebase/firestore";
import { getAuth, type Auth, signInWithPopup, GoogleAuthProvider, type User as FirebaseUser } from "firebase/auth";

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

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

// Export the initialized services.
export const getFirebaseAuth = (): Auth => auth;
export const getFirebaseDb = (): Firestore => db;

export const signInWithGoogle = async (): Promise<FirebaseUser | null> => {
  const provider = new GoogleAuthProvider();
  const authInstance = getFirebaseAuth();
  const dbInstance = getFirebaseDb();

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
