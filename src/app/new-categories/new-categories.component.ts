import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FilterService } from '../shared/services/filter.service';
import { CategoriesService, Category } from '../categories/categories.service';

@Component({
  selector: 'app-new-categories',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './new-categories.component.html',
  styleUrl: './new-categories.component.scss'
})
export class NewCategoriesComponent {
 categories: Category[];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private filterService: FilterService
  ) {
    this.categories = this.categoriesService.getCategories();
  }

  onCategoryClick(category: any): void {
    this.router.navigate(['/applications']);
    this.filterService.updateFilters({
      category: [category.name],
      searchText: '',
      workPlace: [],
      workMode: [],
      availability: [],
      status: [],
      salaryRange: { min: 0, max: 50000 }
    });
  }
}
