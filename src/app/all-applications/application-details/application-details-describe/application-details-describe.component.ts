import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-application-details-describe',
  standalone: true,
  imports: [MatIconModule, MatChipsModule, FlexLayoutModule],
  templateUrl: './application-details-describe.component.html',
  styleUrl: './application-details-describe.component.scss'
})
export class ApplicationDetailsDescribeComponent {
  @Input() announcement: any;
}
