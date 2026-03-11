import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { DogService } from '../../services/dog.service';
import { UserService } from '../../services/user.service';
import { CapacityService } from '../../services/capacity.service';
import { BookingRequest, Dog, AppUser, ServiceType, ServiceCapacity } from '../../models';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  pending: BookingRequest[] = [];
  upcoming: BookingRequest[] = [];
  history: BookingRequest[] = [];
  users: AppUser[] = [];
  dogs: Dog[] = [];
  capacity: ServiceCapacity = { boarding: 5, sitting: 5, walk: 5 };
  filterClientId = '';
  savingCapacity = false;

  constructor(
    private booking: BookingService,
    private dogService: DogService,
    private userService: UserService,
    private capacityService: CapacityService
  ) {}

  ngOnInit() {
    this.booking.getPendingRequests().subscribe((b) => (this.pending = b));
    this.booking.getUpcomingBookings().subscribe((b) => (this.upcoming = b));
    this.booking.getBookingHistory().subscribe((b) => (this.history = b));
    this.userService.getAllUsers().subscribe((u) => (this.users = u));
    this.dogService.getAllDogs().subscribe((d) => (this.dogs = d));
    this.capacityService.getCapacity().then((c) => (this.capacity = c));
  }

  filteredDogs(): Dog[] {
    if (!this.filterClientId) return this.dogs;
    return this.dogs.filter((d) => d.ownerId === this.filterClientId);
  }

  async approve(id: string) {
    await this.booking.updateStatus(id, 'approved');
  }

  async deny(id: string, reason?: string) {
    await this.booking.updateStatus(id, 'denied', reason || 'Declined by admin');
  }

  async markWalkThrough(id: string) {
    await this.dogService.markWalkThroughCompleted(id);
  }

  async saveCapacity() {
    this.savingCapacity = true;
    try {
      await this.capacityService.setCapacity(this.capacity);
    } finally {
      this.savingCapacity = false;
    }
  }

  statusLabel(s: string) {
    const m: Record<string, string> = { pending: 'Pending', approved: 'Approved', denied: 'Denied', cancelled: 'Cancelled', completed: 'Completed' };
    return m[s] || s;
  }

  serviceLabel(s: ServiceType) {
    const m: Record<ServiceType, string> = { boarding: 'Boarding', sitting: 'Sitting', walk: 'Walk' };
    return m[s] || s;
  }
}
