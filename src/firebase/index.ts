
'use client';

import {
  initializeApp,
  getApp,
  getApps,
  type FirebaseOptions,
} from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

import { firebaseConfig } from './config';
import { FirebaseClientProvider, useFirebase } from './client-provider';
import { useUser } from './auth/use-user';
import { type UserProfile } from './types';

// ---
// Initialization
// ---

function initializeFirebase(options: FirebaseOptions) {
  return !getApps().length ? initializeApp(options) : getApp();
}

const app = initializeFirebase(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
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
  app,
  auth,
  db,

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

  // Providers
  FirebaseClientProvider,
  useFirebase,
};
