import { Component, effect, OnInit, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FilterService, ApplicationFilters } from '../shared/services/filter.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { AuthServiceTest } from '../_services/auth.service';
import { FirebaseService } from '../_services/firebase.service';

export class PolishPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Pozycji na stronie:';
  override nextPageLabel = 'Następna strona';
  override previousPageLabel = 'Poprzednia strona';
  override firstPageLabel = 'Pierwsza strona';
  override lastPageLabel = 'Ostatnia strona';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) {
      return 'Strona 1 z 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Strona ${page + 1} z ${amountPages}`;
  };
}

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PolishPaginatorIntl }
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {
  @Input() limit?: number;
  @Input() isPanelCustomer: boolean = false;
  allApplications: any[] = [];
  filteredApplications: any[] = [];
  filters: ApplicationFilters = {};
  pageSize = 5;
  currentPage = 0;
  paginatedApplications: any[] = [];

  constructor(
    private router: Router,
    private filterService: FilterService,
    private firebaeService: FirebaseService,
    private auth: AuthServiceTest
  ) {
    effect(() => {
      this.filters = this.filterService.filters();
      console.log(this.filters);
      this.applyFilters(this.filters);
    });
  }

  async ngOnInit() {
    await this.loadApplications();
    this.updatePaginatedApplications();
  }

  async loadApplications() {
    if (this.isPanelCustomer) {
      this.firebaeService.getUserAnnouncements(this.auth.getCurrentUser()!.uid).subscribe(async (applicationsCollection) => {
        console.log(applicationsCollection);
        this.allApplications = applicationsCollection
        this.filteredApplications = this.allApplications;
        this.applyFilters(this.filters);
      });
    } else {
      this.firebaeService.getAllAnnouncements().subscribe(async (applicationsCollection) => {
        this.allApplications = applicationsCollection
        this.filteredApplications = this.allApplications;
        this.applyFilters(this.filters);
      });
    }
    console.log(this.allApplications);
  }

  viewApplicationDetails(id: string) {
    this.router.navigate(['/application-details', id]);
  }

  editMyApplication(app: any) {
    console.log(app)
    this.router.navigate(['/edit-application'], {
      state: { application: app }
    });
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

    this.filteredApplications.sort((a, b) => b.createdAt - a.createdAt);

    if (this.limit) {
      this.filteredApplications = this.filteredApplications.slice(0, this.limit);
    }

    this.currentPage = 0;
    this.updatePaginatedApplications();
  }

  private updatePaginatedApplications() {
    if (this.limit) {
      this.paginatedApplications = this.filteredApplications;
    } else {
      const startIndex = this.currentPage * this.pageSize;
      this.paginatedApplications = this.filteredApplications.slice(
        startIndex,
        startIndex + this.pageSize
      );
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedApplications();
  }
}
