import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleIcon } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-headline">ChatterBox</CardTitle>
          <CardDescription>
            Sign in to start your conversations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign in with Google
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
