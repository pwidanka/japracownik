import { Component, effect, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FilterService, ApplicationFilters } from '../shared/services/filter.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {
  allApplications: any[] = [];
  filteredApplications: any[] = [];

  constructor(
    private router: Router,
    private filterService: FilterService
  ) {
    effect(() => {
      const filters = this.filterService.filters();
      console.log(filters);
      this.applyFilters(filters);
    });
  }

  async ngOnInit() {
    await this.loadApplications();
  }

  async loadApplications() {
    const db = getFirestore();
    const applicationsCollection = collection(db, 'announcements');
    const querySnapshot = await getDocs(applicationsCollection);
    this.allApplications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    this.filteredApplications = this.allApplications;
    console.log(this.allApplications);
  }
  
  viewApplicationDetails(id: string) {
    this.router.navigate(['/application-details', id]);
  }

  private applyFilters(filters: ApplicationFilters) {
    this.filteredApplications = this.allApplications.filter(app => {
      let matches = true;
  
      if (filters.searchText) {
        const searchTerm = filters.searchText.toLowerCase();
        matches = matches && (
          app.position?.toLowerCase().includes(searchTerm) ||
          (Array.isArray(app.skills) && app.skills.some((skill: string) => 
            skill.toLowerCase().includes(searchTerm)
          ))
        );
      }
  
      if (filters.workPlace?.length) {
        matches = matches && app.workPlace.some((place: string) => 
          filters.workPlace?.includes(place)
        );
      }
  
      if (filters.category?.length) {
        matches = matches && filters.category.includes(app.category);
      }
  
      if (filters.workMode?.length) {
        matches = matches && filters.workMode.includes(app.workMode);
      }
  
      if (filters.status?.length) {
        matches = matches && filters.status.includes(app.status);
      }

      if (filters.availability?.length) {
        matches = matches && filters.availability.includes(app.availableFrom);
      }
  
      if (filters.salaryRange) {
        const salaryParts = app.salary.split('-').map(Number);
        const minSalary = salaryParts[0];
        const maxSalary = salaryParts.length > 1 ? salaryParts[1] : minSalary;
        
        matches = matches && 
          minSalary >= filters.salaryRange.min && 
          maxSalary <= filters.salaryRange.max;
      }
  
      return matches;
    });
  }
}
