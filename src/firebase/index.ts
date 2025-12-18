
'use client';

import {
  initializeApp,
  getApp,
  getApps,
  type FirebaseOptions,
  type FirebaseApp,
} from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  type Firestore,
} from 'firebase/firestore';

import { firebaseConfig } from './config';
import {
  FirebaseProvider,
  useFirebaseApp,
  useAuth,
  useFirestore,
} from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useUser } from './auth/use-user';
import { type UserProfile } from './types';

// ---
// Initialization
// ---

function initializeFirebase(options?: FirebaseOptions): {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
} {
  const app = !getApps().length
    ? initializeApp(options || firebaseConfig)
    : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { app, auth, db };
}

const { auth, db } = initializeFirebase();
const googleProvider = new GoogleAuthProvider();

// ---
// Auth
// ---

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const signOut = () => auth.signOut();

// ---
// Firestore
// ---

async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
}

async function createUserProfile(userId: string, data: UserProfile) {
  return await setDoc(doc(db, 'users', userId), data);
}

// ---
// Exports
// ---

export {
  // Firebase App
  auth,
  db,
  initializeFirebase,

  // Auth
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
  useUser,
  type User,
  
  // Firestore
  getUserProfile,
  createUserProfile,
  type UserProfile,

  // Providers & Hooks
  FirebaseProvider,
  FirebaseClientProvider,
  useFirebaseApp,
  useAuth,
  useFirestore,
};
