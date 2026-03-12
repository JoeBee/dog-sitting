import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from '../models';

/** Maps Firebase Auth errors to user-friendly messages */
export function getAuthErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code;
  const msg = (error as { message?: string })?.message ?? '';
  if (code === 'auth/configuration-not-found' || msg.includes('CONFIGURATION_NOT_FOUND')) {
    return 'Authentication is not set up. Please enable Firebase Authentication and Email/Password sign-in in the Firebase Console (Authentication → Sign-in method).';
  }
  if (code === 'auth/email-already-in-use') return 'This email is already registered. Try logging in instead.';
  if (code === 'auth/weak-password') return 'Password is too weak. Use at least 6 characters.';
  if (code === 'auth/invalid-email') return 'Invalid email address.';
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password') return 'Invalid email or password.';
  if (code === 'auth/invalid-credential') return 'Invalid email or password.';
  if (code === 'auth/too-many-requests') return 'Too many attempts. Please try again later.';
  return (error as Error)?.message || 'An error occurred. Please try again.';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<AppUser | null>(null);
  isAdmin = signal(false);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    user(this.auth).subscribe(async (fbUser) => {
      if (fbUser) {
        const appUser = await this.getUserProfile(fbUser.uid);
        this.currentUser.set(appUser);
        this.isAdmin.set(appUser?.role === 'admin');
      } else {
        this.currentUser.set(null);
        this.isAdmin.set(false);
      }
    });
  }

  private async getUserProfile(uid: string): Promise<AppUser | null> {
    const docRef = doc(this.firestore, 'users', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { uid, ...snap.data() } as AppUser;
    }
    return null;
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string, displayName?: string): Promise<void> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    await setDoc(doc(this.firestore, 'users', cred.user.uid), {
      email,
      displayName: displayName ?? '',
      role: 'client',
      createdAt: new Date()
    });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }

  /** Re-fetch current user profile from Firestore (call after updating profile). */
  async refreshProfile(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (uid) {
      const appUser = await this.getUserProfile(uid);
      this.currentUser.set(appUser);
      this.isAdmin.set(appUser?.role === 'admin');
    }
  }

  isLoggedIn(): Observable<boolean> {
    return user(this.auth).pipe(map((u) => !!u));
  }
}
