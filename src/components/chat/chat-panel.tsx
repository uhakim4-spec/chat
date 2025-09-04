'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Paperclip, SendHorizonal, Smile } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';
import type { User, Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageList } from './message-list';
import { SmartReplies } from './smart-replies';

interface ChatPanelProps {
  currentUser: User;
  selectedUser: User | null;
}

export function ChatPanel({ currentUser, selectedUser }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && selectedUser) {
      const db = getFirebaseDb();
      await addDoc(collection(db, "messages"), {
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        content: input.trim(),
        timestamp: serverTimestamp(),
      });
      setInput('');
    }
  };
  
  useEffect(() => {
    if (!selectedUser) return;
    const db = getFirebaseDb();
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc')
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        allMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      
      const conversationMessages = allMessages.filter(
        (msg) =>
          (msg.senderId === currentUser.id && msg.receiverId === selectedUser.id) ||
          (msg.senderId === selectedUser.id && msg.receiverId === currentUser.id)
      );
      setMessages(conversationMessages);
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser.id]);


  const lastMessage = useMemo(() => {
    return messages[messages.length - 1];
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Select a contact to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center gap-4 border-b p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} data-ai-hint="avatar" />
          <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-lg font-medium leading-none">{selectedUser.name}</p>
          <p className="text-sm text-muted-foreground">{selectedUser.status}</p>
        </div>
      </header>

      <MessageList messages={messages} currentUser={currentUser} />
      
      <div className="border-t p-4 space-y-4">
        {lastMessage?.senderId === selectedUser.id && (
            <SmartReplies lastMessage={lastMessage.content} onSuggestionClick={handleSuggestionClick} />
        )}

        <form onSubmit={handleSendMessage} className="relative">
          <Textarea
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e as any);
                }
            }}
            className="pr-28 resize-none"
          />
          <div className="absolute right-3 top-3 flex items-center gap-1">
            <Button type="button" size="icon" variant="ghost">
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button type="button" size="icon" variant="ghost">
              <Smile className="h-5 w-5" />
              <span className="sr-only">Add emoji</span>
            </Button>
            <Button type="submit" size="icon" variant="default">
              <SendHorizonal className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
