import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, getDocs, query, where, orderBy } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Dog } from '../models';

@Injectable({ providedIn: 'root' })
export class DogService {
  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getDogsByOwner(ownerId: string): Observable<Dog[]> {
    const q = query(
      collection(this.firestore, 'dogs'),
      where('ownerId', '==', ownerId),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Dog[]>;
  }

  getAllDogs(): Observable<Dog[]> {
    const q = query(collection(this.firestore, 'dogs'), orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Dog[]>;
  }

  async addDog(dog: Dog): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, 'dogs'), {
      ...dog,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  }

  async updateDog(id: string, data: Partial<Dog>): Promise<void> {
    const docRef = doc(this.firestore, 'dogs', id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });
  }

  async markWalkThroughCompleted(id: string): Promise<void> {
    await this.updateDog(id, { walkThroughCompleted: true });
  }

  async uploadPhoto(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
