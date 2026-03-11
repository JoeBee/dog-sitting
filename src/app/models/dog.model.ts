export interface Dog {
  id?: string;
  ownerId: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  colorMarkings: string;
  vaccinationStatus: 'current' | 'expired' | 'pending';
  vaccinationDates?: string;
  walkThroughCompleted: boolean;
  spayedNeutered: boolean;
  vetName: string;
  vetContact: string;
  medicalConditions: string;
  allergies: string;
  feedingInstructions: string;
  behavioralNotes: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePhotoUrl?: string;
  createdAt?: any;
  updatedAt?: any;
}
