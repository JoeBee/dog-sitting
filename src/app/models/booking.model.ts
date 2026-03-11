export type ServiceType = 'boarding' | 'sitting' | 'walk';
export type BookingStatus = 'pending' | 'approved' | 'denied' | 'cancelled' | 'completed';

export interface BookingRequest {
  id?: string;
  userId: string;
  dogId: string;
  serviceType: ServiceType;
  startDate: string;
  endDate: string;
  vaccinationConfirmed: boolean;
  vaccinationUploadUrl?: string;
  emergencyContact: string;
  specialNeeds: string;
  status: BookingStatus;
  createdAt?: any;
  updatedAt?: any;
  deniedReason?: string;
}
