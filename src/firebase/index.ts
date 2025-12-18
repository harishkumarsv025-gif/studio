
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

import { firebaseConfig } from './config';
import { type UserProfile } from './types';

// ---
// Initialization
// ---

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// ---
// Auth
// ---

const googleProvider = new GoogleAuthProvider();

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

export { app, auth, db };
export { signInWithGoogle, signOut, getUserProfile, createUserProfile };
export { FirebaseProvider, useAuth, useFirestore, useFirebaseApp } from './provider';
export { useUser } from './auth/use-user';
export type { UserProfile };
export type { User } from 'firebase/auth';
