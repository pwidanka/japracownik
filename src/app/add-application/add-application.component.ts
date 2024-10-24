import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SkillsComponent } from './skills/skills.component';

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
    NgFor,
    SkillsComponent
  ],
  templateUrl: './add-application.component.html',
  styleUrl: './add-application.component.scss'
})
export class AddApplicationComponent {
  categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3'];
  workModes = ['Pełny etat', 'Część etatu', 'Zdalnie', 'Hybrydowo'];
  places = ['Miasto 1', 'Miasto 2', 'Miasto 3'];
}
