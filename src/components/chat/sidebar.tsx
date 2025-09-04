import { Search, MessageSquareText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserProfile } from './user-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  currentUser: User;
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export function Sidebar({ currentUser, users, selectedUser, onSelectUser }: SidebarProps) {
  return (
    <aside className="w-80 flex-shrink-0 border-r bg-secondary/50 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <MessageSquareText className="text-primary" />
                <h1 className="text-xl font-bold font-headline">ChatterBox</h1>
            </div>
            <UserProfile user={currentUser} />
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contacts..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-muted',
                selectedUser?.id === user.id && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="avatar" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {user.status === 'online' && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                )}
              </div>
              <div className="flex-1 truncate">
                <div className="font-medium">{user.name}</div>
                <p className={cn("text-xs truncate", selectedUser?.id === user.id ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {user.status === 'online' ? 'Online' : 'Offline'}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
