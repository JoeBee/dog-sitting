export interface AppUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'client' | 'admin';
  createdAt?: any;
  updatedAt?: any;
}
