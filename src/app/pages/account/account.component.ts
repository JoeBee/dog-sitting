import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  saving = false;
  message = '';
  private fb = inject(FormBuilder);

  form = this.fb.group({
    displayName: [''],
    phone: [''],
    addressLine1: [''],
    addressLine2: [''],
    city: [''],
    state: [''],
    postalCode: [''],
    country: ['']
  });

  constructor(
    public auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const u = this.auth.currentUser();
    if (u) {
      this.form.patchValue({
        displayName: u.displayName ?? '',
        phone: u.phone ?? '',
        addressLine1: u.addressLine1 ?? '',
        addressLine2: u.addressLine2 ?? '',
        city: u.city ?? '',
        state: u.state ?? '',
        postalCode: u.postalCode ?? '',
        country: u.country ?? ''
      });
    }
  }

  async onSubmit() {
    const uid = this.auth.currentUser()?.uid;
    if (!uid) return;
    this.saving = true;
    this.message = '';
    try {
      const v = this.form.value;
      await this.userService.updateUserProfile(uid, {
        displayName: v.displayName ?? '',
        phone: v.phone ?? '',
        addressLine1: v.addressLine1 ?? '',
        addressLine2: v.addressLine2 ?? '',
        city: v.city ?? '',
        state: v.state ?? '',
        postalCode: v.postalCode ?? '',
        country: v.country ?? ''
      });
      await this.auth.refreshProfile();
      this.form.markAsPristine();
      this.message = 'Contact information saved.';
    } catch (e) {
      this.message = (e as Error)?.message ?? 'Failed to save. Please try again.';
    } finally {
      this.saving = false;
    }
  }
}
