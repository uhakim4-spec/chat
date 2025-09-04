'use client';

import { ChatLayout } from '@/components/chat/chat-layout';
import type { User } from '@/lib/types';

// Create a default guest user since authentication is removed
const guestUser: User = {
  id: 'guest',
  name: 'Guest User',
  avatar: 'https://i.pravatar.cc/150?u=guest',
  status: 'online',
};

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <ChatLayout currentUser={guestUser} />
    </main>
  );
}
