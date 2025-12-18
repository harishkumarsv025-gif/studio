'use client';

import { useUser } from '@/firebase/auth/use-user';
import { AuthDialog } from './auth-dialog';
import { UserButton } from './user-button';
import { Button } from '../ui/button';

export function AuthButton() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <Button variant="ghost" disabled>Loading...</Button>;
  }

  if (error) {
    console.error("Auth error:", error);
    return <Button variant="destructive">Error</Button>;
  }

  return user ? <UserButton /> : <AuthDialog />;
}
