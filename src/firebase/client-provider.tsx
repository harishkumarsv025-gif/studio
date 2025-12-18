
'use client';

import { ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { app, auth, db } from '@/firebase';

export const FirebaseClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FirebaseProvider app={app} auth={auth} db={db}>
      {children}
    </FirebaseProvider>
  );
};
