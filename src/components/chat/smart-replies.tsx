'use client';

import { useState, useEffect, use } from 'react';
import { getSmartReplySuggestions } from '@/ai/flows/smart-reply-suggestions';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

interface SmartRepliesProps {
  lastMessage: string;
  onSuggestionClick: (suggestion: string) => void;
}

export function SmartReplies({ lastMessage, onSuggestionClick }: SmartRepliesProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      setLoading(true);
      try {
        const result = await getSmartReplySuggestions({ message: lastMessage });
        setSuggestions(result.suggestions || []);
      } catch (error) {
        console.error('Error fetching smart replies:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
    
    if (lastMessage) {
        fetchSuggestions();
    }
  }, [lastMessage]);

  if (loading) {
    return (
        <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
            </div>
        </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
