import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { WorkPlaceInputComponent } from '../../shared/components/work-place-input/work-place-input.component';
import { CategoriesService, Category } from '../../categories/categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterService, ApplicationFilters } from '../../shared/services/filter.service';

@Component({
  selector: 'app-filter-all-applications',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatSliderModule, MatCheckboxModule, MatExpansionModule, MatInputModule, WorkPlaceInputComponent, ReactiveFormsModule],
  templateUrl: './filter-all-applications.component.html',
  styleUrl: './filter-all-applications.component.scss'
})
export class FilterAllApplicationsComponent implements OnInit {
  categories: Category[] = [];
  filterForm!: FormGroup;
  selectedCategories: string[] = [];
  workModes: string[] = ['Pełny etat', 'Część etatu', 'Zdalnie', 'Hybrydowo'];
  availabilities: string[] = ['Natychmiast', 'Za 2 tygodnie', 'Za 1 miesiąc', 'Za 3 miesiące', 'Inne'];
  selectedWorkModes: string[] = [];
  selectedAvailabilities: string[] = [];

  constructor(
    private categoryService: CategoriesService,
    private filterService: FilterService,
    private fb: FormBuilder
  ) {
  }
  initForm() {
    this.filterForm = this.fb.group({
      searchText: [''],
      workPlace: [[]],
      category: [[]],
      workMode: [[]],
      availability: [[]],
      status: [[]],
      salaryRange: this.fb.group({
        min: [0],
        max: [10000]
      })
    });
  }

  ngOnInit() {
    this.initForm();
    this.categories = this.categoryService.getCategories();

    this.filterForm.valueChanges.subscribe((filters: ApplicationFilters) => {
      this.filterService.updateFilters(filters);
    });
  }

  onCategoryChange(event: MatCheckboxChange, categoryName: string) {
    if (event.checked) {
      this.selectedCategories.push(categoryName);
    } else {
      this.selectedCategories = this.selectedCategories.filter(name => name !== categoryName);
    }
    this.filterForm.patchValue({ category: this.selectedCategories });
  }

  isSelectedCategory(categoryName: string): boolean {
    return this.selectedCategories.includes(categoryName);
  }

  onSearch() {
    console.log(this.filterForm.value);
    this.filterService.updateFilters(this.filterForm.value);
  }

  resetFilters() {
    this.filterForm.reset({
      salaryRange: { min: 0, max: 9999 }
    });
  }

  onWorkModeChange(event: MatCheckboxChange, workMode: string) {
    if (event.checked) {
      this.selectedWorkModes.push(workMode);
    } else {
      this.selectedWorkModes = this.selectedWorkModes.filter(mode => mode !== workMode);
    }
    this.filterForm.patchValue({ workMode: this.selectedWorkModes });
  }

  isSelectedWorkMode(workMode: string): boolean {
    return this.selectedWorkModes.includes(workMode);
  }

  onAvailabilityChange(event: MatCheckboxChange, availability: string) {
    if (event.checked) {
      this.selectedAvailabilities.push(availability);
    } else {
      this.selectedAvailabilities = this.selectedAvailabilities.filter(av => av !== availability);
    }
    this.filterForm.patchValue({ availability: this.selectedAvailabilities });
  }

  isSelectedAvailability(availability: string): boolean {
    return this.selectedAvailabilities.includes(availability);
  }
}
