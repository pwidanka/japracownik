import { Injectable } from '@angular/core';

export interface Category {
  name: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: Category[] = [
    { name: 'IT', icon: 'computer' },
    { name: 'Inżynieria', icon: 'engineering' },
    { name: 'Praca biurowa', icon: 'work' },
    { name: 'Transport & Logistyka', icon: 'local_shipping' },
    { name: 'Zdrowie', icon: 'health_and_safety' },
    { name: 'Finanse', icon: 'paid' },
    { name: 'Projekty & Konsultacje', icon: 'group' },
    { name: 'Inne', icon: 'public' }
  ];

  getCategories(): Category[] {
    return this.categories;
  }
}

