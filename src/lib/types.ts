import type { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Timestamp;
}
