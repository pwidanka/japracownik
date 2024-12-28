import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceTest } from '../_services/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Auth } from '@angular/fire/auth';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';
  auth: Auth = inject(Auth);

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceTest,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: async (userCredential) => {
          const isAllowed = await this.firebaseService.checkEmployerStatus(userCredential.user.uid);
          
          if (isAllowed) {
            this.router.navigate(['/']);
          } else {
            this.authService.logout();
            this.errorMessage = 'Konto pracodawcy oczekuje na zatwierdzenie.';
          }
        },
        error: (error) => {
          this.errorMessage = this.getErrorMessage(error.code);
        }
      });
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Nie znaleziono użytkownika o podanym adresie email.';
      case 'auth/wrong-password':
        return 'Nieprawidłowe hasło.';
      default:
        return 'Wystąpił błąd podczas logowania.';
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
