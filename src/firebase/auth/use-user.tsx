
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, getUserProfile } from '@/firebase';
import { type UserProfile } from '@/firebase/types';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          setLoading(true);
          if (user) {
            setUser(user);
            const userProfile = await getUserProfile(user.uid);
            setProfile(userProfile);
          } else {
            setUser(null);
            setProfile(null);
          }
        } catch (e) {
          setError(e instanceof Error ? e : new Error(String(e)));
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, profile, loading, error };
}
