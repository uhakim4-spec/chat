'use client';

import { useRef, useEffect } from 'react';
import type { Message as MessageType, User } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from './message';

interface MessageListProps {
  messages: MessageType[];
  currentUser: User;
}

export function MessageList({ messages, currentUser }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4" viewportRef={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} isCurrentUser={message.senderId === currentUser.id} />
        ))}
      </div>
    </ScrollArea>
  );
}
