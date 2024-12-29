import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FilterService } from '../shared/services/filter.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CategoriesService, Category } from '../categories/categories.service';
import { MatInputModule } from '@angular/material/input';
import { CitiesService } from '../_services/cities.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewCategoriesComponent } from '../new-categories/new-categories.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatIconModule, 
    MatButtonModule, 
    FormsModule, 
    MatSelectModule,
    CommonModule,
    MatInputModule,
    FlexLayoutModule,
    NewCategoriesComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  searchText: string = '';
  workPlace: string[] = [];
  category: string[] = [];
  categories: Category[] = [];
  cities: string[] = [];

  constructor(
    private router: Router,
    private filterService: FilterService,
    private categoriesService: CategoriesService,
    private citiesService: CitiesService
  ) {
    this.categories = this.categoriesService.getCategories();
    this.cities = this.citiesService.getCities();
  }

  findEmployee() {
    const filters = {
      searchText: this.searchText,
      workPlace: this.workPlace,
      category: this.category ? this.category : []
    };
    
    this.filterService.updateFilters(filters);
    this.router.navigate(['/applications']);
  }

  compareCategories(cat1: string, cat2: string): boolean {
    return cat1 === cat2;
  }

  compareCities(city1: string, city2: string): boolean {
    return city1 === city2;
  }
}
