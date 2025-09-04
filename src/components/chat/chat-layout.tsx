'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '@/lib/data';
import type { User } from '@/lib/types';
import { Sidebar } from './sidebar';
import { ChatPanel } from './chat-panel';

interface ChatLayoutProps {
  currentUser: User;
}

export function ChatLayout({ currentUser }: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUser) {
        const userList = await getUsers(currentUser.id);
        setUsers(userList);
        if (userList.length > 0) {
          setSelectedUser(userList[0]);
        }
      }
    };
    fetchUsers();
  }, [currentUser]);
  
  if (!currentUser) {
    return null;
  }

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
