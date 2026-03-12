import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-my-dogs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatExpansionModule],
  templateUrl: './my-dogs.component.html',
  styleUrl: './my-dogs.component.scss'
})
export class MyDogsComponent implements OnInit {
  dogs: Dog[] = [];
  showForm = false;
  saving = false;
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0)]],
    weight: [null as number | null, Validators.min(0)],
    colorMarkings: [''],
    vaccinationStatus: ['current' as Dog['vaccinationStatus'], Validators.required],
    vaccinationDates: [''],
    spayedNeutered: [true],
    vetName: [''],
    vetContact: [''],
    medicalConditions: [''],
    allergies: [''],
    feedingInstructions: [''],
    behavioralNotes: [''],
    emergencyContactName: [''],
    emergencyContactPhone: ['']
  });

  constructor(
    public auth: AuthService,
    private dogService: DogService
  ) {}

  ngOnInit() {
    const uid = this.auth.currentUser()?.uid;
    if (uid) {
      this.dogService.getDogsByOwner(uid).subscribe((d) => (this.dogs = d));
    }
  }

  async addDog() {
    const uid = this.auth.currentUser()?.uid;
    if (!uid || this.form.invalid) return;
    this.saving = true;
    try {
      await this.dogService.addDog({
        ownerId: uid,
        ...this.form.value,
        walkThroughCompleted: false
      } as Dog);
      this.form.reset({ vaccinationStatus: 'current', spayedNeutered: true });
      this.showForm = false;
    } finally {
      this.saving = false;
    }
  }
}
