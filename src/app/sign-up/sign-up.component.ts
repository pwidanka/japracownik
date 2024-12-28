import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceTest } from '../_services/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../_services/firebase.service';
import { firstValueFrom } from 'rxjs';

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
    RouterLink,
    FormsModule,
    MatSlideToggleModule,
    NgIf
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
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      isEmployer: [false],
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onEmployerToggle() {
    const isEmployer = this.signUpForm.get('isEmployer')?.value;
    if (isEmployer) {
      this.signUpForm.addControl('employerDetails', this.fb.group({
        companyName: ['', Validators.required],
        nip: ['', Validators.required],
        fullName: ['', Validators.required]
      }));
      this.signUpForm.updateValueAndValidity();
    } else {
      this.signUpForm.removeControl('employerDetails');
    }
  }

  async onSubmit() {
    console.log(this.signUpForm)
    if (this.signUpForm.valid) {
      const { email, password, isEmployer, employerDetails } = this.signUpForm.value;
      
      try {
        const userCredential = await firstValueFrom(this.authService.register(email, password));
        console.log(userCredential, isEmployer)
        if (isEmployer && userCredential.user) {
          await this.firebaseService.addEmployer({
            companyName: employerDetails.companyName,
            nip: employerDetails.nip,
            fullName: employerDetails.fullName,
            email: email,
            uid: userCredential.user.uid,
            status: 'pending',
            createdAt: new Date()
          });
          
          this.router.navigate(['/pending-approval']);
        } else {
          this.router.navigate(['/']);
        }
      } catch (error: any) {
        this.errorMessage = this.getErrorMessage(error.code);
      }
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