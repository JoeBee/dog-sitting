export interface AppUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'client' | 'admin';
  /** Standard contact information */
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  createdAt?: any;
  updatedAt?: any;
}

/** Partial type for updating user profile (contact info) */
export interface UserProfileUpdate {
  displayName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}
