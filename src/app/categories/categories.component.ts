import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatCardModule, NgFor, MatIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories = [
    { name: 'IT', icon: 'computer' },
    { name: 'Inżynieria', icon: 'engineering' },
    { name: 'Praca biurowa', icon: 'work' },
    { name: 'Transport & Logistyka', icon: 'local_shipping' },
    { name: 'Zdrowie', icon: 'health_and_safety' },
    { name: 'Finanse', icon: 'paid' },
    { name: 'Projekty & Konsultacje', icon: 'group' },
    { name: 'Inne', icon: 'public' }
  ];
}
