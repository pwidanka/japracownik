import { Component } from '@angular/core';
import { ApplicationsComponent } from '../applications/applications.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterAllApplicationsComponent } from './filter-all-applications/filter-all-applications.component';

@Component({
  selector: 'app-all-applications',
  standalone: true,
  imports: [FilterAllApplicationsComponent, ApplicationsComponent, FlexLayoutModule],
  templateUrl: './all-applications.component.html',
  styleUrl: './all-applications.component.scss'
})
export class AllApplicationsComponent {

}
