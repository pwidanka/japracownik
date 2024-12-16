import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceTest } from '../_services/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceTest,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.authService.register(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = this.getErrorMessage(error.code);
        }
      });
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Konto z tym adresem email już istnieje.';
      default:
        return 'Wystąpił błąd podczas rejestracji.';
    }
  }

  loginWithGoogle() {
    try {
      this.authService.loginWithGoogle().subscribe({
        next: (result) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = 'Wystąpił błąd podczas logowania przez Google';
        }
      });

    } catch (error) {
      this.errorMessage = 'Wystąpił błąd podczas logowania przez Google';
    }
  }
} 