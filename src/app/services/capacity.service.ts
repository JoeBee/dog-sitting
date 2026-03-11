import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ServiceCapacity } from '../models';

const DEFAULT_CAPACITY: ServiceCapacity = {
  boarding: 5,
  sitting: 5,
  walk: 5
};

@Injectable({ providedIn: 'root' })
export class CapacityService {
  constructor(private firestore: Firestore) {}

  async getCapacity(): Promise<ServiceCapacity> {
    const docRef = doc(this.firestore, 'settings', 'capacity');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_CAPACITY, ...snap.data() };
    }
    return { ...DEFAULT_CAPACITY };
  }

  async setCapacity(cap: Partial<ServiceCapacity>): Promise<void> {
    const docRef = doc(this.firestore, 'settings', 'capacity');
    const current = await this.getCapacity();
    await setDoc(docRef, { ...current, ...cap });
  }
}
