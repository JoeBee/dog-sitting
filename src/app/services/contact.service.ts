import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private firestore: Firestore) {}

  async submit(form: ContactSubmission): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, 'contacts'), {
      ...form,
      createdAt: new Date()
    });
    return docRef.id;
  }
}
