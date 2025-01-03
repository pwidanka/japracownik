import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SkillsComponent } from './skills/skills.component';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../_services/firebase.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CategoriesService } from '../categories/categories.service';
import { WorkPlaceInputComponent } from '../shared/components/work-place-input/work-place-input.component';


@Component({
  selector: 'app-add-application',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    SkillsComponent,
    MatButtonModule,
    WorkPlaceInputComponent
  ],
  templateUrl: './add-application.component.html',
  styleUrl: './add-application.component.scss'
})
export class AddApplicationComponent {
  applicationForm: FormGroup;
  categories: string[] = [];
  czyEdycja: boolean = false;
  workModes = ['Pełny etat', 'Część etatu', 'Zdalnie', 'Hybrydowo'];
  availabilities: string[] = ['Natychmiast', 'Za 2 tygodnie', 'Za 1 miesiąc', 'Za 3 miesiące', 'Inne'];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private auth: Auth,
    private categoriesService: CategoriesService,
  ) {
    this.applicationForm = this.fb.group({
      id: [''], 
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      salary: ['', Validators.required],
      category: ['', Validators.required],
      workMode: ['', Validators.required],
      availableFrom: ['', Validators.required],
      workPlace: [[], Validators.required],
      employerNip: [''],
      profilZawodowy: [''],
      doswiadczenie: [''],
      wyksztalcenie: [''],
      skills: [[]]
    });
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories().map(cat => cat.name);

    const state = history.state as { application: any };
    console.log(state);
    if (state?.application) {
      this.czyEdycja = true;
      this.applicationForm.patchValue(state.application);
    }
  }

  async onSubmit() {
    console.log(this.applicationForm.value);
    if (this.applicationForm.valid) {
      try {
        const currentUser = await this.auth.currentUser;

        if (!currentUser) {
          console.error('Użytkownik nie jest zalogowany');
          return;
        }

        if (this.czyEdycja) {
          const application = {
            ...this.applicationForm.value,
            updatedAt: new Date(),
            status: 'pending',
          };
          console.log('Edytuję aplikację:', application); 
          await this.firebaseService.updateAnnouncement(application.id, application);
        } else {
          const application = {
            ...this.applicationForm.value,
            createdAt: new Date(),
            status: 'pending',
            author: currentUser.uid
          };
          await this.firebaseService.addAnnouncement(application);
          this.router.navigate(['/applications']);
        }

      } catch (error) {
        console.error('Błąd podczas dodawania aplikacji:', error);
      }
    } else {
      console.log('Formularz jest nieprawidłowy:', this.applicationForm.errors);
    }
  }
}
