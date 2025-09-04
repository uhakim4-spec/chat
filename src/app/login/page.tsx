'use client';

import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      router.push('/');
    }
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <MessageSquareText className="text-primary h-8 w-8" />
                <h1 className="text-3xl font-bold font-headline">ChatterBox</h1>
            </div>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Sign in to continue to your messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn} className="w-full" variant="outline">
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
