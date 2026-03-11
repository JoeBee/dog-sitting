import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private firestore: Firestore) {}

  getAllUsers(): Observable<AppUser[]> {
    return collectionData(collection(this.firestore, 'users'), { idField: 'uid' }) as Observable<AppUser[]>;
  }

  async getUser(uid: string): Promise<AppUser | null> {
    const snap = await getDoc(doc(this.firestore, 'users', uid));
    if (snap.exists()) {
      return { uid, ...snap.data() } as AppUser;
    }
    return null;
  }
}
