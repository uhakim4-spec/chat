import type { User, Message } from './types';

export const currentUser: User = {
  id: 'user-0',
  name: 'Alex Starr',
  avatar: 'https://i.picsum.photos/id/1/100/100.jpg',
  status: 'online',
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Jordan Lee',
    avatar: 'https://i.picsum.photos/id/1011/100/100.jpg',
    status: 'online',
  },
  {
    id: 'user-2',
    name: 'Casey Morgan',
    avatar: 'https://i.picsum.photos/id/1025/100/100.jpg',
    status: 'offline',
  },
  {
    id: 'user-3',
    name: 'Taylor Kim',
    avatar: 'https://i.picsum.photos/id/1027/100/100.jpg',
    status: 'online',
  },
  {
    id: 'user-4',
    name: 'Riley Park',
    avatar: 'https://i.picsum.photos/id/20/100/100.jpg',
    status: 'online',
  },
];

export const messages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-1',
    receiverId: 'user-0',
    content: "Hey, how's it going?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 'msg-2',
    senderId: 'user-0',
    receiverId: 'user-1',
    content: "Pretty good! Just working on that new project. How about you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    id: 'msg-3',
    senderId: 'user-1',
    receiverId: 'user-0',
    content: "Same here. It's coming along. Did you see the latest designs?",
    timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
  },
  {
    id: 'msg-4',
    senderId: 'user-0',
    receiverId: 'user-1',
    content: "Yeah, they look great! I'm excited to start implementing them.",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: 'msg-5',
    senderId: 'user-1',
    receiverId: 'user-0',
    content: "Me too! Let me know if you need any help.",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 'msg-6',
    senderId: 'user-2',
    receiverId: 'user-0',
    content: "Hi! Quick question about the meeting tomorrow.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
   {
    id: 'msg-7',
    senderId: 'user-0',
    receiverId: 'user-2',
    content: "Sure, what's up?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
  },
  {
    id: 'msg-8',
    senderId: 'user-3',
    receiverId: 'user-0',
    content: "Can you send me the report from last week?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'msg-9',
    senderId: 'user-4',
    receiverId: 'user-0',
    content: "Let's catch up later this week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];
