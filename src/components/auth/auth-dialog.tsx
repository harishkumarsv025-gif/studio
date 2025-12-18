'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { signInWithGoogle, getUserProfile } from '@/firebase';
import { CompleteProfileDialog } from './complete-profile-dialog';
import { User } from 'firebase/auth';

function GoogleSignInButton({ onSignInSuccess }: { onSignInSuccess: (user: User) => void }) {
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            const userCredential = await signInWithGoogle();
            if (userCredential?.user) {
                onSignInSuccess(userCredential.user);
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setError('Failed to sign in with Google. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.5 69.5c-24.3-23.6-58.3-38.6-99.4-38.6-82.3 0-148.9 66.6-148.9 148.9s66.6 148.9 148.9 148.9c93.5 0 131.3-61.9 135.8-94.4H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                Sign in with Google
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}


export function AuthDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [authedUser, setAuthedUser] = useState<User | null>(null);

  const handleSignInSuccess = async (user: User) => {
    setAuthedUser(user);
    const profile = await getUserProfile(user.uid);
    if (!profile) {
      // New user, need to complete profile
      setShowCompleteProfile(true);
    } else {
      // Existing user, close main dialog
      setOpen(false);
    }
  };

  const handleProfileCompleted = () => {
    setShowCompleteProfile(false);
    setOpen(false);
  };
  
  const trigger = children ? children : <Button>Login</Button>;

  if (showCompleteProfile && authedUser) {
    return (
      <CompleteProfileDialog
        user={authedUser}
        open={showCompleteProfile}
        onOpenChange={setShowCompleteProfile}
        onProfileCompleted={handleProfileCompleted}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to PSYCEMONEY</DialogTitle>
          <DialogDescription>
            Sign in to access your personalized financial dashboard.
          </DialogDescription>
        </DialogHeader>
        <GoogleSignInButton onSignInSuccess={handleSignInSuccess} />
      </DialogContent>
    </Dialog>
  );
}
