import { Injectable, signal } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<AppUser | null>(null);
  isAdmin = signal(false);

  constructor(
    private auth: Auth,
    private firestore: Firestore
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
  }

  isLoggedIn(): Observable<boolean> {
    return user(this.auth).pipe(map((u) => !!u));
  }
}
