import { cn } from '@/lib/utils';
import type { Message as MessageType } from '@/lib/types';
import { format } from 'date-fns';

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}

export function Message({ message, isCurrentUser }: MessageProps) {
  return (
    <div className={cn('flex items-end gap-2', isCurrentUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2',
          isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className={cn("text-xs mt-1", isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {format(new Date(message.timestamp), 'p')}
        </p>
      </div>
    </div>
  );
}
