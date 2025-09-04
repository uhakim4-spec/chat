import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from "firebase/auth";

const firebaseConfig = {
  "projectId": "chatterbox-ervha",
  "appId": "1:1012439073857:web:009b2b41ce29a7f772f2c0",
  "storageBucket": "chatterbox-ervha.firebasestorage.app",
  "apiKey": "AIzaSyD2ryw4xAnhnoydxMm-x7VkPgTdaqSpnqI",
  "authDomain": "chatterbox-ervha.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1012439073857"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

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
