import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesService, Category } from './categories.service';
import { Router } from '@angular/router';
import { FilterService } from '../shared/services/filter.service';
import { FilterAllApplicationsComponent } from '../all-applications/filter-all-applications/filter-all-applications.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
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
