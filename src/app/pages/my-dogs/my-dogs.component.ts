import { ChangeDetectorRef, Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, from, switchMap } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-dogs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule],
  templateUrl: './my-dogs.component.html',
  styleUrl: './my-dogs.component.scss'
})
export class MyDogsComponent implements OnInit {
  dogs: Dog[] = [];
  showForm = false;
  saving = false;
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private firebaseAuth = inject(Auth);

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
    emergencyContactPhone: [''],
    profilePhotoUrl: ['']
  });

  editingDog: Dog | null = null;
  selectedPhoto: File | null = null;
  photoPreviewUrl: string | null = null;

  constructor(
    public auth: AuthService,
    private dogService: DogService
  ) {}

  ngOnInit() {
    // Wait for Auth to finish initializing (e.g. from persistence) before querying
    from(this.firebaseAuth.authStateReady()).pipe(
        switchMap(() => user(this.firebaseAuth)),
        filter((u): u is NonNullable<typeof u> => !!u),
        switchMap((u) => this.dogService.getDogsByOwner(u.uid)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (d) => {
          this.dogs = d;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Failed to load dogs:', err)
      });
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedPhoto = file;
      this.photoPreviewUrl = URL.createObjectURL(file);
      this.cdr.detectChanges();
    }
    input.value = '';
  }

  clearPhoto() {
    this.selectedPhoto = null;
    if (this.photoPreviewUrl) {
      URL.revokeObjectURL(this.photoPreviewUrl);
      this.photoPreviewUrl = null;
    }
    this.form.patchValue({ profilePhotoUrl: '' });
    this.cdr.detectChanges();
  }

  async saveDog() {
    const uid = this.auth.currentUser()?.uid;
    if (!uid || this.form.invalid) return;
    this.saving = true;
    try {
      let profilePhotoUrl = this.form.value.profilePhotoUrl ?? '';
      if (this.selectedPhoto) {
        const path = `dogs/${uid}/${Date.now()}_${this.selectedPhoto.name}`;
        profilePhotoUrl = await this.dogService.uploadPhoto(this.selectedPhoto, path);
        this.form.patchValue({ profilePhotoUrl });
      }
      const payload = { ...this.form.value, profilePhotoUrl } as Partial<Dog>;

      if (this.editingDog?.id) {
        await this.dogService.updateDog(this.editingDog.id, {
          ...payload,
          ownerId: this.editingDog.ownerId,
          walkThroughCompleted: this.editingDog.walkThroughCompleted
        });
        this.editingDog = null;
      } else {
        await this.dogService.addDog({
          ownerId: uid,
          ...payload,
          walkThroughCompleted: false
        } as Dog);
      }
      this.resetForm();
    } finally {
      this.saving = false;
    }
  }

  startEdit(dog: Dog) {
    this.editingDog = dog;
    this.selectedPhoto = null;
    this.form.patchValue({
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      weight: dog.weight ?? null,
      colorMarkings: dog.colorMarkings ?? '',
      vaccinationStatus: dog.vaccinationStatus,
      vaccinationDates: dog.vaccinationDates ?? '',
      spayedNeutered: dog.spayedNeutered ?? true,
      vetName: dog.vetName ?? '',
      vetContact: dog.vetContact ?? '',
      medicalConditions: dog.medicalConditions ?? '',
      allergies: dog.allergies ?? '',
      feedingInstructions: dog.feedingInstructions ?? '',
      behavioralNotes: dog.behavioralNotes ?? '',
      emergencyContactName: dog.emergencyContactName ?? '',
      emergencyContactPhone: dog.emergencyContactPhone ?? '',
      profilePhotoUrl: dog.profilePhotoUrl ?? ''
    });
    this.photoPreviewUrl = dog.profilePhotoUrl ?? null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openAddForm() {
    this.editingDog = null;
    this.clearPhoto();
    this.form.reset({ vaccinationStatus: 'current', spayedNeutered: true });
    this.showForm = true;
  }

  cancelEdit() {
    this.editingDog = null;
    this.resetForm();
  }

  private resetForm() {
    this.form.reset({ vaccinationStatus: 'current', spayedNeutered: true });
    this.showForm = false;
    this.clearPhoto();
  }
}
