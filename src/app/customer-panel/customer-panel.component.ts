import { Component } from '@angular/core';
import { ApplicationsComponent } from '../applications/applications.component';

@Component({
  selector: 'app-customer-panel',
  standalone: true,
  imports: [ApplicationsComponent],
  templateUrl: './customer-panel.component.html',
  styleUrl: './customer-panel.component.scss'
})
export class CustomerPanelComponent {

}
