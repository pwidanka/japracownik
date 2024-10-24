import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-application-details-data',
  standalone: true,
  imports: [FlexLayoutModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './application-details-data.component.html',
  styleUrl: './application-details-data.component.scss'
})
export class ApplicationDetailsDataComponent {

}
