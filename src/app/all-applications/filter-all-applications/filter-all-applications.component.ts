import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { WorkPlaceInputComponent } from '../../shared/components/work-place-input/work-place-input.component';
import { CategoriesService, Category } from '../../categories/categories.service';

@Component({
  selector: 'app-filter-all-applications',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatSliderModule, MatCheckboxModule, MatExpansionModule, MatInputModule, WorkPlaceInputComponent],
  templateUrl: './filter-all-applications.component.html',
  styleUrl: './filter-all-applications.component.scss'
})
export class FilterAllApplicationsComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoriesService)  {}

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }
}
