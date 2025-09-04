import { collection, getDocs, query, where, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { User, Message } from './types';

export const currentUser: User = {
  id: 'user-0',
  name: 'Alex Starr',
  avatar: 'https://i.picsum.photos/id/1/100/100.jpg',
  status: 'online',
};

export async function getUsers(): Promise<User[]> {
  const usersCol = collection(db, 'users');
  // Exclude current user from the list
  const q = query(usersCol, where('id', '!=', currentUser.id));
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
