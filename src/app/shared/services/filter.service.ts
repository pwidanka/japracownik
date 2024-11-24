import { Injectable, signal } from '@angular/core';

export interface ApplicationFilters {
    searchText?: string;
    workPlace?: string[];
    category?: string[];
    workMode?: string[];
    availability?: string[];
    salaryRange?: {
      min: number;
      max: number;
    };
    status?: string[];
  }

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filtersSignal = signal<ApplicationFilters>({});
  filters = this.filtersSignal.asReadonly();

  updateFilters(filters: ApplicationFilters) {
    this.filtersSignal.update(() => ({ ...filters }));
  }
} 