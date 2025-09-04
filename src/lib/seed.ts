// DO NOT RUN THIS SCRIPT IN A PRODUCTION ENVIRONMENT
// This script is for seeding the database with initial data for development purposes only.

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const users = [
  {
    id: 'johnsmith',
    name: 'John Smith',
    avatar: 'https://i.pravatar.cc/150?u=johnsmith',
    status: 'offline',
  },
  {
    id: 'janedoe',
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?u=janedoe',
    status: 'online',
  },
];

async function seedDatabase() {
  console.log('Seeding database...');
  const usersCollection = collection(db, 'users');

  for (const user of users) {
    try {
      await setDoc(doc(usersCollection, user.id), user);
      console.log(`Successfully seeded user: ${user.name}`);
    } catch (error) {
      console.error(`Error seeding user ${user.name}:`, error);
    }
  }

  console.log('Database seeding complete.');
  // The script will hang, so we need to exit explicitly.
  process.exit(0);
}

seedDatabase();
