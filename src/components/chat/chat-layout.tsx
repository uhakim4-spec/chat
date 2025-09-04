'use client';

import { useState } from 'react';
import { users, currentUser } from '@/lib/data';
import type { User } from '@/lib/types';
import { Sidebar } from './sidebar';
import { ChatPanel } from './chat-panel';

export function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
  
  return (
    <div className="flex h-[calc(100vh-2rem)] w-full max-w-7xl rounded-lg border shadow-lg bg-card">
      <Sidebar
        currentUser={currentUser}
        users={users}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatPanel 
        currentUser={currentUser} 
        selectedUser={selectedUser} 
      />
    </div>
  );
}
