import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { User } from './types';

export async function getUsers(currentUserId: string): Promise<User[]> {
  const usersCol = collection(db, 'users');
  // Exclude current user from the list
  const q = query(usersCol, where('id', '!=', currentUserId));
  const userSnapshot = await getDocs(q);
  const userList = userSnapshot.docs.map(doc => doc.data() as User);
  return userList;
}

export async function getUser(userId: string): Promise<User | null> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data() as User;
    } else {
        return null;
    }
}
