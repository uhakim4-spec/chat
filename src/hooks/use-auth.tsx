'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only set up the listener if auth is initialized
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser && db) {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUser({ id: userSnap.id, ...userSnap.data() } as User);
          } else {
            // You might want to create the user document here if it doesn't exist
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'Anonymous',
              avatar: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
              status: 'online'
            }
            setUser(newUser);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // If auth is not initialized, stop loading and set user to null
      setLoading(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
