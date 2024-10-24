import { Component } from '@angular/core';
import { ApplicationDetailsDescribeComponent } from './application-details-describe/application-details-describe.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApplicationDetailsDataComponent } from './application-details-data/application-details-data.component';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [ApplicationDetailsDescribeComponent, ApplicationDetailsDataComponent, FlexLayoutModule],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent {

}
