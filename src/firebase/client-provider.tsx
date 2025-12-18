
'use client';

import { ReactNode } from 'react';
import { initializeFirebase, FirebaseProvider } from '@/firebase';
import { type FirebaseApp } from 'firebase/app';
import { type Auth } from 'firebase/auth';
import { type Firestore } from 'firebase/firestore';

// Initialize Firebase once on the client
const { app, auth, db } = initializeFirebase();

export const FirebaseClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FirebaseProvider app={app} auth={auth} db={db}>
      {children}
    </FirebaseProvider>
  );
};
