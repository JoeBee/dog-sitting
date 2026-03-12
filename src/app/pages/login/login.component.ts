import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, getAuthErrorMessage } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  error = '';
  loading = false;
  hidePassword = true;
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ngOnInit() {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      this.form.patchValue({ email: 'JoeBeyer3@gmail.com', password: 'asdf33' });
    }
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error = '';
    this.loading = true;
    try {
      await this.auth.login(this.form.value.email!, this.form.value.password!);
      this.router.navigate(['/calendar']);
    } catch (e) {
      this.error = getAuthErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }
}
