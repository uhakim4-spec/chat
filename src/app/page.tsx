'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { ChatLayout } from '@/components/chat/chat-layout';
import { Spinner } from '@/components/spinner';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <Spinner size="large" />
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <ChatLayout currentUser={user} />
    </main>
  );
}
