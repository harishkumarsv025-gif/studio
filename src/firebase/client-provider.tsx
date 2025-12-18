
'use client';

import { ReactNode, useMemo } from 'react';
import { initializeFirebase, FirebaseProvider } from '@/firebase';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export const FirebaseClientProvider = ({ children }: { children: ReactNode }) => {
  const { app, auth, db } = useMemo(() => {
    const instances = initializeFirebase();
    return { app: instances.app, auth: instances.auth, db: instances.db };
  }, []);

  return (
    <FirebaseProvider app={app} auth={auth} db={db}>
      {children}
    </FirebaseProvider>
  );
};
