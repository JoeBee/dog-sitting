import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BookingRequest, BookingStatus } from '../models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private firestore: Firestore) {}

  getPendingRequests(): Observable<BookingRequest[]> {
    const q = query(
      collection(this.firestore, 'bookings'),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<BookingRequest[]>;
  }

  getBookingsByUser(userId: string): Observable<BookingRequest[]> {
    const q = query(
      collection(this.firestore, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<BookingRequest[]>;
  }

  getUpcomingBookings(): Observable<BookingRequest[]> {
    const q = query(
      collection(this.firestore, 'bookings'),
      where('status', '==', 'approved'),
      orderBy('startDate', 'asc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<BookingRequest[]>;
  }

  getBookingHistory(): Observable<BookingRequest[]> {
    const q = query(
      collection(this.firestore, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<BookingRequest[]>;
  }

  async submitRequest(req: Omit<BookingRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, 'bookings'), {
      ...req,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  }

  async updateStatus(id: string, status: BookingStatus, deniedReason?: string): Promise<void> {
    const docRef = doc(this.firestore, 'bookings', id);
    await updateDoc(docRef, {
      status,
      deniedReason: deniedReason ?? null,
      updatedAt: new Date()
    });
  }
}
