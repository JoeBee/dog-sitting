import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DogService } from '../../services/dog.service';
import { BookingService } from '../../services/booking.service';
import { Dog, BookingRequest, ServiceType } from '../../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule,
    MatCardModule, MatTabsModule, MatExpansionModule, RouterLink
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  dogs: Dog[] = [];
  bookings: BookingRequest[] = [];
  loading = false;
  submitted = false;
  error = '';
  private fb = inject(FormBuilder);

  serviceTypes: { value: ServiceType; label: string }[] = [
    { value: 'boarding', label: 'Boarding' },
    { value: 'sitting', label: 'Sitting' },
    { value: 'walk', label: 'Walk' }
  ];

  form = this.fb.group({
    dogId: ['', Validators.required],
    serviceType: ['boarding' as ServiceType, Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    vaccinationConfirmed: [false, Validators.requiredTrue],
    emergencyContact: ['', Validators.required],
    specialNeeds: ['']
  });

  constructor(
    public auth: AuthService,
    private dogService: DogService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const uid = this.auth.currentUser()?.uid;
    if (uid) {
      this.dogService.getDogsByOwner(uid).subscribe((d) => (this.dogs = d));
      this.bookingService.getBookingsByUser(uid).subscribe((b) => (this.bookings = b));
    }
  }

  async onSubmit() {
    if (this.form.invalid || !this.auth.currentUser()) return;
    this.error = '';
    this.loading = true;
    try {
      await this.bookingService.submitRequest({
        userId: this.auth.currentUser()!.uid,
        dogId: this.form.value.dogId!,
        serviceType: this.form.value.serviceType!,
        startDate: this.form.value.startDate!,
        endDate: this.form.value.endDate!,
        vaccinationConfirmed: !!this.form.value.vaccinationConfirmed,
        emergencyContact: this.form.value.emergencyContact!,
        specialNeeds: this.form.value.specialNeeds || ''
      });
      this.submitted = true;
      this.form.reset({ serviceType: 'boarding', vaccinationConfirmed: false });
    } catch (e: any) {
      this.error = e?.message || 'Failed to submit request.';
    } finally {
      this.loading = false;
    }
  }

  statusLabel(s: string) {
    const m: Record<string, string> = { pending: 'Pending', approved: 'Approved', denied: 'Denied', cancelled: 'Cancelled', completed: 'Completed' };
    return m[s] || s;
  }

  serviceLabel(s: ServiceType) {
    return this.serviceTypes.find(t => t.value === s)?.label || s;
  }
}
