import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesService, Category } from './categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatCardModule, NgFor, MatIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: Category[];

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.categoriesService.getCategories();
  }
}
